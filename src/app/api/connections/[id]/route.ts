import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { connections } from '@/lib/db/schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  if (!['accepted', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const conn = await db.query.connections.findFirst({ where: eq(connections.id, parseInt(id)) });
  if (!conn) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (conn.addresseeOrcid !== orcid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const [updated] = await db.update(connections).set({ status }).where(eq(connections.id, parseInt(id))).returning();
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const conn = await db.query.connections.findFirst({ where: eq(connections.id, parseInt(id)) });
  if (!conn) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (conn.requesterOrcid !== orcid && conn.addresseeOrcid !== orcid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await db.delete(connections).where(eq(connections.id, parseInt(id)));
  return NextResponse.json({ success: true });
}
