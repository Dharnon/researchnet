import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { loadAllResearchers } from '@/lib/discover-loader';

export async function GET(req: NextRequest) {
  const sessionOrcid = await getSession();
  const { searchParams } = new URL(req.url);
  const sort = (searchParams.get('sort') ?? 'affinity') as 'newest' | 'affinity';
  const dept = searchParams.get('dept');
  const area = searchParams.get('area');
  const openOnly = searchParams.get('open') === 'true';
  const q = (searchParams.get('q') ?? '').toLowerCase().trim();
  const limit = Number(searchParams.get('limit') ?? '50');

  let all = await loadAllResearchers(sessionOrcid);

  if (dept && dept !== 'Todos') all = all.filter((r) => r.dept === dept);
  if (area) {
    const needle = area.toLowerCase();
    all = all.filter((r) => r.tags.some((t) => t.toLowerCase() === needle));
  }
  if (openOnly) all = all.filter((r) => r.open);
  if (q) {
    all = all.filter(
      (r) =>
        `${r.name} ${r.surname}`.toLowerCase().includes(q) ||
        r.dept.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (sort === 'newest') {
    all.sort((a, b) => {
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      return tb - ta;
    });
  } else {
    all.sort((a, b) => b.match - a.match);
  }

  return NextResponse.json({
    results: all.slice(0, limit),
    total: all.length,
    hasSessionSkills: sessionOrcid ? undefined : false,
  });
}
