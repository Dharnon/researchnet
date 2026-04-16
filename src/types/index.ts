export type Researcher = {
  id: number;
  orcid?: string;
  name: string;
  surname: string;
  role: string;
  dept: string;
  seed: string;
  tags: string[];
  groups: string[];
  projects: number;
  pubs: number;
  open: boolean;
  match: number;
  bio: string;
  createdAt?: string;
  affiliation?: string;
  matchBreakdown?: MatchBreakdown;
};

export type MatchBreakdown = {
  sharedSkills: string[];
  sameDept: boolean;
  sharedPaperTopics: number;
  hasData: boolean;
};

export type Opportunity = {
  id: number;
  title: string;
  dept: string;
  deadline: string;
  type: string;
  hot: boolean;
  desc: string;
};

export type CurrentUser = {
  orcid: string;
  name: string;
  email: string | null;
};

export type FeaturedPaper = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  area: string;
  citations?: number;
  doi?: string;
};

export type ResearchArea = {
  name: string;
  count: number;
  color?: string;
};

export type ResearchGroup = {
  name: string;
  dept: string;
  members: number;
  focus: string;
  seed: string;
};

export type EditorialTile =
  | { kind: "featuredResearcher"; researcher: Researcher; quote: string }
  | { kind: "featuredPaper"; paper: FeaturedPaper }
  | { kind: "hotOpportunity"; opportunity: Opportunity }
  | { kind: "area"; area: ResearchArea }
  | { kind: "group"; group: ResearchGroup }
  | { kind: "cta"; title: string; description: string; cta: string };
