import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { sessionCookie, stateCookie } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  const clientId = process.env.ORCID_CLIENT_ID;
  const clientSecret = process.env.ORCID_CLIENT_SECRET;
  if (!clientId || !clientSecret) return redirectWithError(appUrl, 'orcid_not_configured');

  const useSandbox = process.env.ORCID_USE_SANDBOX === '1';
  const orcidBase = useSandbox ? 'https://sandbox.orcid.org' : 'https://orcid.org';
  const orcidPubBase = useSandbox ? 'https://pub.sandbox.orcid.org' : 'https://pub.orcid.org';

  const storedState = req.cookies.get(stateCookie.name)?.value;

  if (!code) return redirectWithError(appUrl, 'no_code');
  if (!state || !storedState || state !== storedState) {
    return redirectWithError(appUrl, 'bad_state');
  }

  // Exchange code for token
  const tokenRes = await fetch(`${orcidBase}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${appUrl}/api/auth/orcid/callback`,
    }),
  });

  if (!tokenRes.ok) return redirectWithError(appUrl, 'token_failed');

  const tokenData = await tokenRes.json();
  const orcid = tokenData.orcid as string;
  const accessToken = tokenData.access_token as string;
  const refreshToken = tokenData.refresh_token as string;

  // Fetch ORCID profile
  let name = 'Researcher';
  let email: string | null = null;
  const profileRes = await fetch(`${orcidPubBase}/v3.0/${orcid}/person`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
  });
  if (profileRes.ok) {
    const profile = await profileRes.json();
    const given = profile.name?.['given-name']?.value;
    const family = profile.name?.['family-name']?.value;
    name = given && family ? `${given} ${family}` : given || orcid;
    if (profile.emails?.email?.length > 0) email = profile.emails.email[0].email;
  }

  // Upsert user
  const existing = await db.query.users.findFirst({ where: eq(users.orcid, orcid) });
  if (existing) {
    await db.update(users).set({ accessToken, refreshToken, name, email }).where(eq(users.orcid, orcid));
  } else {
    await db.insert(users).values({ orcid, name, email, accessToken, refreshToken });
  }

  const res = NextResponse.redirect(appUrl);
  res.cookies.set(sessionCookie.name, sessionCookie.buildToken(orcid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: sessionCookie.maxAge,
  });
  res.cookies.delete(stateCookie.name);
  return res;
}

function redirectWithError(appUrl: string, error: string) {
  const res = NextResponse.redirect(`${appUrl}/?error=${error}`);
  res.cookies.delete(stateCookie.name);
  return res;
}
