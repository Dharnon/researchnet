import { db } from '@/lib/db';
import { users, skills, publications } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { computeAffinity } from '@/lib/affinity';
import { researchers as mockResearchers } from '@/lib/mock-data';
import type { Researcher } from '@/types';

const MIN_REAL_USERS = 3;

type LoadedResearcher = Researcher;

export async function getSessionSkillsAndDept(sessionOrcid: string | null): Promise<{
  orcid: string | null;
  skills: string[];
  department: string | null;
}> {
  if (!sessionOrcid) return { orcid: null, skills: [], department: null };
  const user = await db.query.users.findFirst({ where: eq(users.orcid, sessionOrcid) });
  if (!user) return { orcid: sessionOrcid, skills: [], department: null };
  const userSkills = await db.select().from(skills).where(eq(skills.orcid, sessionOrcid));
  return {
    orcid: sessionOrcid,
    skills: userSkills.map((s) => s.skill),
    department: user.department ?? null,
  };
}

export async function loadAllResearchers(sessionOrcid: string | null): Promise<LoadedResearcher[]> {
  const allUsers = await db.select().from(users);
  const allSkills = await db.select().from(skills);
  const allPubs = await db.select().from(publications);

  const session = await getSessionSkillsAndDept(sessionOrcid);

  const realUsers = allUsers.filter((u) => u.orcid !== sessionOrcid && u.name && u.name !== 'Researcher');

  if (realUsers.length < MIN_REAL_USERS) {
    return enrichMockResearchers(session);
  }

  const skillsByOrcid = new Map<string, string[]>();
  for (const s of allSkills) {
    const arr = skillsByOrcid.get(s.orcid) ?? [];
    arr.push(s.skill);
    skillsByOrcid.set(s.orcid, arr);
  }

  const pubsByOrcid = new Map<string, number>();
  for (const p of allPubs) {
    pubsByOrcid.set(p.orcid, (pubsByOrcid.get(p.orcid) ?? 0) + 1);
  }

  return realUsers.map((u, i): LoadedResearcher => {
    const userSkills = skillsByOrcid.get(u.orcid) ?? [];
    const breakdown = computeAffinity(session.skills, userSkills, session.department, u.department, 0);
    const [first, ...rest] = (u.name ?? '').split(' ');
    return {
      id: i + 1,
      orcid: u.orcid,
      name: first ?? u.name ?? '',
      surname: rest.join(' '),
      role: u.role ?? 'Investigador',
      dept: u.department ?? 'General',
      seed: u.name ?? u.orcid,
      tags: userSkills,
      groups: [],
      projects: 0,
      pubs: pubsByOrcid.get(u.orcid) ?? 0,
      open: Boolean(u.openToCollab),
      match: breakdown.score,
      bio: u.bio ?? '',
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : undefined,
      affiliation: u.affiliation ?? undefined,
      matchBreakdown: {
        sharedSkills: breakdown.sharedSkills,
        sameDept: breakdown.sameDept,
        sharedPaperTopics: breakdown.sharedPaperTopics,
        hasData: breakdown.hasData,
      },
    };
  });
}

function enrichMockResearchers(session: { skills: string[]; department: string | null }): LoadedResearcher[] {
  return mockResearchers.map((r) => {
    const breakdown = computeAffinity(session.skills, r.tags, session.department, r.dept, 0);
    const effectiveScore = breakdown.hasData ? breakdown.score : r.match;
    return {
      ...r,
      match: effectiveScore,
      matchBreakdown: {
        sharedSkills: breakdown.sharedSkills,
        sameDept: breakdown.sameDept,
        sharedPaperTopics: breakdown.sharedPaperTopics,
        hasData: breakdown.hasData,
      },
    };
  });
}
