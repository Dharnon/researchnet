import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, skills } from '@/lib/db/schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function GET() {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await db.query.users.findFirst({ where: eq(users.orcid, orcid) });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const userSkills = await db.select().from(skills).where(eq(skills.orcid, orcid));

  return NextResponse.json({ ...user, skills: userSkills.map((s) => s.skill) });
}

export async function PUT(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  await db.update(users).set({
    name: body.name,
    email: body.email,
    role: body.role,
    department: body.department,
    bio: body.bio,
    avatar: body.avatar,
  }).where(eq(users.orcid, orcid));

  const updated = await db.query.users.findFirst({ where: eq(users.orcid, orcid) });
  return NextResponse.json(updated);
}
