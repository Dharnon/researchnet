import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { loadAllResearchers } from '@/lib/discover-loader';
import {
  featuredPapers,
  opportunities,
  researchAreas,
  researchGroups,
} from '@/lib/mock-data';
import type { EditorialTile } from '@/types';

export async function GET() {
  const sessionOrcid = await getSession();
  const all = await loadAllResearchers(sessionOrcid);

  const topByMatch = [...all].sort((a, b) => b.match - a.match);
  const topByNewest = [...all].sort((a, b) => {
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return tb - ta;
  });

  const tiles: EditorialTile[] = [];

  if (featuredPapers[0]) tiles.push({ kind: 'featuredPaper', paper: featuredPapers[0] });

  const spotlight = topByMatch[0] ?? all[0];
  if (spotlight) {
    const quote = spotlight.bio
      ? spotlight.bio.length > 140
        ? spotlight.bio.slice(0, 138) + '…'
        : spotlight.bio
      : 'Investigador destacado esta semana.';
    tiles.push({ kind: 'featuredResearcher', researcher: spotlight, quote });
  }

  const hotOpp = opportunities.find((o) => o.hot) ?? opportunities[0];
  if (hotOpp) tiles.push({ kind: 'hotOpportunity', opportunity: hotOpp });

  if (researchAreas[0]) tiles.push({ kind: 'area', area: researchAreas[0] });
  if (researchAreas[1]) tiles.push({ kind: 'area', area: researchAreas[1] });

  if (researchGroups[0]) tiles.push({ kind: 'group', group: researchGroups[0] });

  tiles.push({
    kind: 'cta',
    title: '¿Buscas colaborar?',
    description:
      'Activa "Disponible para colaborar" en tu perfil y aparecerás a investigadores con afinidad alta.',
    cta: 'Activar en mi perfil',
  });

  const newest = topByNewest[1] ?? topByNewest[0];
  if (newest && newest !== spotlight) {
    const quote = newest.bio ? (newest.bio.length > 120 ? newest.bio.slice(0, 118) + '…' : newest.bio) : 'Recién llegado a ResearchNet.';
    tiles.push({ kind: 'featuredResearcher', researcher: newest, quote });
  }

  if (featuredPapers[1]) tiles.push({ kind: 'featuredPaper', paper: featuredPapers[1] });

  if (researchGroups[1]) tiles.push({ kind: 'group', group: researchGroups[1] });

  return NextResponse.json({ tiles });
}
