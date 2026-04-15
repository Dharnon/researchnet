import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, publications, skills } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orcid: string }> }
) {
  const { orcid } = await params;

  const user = await db.query.users.findFirst({ where: eq(users.orcid, orcid) });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const userPubs = await db.select().from(publications).where(eq(publications.orcid, orcid));
  const userSkills = await db.select().from(skills).where(eq(skills.orcid, orcid));

  // Try ORCID API
  let orcidData: Record<string, unknown> = {};
  if (user.accessToken) {
    try {
      const res = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${user.accessToken}` },
      });
      if (res.ok) orcidData = await res.json();
    } catch (_) {}
  }

  return NextResponse.json({
    ...user,
    publications: userPubs,
    skills: userSkills.map(s => s.skill),
    orcidEnriched: orcidData,
  });
}
