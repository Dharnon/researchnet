import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { loadAllResearchers } from '@/lib/discover-loader';

export async function GET() {
  const sessionOrcid = await getSession();
  const all = await loadAllResearchers(sessionOrcid);

  const counts = new Map<string, number>();
  for (const r of all) {
    for (const tag of r.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const areas = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({ areas });
}
