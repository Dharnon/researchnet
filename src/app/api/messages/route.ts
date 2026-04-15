import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { getSession } from '@/lib/session';
import { eq, or, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const withOrcid = searchParams.get('with');
  if (!withOrcid) return NextResponse.json({ error: 'with param required' }, { status: 400 });

  const msgs = await db.select().from(messages).where(
    or(
      and(eq(messages.senderOrcid, orcid), eq(messages.recipientOrcid, withOrcid)),
      and(eq(messages.senderOrcid, withOrcid), eq(messages.recipientOrcid, orcid))
    )
  );

  return NextResponse.json(msgs);
}

export async function POST(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { recipientOrcid, content } = await req.json();
  if (!recipientOrcid || !content) {
    return NextResponse.json({ error: 'recipientOrcid and content required' }, { status: 400 });
  }

  const [msg] = await db.insert(messages).values({
    senderOrcid: orcid,
    recipientOrcid,
    content,
  }).returning();

  return NextResponse.json(msg, { status: 201 });
}
