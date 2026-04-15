import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.ORCID_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/orcid/callback`;
  const scope = "/authenticate";
  const authUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
  return NextResponse.redirect(authUrl);
}
