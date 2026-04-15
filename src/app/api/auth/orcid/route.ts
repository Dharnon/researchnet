import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.ORCID_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/orcid/callback`;
  const scope = '/authenticate';
  const authUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(authUrl);
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const clientId = process.env.ORCID_CLIENT_ID;
  const clientSecret = process.env.ORCID_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/orcid/callback`;

  const tokenRes = await fetch('https://orcid.org/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 });
  }

  const tokenData = await tokenRes.json();
  return NextResponse.json(tokenData);
}
