import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getSession } from '@/lib/session';
import { like, or, ne, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const currentOrcid = await getSession();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  let allUsers = await db.select({
    orcid: users.orcid,
    name: users.name,
    role: users.role,
    department: users.department,
    bio: users.bio,
    avatar: users.avatar,
  }).from(users);

  if (!currentOrcid) {
    // Return all users except those without a name (incomplete)
    allUsers = allUsers.filter(u => u.name && u.name !== 'Researcher');
  } else {
    // Exclude self
    allUsers = allUsers.filter(u => u.orcid !== currentOrcid);
  }

  if (q) {
    const lower = q.toLowerCase();
    allUsers = allUsers.filter(u =>
      u.name?.toLowerCase().includes(lower) ||
      u.role?.toLowerCase().includes(lower) ||
      u.department?.toLowerCase().includes(lower) ||
      u.bio?.toLowerCase().includes(lower)
    );
  }

  return NextResponse.json(allUsers);
}
