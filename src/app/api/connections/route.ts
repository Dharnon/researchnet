import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { connections, users } from "@/lib/db/schema";
import { getSession } from "@/lib/session";
import { eq, and, or } from "drizzle-orm";

export async function GET() {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const all = await db.query.connections.findMany({
    where: or(
      eq(connections.requesterOrcid, orcid),
      eq(connections.addresseeOrcid, orcid)
    ),
  });

  const withUsers = await Promise.all(
    all.map(async (c) => {
      const otherOrcid = c.requesterOrcid === orcid ? c.addresseeOrcid : c.requesterOrcid;
      const other = await db.query.users.findFirst({ where: eq(users.orcid, otherOrcid) });
      return { ...c, otherUser: other };
    })
  );

  return NextResponse.json(withUsers);
}

export async function POST(req: NextRequest) {
  const orcid = await getSession();
  if (!orcid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { addresseeOrcid } = await req.json();

  const existing = await db.query.connections.findFirst({
    where: or(
      and(eq(connections.requesterOrcid, orcid), eq(connections.addresseeOrcid, addresseeOrcid)),
      and(eq(connections.requesterOrcid, addresseeOrcid), eq(connections.addresseeOrcid, orcid))
    ),
  });
  if (existing) return NextResponse.json({ error: "Already connected" }, { status: 409 });

  const [conn] = await db.insert(connections).values({
    requesterOrcid: orcid,
    addresseeOrcid,
    status: "pending",
  }).returning();

  return NextResponse.json(conn, { status: 201 });
}
