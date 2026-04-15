import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { getSession } from "@/lib/session";
import { eq, or, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const withOrcid = searchParams.get("with");

  if (withOrcid) {
    const msgs = await db.query.messages.findMany({
      where: or(
        and(eq(messages.senderOrcid, orcid), eq(messages.recipientOrcid, withOrcid)),
        and(eq(messages.senderOrcid, withOrcid), eq(messages.recipientOrcid, orcid))
      ),
    });
    return NextResponse.json(msgs);
  }

  // Return all conversations grouped
  const all = await db.query.messages.findMany({
    where: or(eq(messages.senderOrcid, orcid), eq(messages.recipientOrcid, orcid)),
  });

  const convMap = new Map<string, any>();
  for (const msg of all) {
    const other = msg.senderOrcid === orcid ? msg.recipientOrcid : msg.senderOrcid;
    if (!convMap.has(other)) {
      convMap.set(other, { orcid: other, messages: [] });
    }
    convMap.get(other).messages.push(msg);
  }

  return NextResponse.json(Array.from(convMap.values()));
}

export async function POST(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { recipientOrcid, content } = await req.json();

  const [msg] = await db.insert(messages).values({
    senderOrcid: orcid,
    recipientOrcid,
    content,
  }).returning();

  return NextResponse.json(msg, { status: 201 });
}
