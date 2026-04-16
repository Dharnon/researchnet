import { NextRequest, NextResponse } from 'next/server';
import { generateState, stateCookie } from '@/lib/session';

export async function GET(req: NextRequest) {
  const clientId = process.env.ORCID_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  if (!clientId) {
    const where = new URL('/?error=orcid_not_configured', appUrl);
    return NextResponse.redirect(where);
  }

  const useSandbox = process.env.ORCID_USE_SANDBOX === '1';
  const orcidBase = useSandbox ? 'https://sandbox.orcid.org' : 'https://orcid.org';

  const redirectUri = `${appUrl}/api/auth/orcid/callback`;
  const scope = '/authenticate';
  const state = generateState();

  const authUrl =
    `${orcidBase}/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${encodeURIComponent(state)}`;

  const res = NextResponse.redirect(authUrl);
  res.cookies.set(stateCookie.name, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
  return res;
}
