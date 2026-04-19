export type AffinityBreakdown = {
  score: number;
  sharedSkills: string[];
  sameDept: boolean;
  sharedPaperTopics: number;
  hasData: boolean;
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function toSet(items: string[] | undefined | null): Set<string> {
  if (!items) return new Set();
  const out = new Set<string>();
  for (const item of items) {
    if (item && item.trim()) out.add(normalize(item));
  }
  return out;
}

export function computeAffinity(
  selfSkills: string[] | undefined | null,
  otherSkills: string[] | undefined | null,
  selfDept: string | null | undefined,
  otherDept: string | null | undefined,
  sharedPaperTopics = 0,
): AffinityBreakdown {
  const a = toSet(selfSkills);
  const b = toSet(otherSkills);

  if (a.size === 0) {
    return {
      score: 0,
      sharedSkills: [],
      sameDept: false,
      sharedPaperTopics: 0,
      hasData: false,
    };
  }

  const intersection: string[] = [];
  for (const skill of a) if (b.has(skill)) intersection.push(skill);

  const union = new Set<string>([...a, ...b]);
  const jaccard = union.size === 0 ? 0 : intersection.length / union.size;

  const sameDept = Boolean(
    selfDept && otherDept && normalize(selfDept) === normalize(otherDept),
  );

  const topicBonus = Math.min(sharedPaperTopics, 5) * 2;
  const raw = jaccard * 80 + (sameDept ? 12 : 0) + topicBonus;
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  const sharedOriginalCase: string[] = [];
  const otherByNorm = new Map<string, string>();
  for (const s of otherSkills ?? []) otherByNorm.set(normalize(s), s);
  for (const n of intersection) {
    const original = otherByNorm.get(n);
    if (original) sharedOriginalCase.push(original);
  }

  return {
    score,
    sharedSkills: sharedOriginalCase,
    sameDept,
    sharedPaperTopics,
    hasData: true,
  };
}

export function affinityLabel(score: number): string {
  if (score >= 85) return 'Alta afinidad';
  if (score >= 65) return 'Buena afinidad';
  if (score >= 40) return 'Afinidad media';
  if (score > 0) return 'Afinidad baja';
  return 'Sin datos';
}
