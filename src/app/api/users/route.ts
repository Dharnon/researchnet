import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const allUsers = await db.query.users.findMany();
  const filtered = q
    ? allUsers.filter((u) =>
        u.name?.toLowerCase().includes(q) ||
        u.department?.toLowerCase().includes(q)
      )
    : allUsers;
  return NextResponse.json(filtered);
}
