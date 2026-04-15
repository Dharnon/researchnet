import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=no_code`);
  }

  // Exchange code for token
  const tokenRes = await fetch("https://orcid.org/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: process.env.ORCID_CLIENT_ID!,
      client_secret: process.env.ORCID_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/orcid/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_failed`);
  }

  const tokenData = await tokenRes.json();
  const orcid = tokenData.orcid as string;
  const accessToken = tokenData.access_token as string;
  const refreshToken = tokenData.refresh_token as string;

  // Fetch ORCID profile
  let name = orcid;
  let email: string | null = null;
  try {
    const profileRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/person`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    });
    if (profileRes.ok) {
      const profile = await profileRes.json();
      const given = profile.name?.["given-name"]?.value;
      const family = profile.name?.["family-name"]?.value;
      name = given && family ? `${given} ${family}` : given || orcid;
      if (profile.emails?.email?.length > 0) {
        email = profile.emails.email[0].email;
      }
    }
  } catch {}

  // Upsert user
  const existing = await db.query.users.findFirst({ where: eq(users.orcid, orcid) });
  if (existing) {
    await db.update(users).set({ accessToken, refreshToken, name, email }).where(eq(users.orcid, orcid));
  } else {
    await db.insert(users).values({ orcid, name, email, accessToken, refreshToken });
  }

  // Set session cookie and redirect
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  response.cookies.set("session", orcid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
