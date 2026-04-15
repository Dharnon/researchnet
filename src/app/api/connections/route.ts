import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { connections, users } from '@/lib/db/schema';
import { getSession } from '@/lib/session';
import { eq, and, or } from 'drizzle-orm';

export async function GET() {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userConnections = await db
    .select({
      id: connections.id,
      requesterOrcid: connections.requesterOrcid,
      addresseeOrcid: connections.addresseeOrcid,
      status: connections.status,
      createdAt: connections.createdAt,
      requesterName: users.name,
      addresseeName: users.name,
    })
    .from(connections)
    .leftJoin(users, eq(connections.addresseeOrcid, users.orcid))
    .where(
      or(
        eq(connections.requesterOrcid, orcid),
        eq(connections.addresseeOrcid, orcid)
      )
    );

  return NextResponse.json(userConnections);
}

export async function POST(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { addresseeOrcid } = await req.json();
  if (!addresseeOrcid) return NextResponse.json({ error: 'addresseeOrcid required' }, { status: 400 });

  // Check not already connected
  const existing = await db.query.connections.findFirst({
    where: or(
      and(eq(connections.requesterOrcid, orcid), eq(connections.addresseeOrcid, addresseeOrcid)),
      and(eq(connections.requesterOrcid, addresseeOrcid), eq(connections.addresseeOrcid, orcid))
    ),
  });

  if (existing) return NextResponse.json({ error: 'Already connected or pending' }, { status: 409 });

  const [conn] = await db.insert(connections).values({
    requesterOrcid: orcid,
    addresseeOrcid,
    status: 'pending',
  }).returning();

  return NextResponse.json(conn, { status: 201 });
}
