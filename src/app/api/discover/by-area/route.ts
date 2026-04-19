import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { loadAllResearchers } from '@/lib/discover-loader';
import type { Researcher } from '@/types';

export async function GET() {
  const sessionOrcid = await getSession();
  const all = await loadAllResearchers(sessionOrcid);

  const groups = new Map<string, Researcher[]>();
  for (const r of all) {
    const primaryArea = r.tags[0] ?? 'Otros';
    const arr = groups.get(primaryArea) ?? [];
    arr.push(r);
    groups.set(primaryArea, arr);
  }

  const sorted = [...groups.entries()]
    .map(([area, researchers]) => ({
      area,
      researchers: researchers.sort((a, b) => b.match - a.match).slice(0, 6),
      count: researchers.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return NextResponse.json({ groups: sorted });
}
