import type {
  Researcher,
  Opportunity,
  FeaturedPaper,
  ResearchArea,
  ResearchGroup,
} from "@/types";

export const researchers: Researcher[] = [
  { id: 1, orcid: "0000-0001-0001-0001", name: "Elena", surname: "Vargas", role: "Profesora Titular", dept: "Ingeniería Biomédica", seed: "Elena Vargas", tags: ["Machine Learning", "Neurociencia", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales.", createdAt: "2026-04-10", affiliation: "Universidad de Santiago" },
  { id: 2, orcid: "0000-0001-0002-0002", name: "Marcos", surname: "Ibáñez", role: "Investigador Senior", dept: "Ciencias de la Computación", seed: "Marcos Ibáñez", tags: ["NLP", "LLMs", "Ética en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa.", createdAt: "2026-04-08", affiliation: "Universidad Politécnica" },
  { id: 3, orcid: "0000-0001-0003-0003", name: "Sofía", surname: "Ríos", role: "Profesora Asociada", dept: "Biología Molecular", seed: "Sofía Ríos", tags: ["Genómica", "CRISPR", "Bioinformática"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Herramientas computacionales para análisis de variantes genéticas y edición génica.", createdAt: "2026-04-05", affiliation: "CSIC" },
  { id: 4, orcid: "0000-0001-0004-0004", name: "Andrés", surname: "Leal", role: "Profesor Asociado", dept: "Física Computacional", seed: "Andrés Leal", tags: ["Computación Cuántica", "Simulación", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria.", createdAt: "2026-03-28", affiliation: "Universidad de Santiago" },
  { id: 5, orcid: "0000-0001-0005-0005", name: "Carmen", surname: "Fuentes", role: "Investigadora Posdoctoral", dept: "Salud Pública", seed: "Carmen Fuentes", tags: ["Epidemiología", "Salud Digital", "Machine Learning"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Modelos predictivos a datos epidemiológicos para sistemas de alerta temprana.", createdAt: "2026-03-20", affiliation: "Universidad Autónoma" },
  { id: 6, orcid: "0000-0001-0006-0006", name: "Felipe", surname: "Mora", role: "Profesor Titular", dept: "Robótica e IA", seed: "Felipe Mora", tags: ["Robótica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Sistemas de percepción visual para robots autónomos en entornos no estructurados.", createdAt: "2026-03-15", affiliation: "Universidad Politécnica" },
  { id: 7, orcid: "0000-0001-0007-0007", name: "Lucía", surname: "Navarro", role: "Doctoranda", dept: "Ciencias de la Computación", seed: "Lucía Navarro", tags: ["Machine Learning", "Fairness", "Recommender Systems"], groups: ["NLP Group"], projects: 1, pubs: 7, open: true, match: 82, bio: "Sistemas de recomendación justos y explicables.", createdAt: "2026-04-13", affiliation: "Universidad Politécnica" },
  { id: 8, orcid: "0000-0001-0008-0008", name: "Héctor", surname: "Paz", role: "Profesor Titular", dept: "Ingeniería Biomédica", seed: "Héctor Paz", tags: ["Imagen Médica", "Deep Learning", "BCI"], groups: ["NeuroAI Lab"], projects: 5, pubs: 49, open: true, match: 88, bio: "Segmentación de imagen médica con modelos generativos.", createdAt: "2026-04-12", affiliation: "Universidad de Santiago" },
  { id: 9, orcid: "0000-0001-0009-0009", name: "Valentina", surname: "Soto", role: "Investigadora Senior", dept: "Biología Molecular", seed: "Valentina Soto", tags: ["Genómica", "Single-cell", "Cáncer"], groups: ["GenomicsLab"], projects: 4, pubs: 36, open: true, match: 66, bio: "Transcriptómica de célula única aplicada a tumores sólidos.", createdAt: "2026-04-01", affiliation: "CSIC" },
  { id: 10, orcid: "0000-0001-0010-0010", name: "Ramón", surname: "Estévez", role: "Profesor Asociado", dept: "Física Computacional", seed: "Ramón Estévez", tags: ["Computación Cuántica", "Criptografía", "Algoritmos"], groups: ["QuantumCS"], projects: 3, pubs: 22, open: true, match: 71, bio: "Protocolos criptográficos post-cuánticos.", createdAt: "2026-03-18", affiliation: "Universidad Autónoma" },
  { id: 11, orcid: "0000-0001-0011-0011", name: "Diana", surname: "Herrera", role: "Posdoctoral", dept: "Robótica e IA", seed: "Diana Herrera", tags: ["Robótica", "Reinforcement Learning", "Computer Vision"], groups: ["RoboticsLab"], projects: 2, pubs: 14, open: true, match: 75, bio: "Aprendizaje por refuerzo para manipulación robótica.", createdAt: "2026-04-09", affiliation: "Universidad Politécnica" },
  { id: 12, orcid: "0000-0001-0012-0012", name: "Iván", surname: "Cabrera", role: "Investigador Posdoctoral", dept: "Salud Pública", seed: "Iván Cabrera", tags: ["Epidemiología", "NLP", "Salud Digital"], groups: ["DataHealth"], projects: 1, pubs: 9, open: false, match: 58, bio: "Minería de texto clínico para detección temprana de brotes.", createdAt: "2026-03-22", affiliation: "Universidad Autónoma" },
];

export const opportunities: Opportunity[] = [
  { id: 1, title: "Postdoc – IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true, desc: "Posición postdoctoral para investigar aplicaciones de machine learning en datos de salud." },
  { id: 2, title: "Convocatoria ANID Fondecyt 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares hasta $300.000 USD, duración 4 años." },
  { id: 3, title: "Colaboración EU Horizon – Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco collaborator para propuesta EU Horizon sobre computación cuántica." },
  { id: 4, title: "Tesis Doctoral – NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Estudiante doctoral para investigación en modelos de lenguaje multilingüe." },
  { id: 5, title: "Research Engineer – Vision", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para sistemas de visión por computador." },
  { id: 6, title: "Beca Marie Curie – Climate AI", dept: "Todas las áreas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para IA aplicada al cambio climático." },
];

export const mockMessages = [
  { orcid: "0000-0002-1234-5678", name: "Elena Vargas", seed: "Elena Vargas", messages: [
    { id: 1, from: "them", text: "Hola! Vi tu perfil y me interesa tu trabajo en sistemas distribuidos.", ts: "10:32" },
    { id: 2, from: "me", text: "Hola Elena! Encantado. Cuéntame más.", ts: "10:35" },
    { id: 3, from: "them", text: "Es sobre sensores distribuidos para monitorización ambiental.", ts: "10:37" },
  ]},
  { orcid: "0000-0003-9876-5432", name: "Felipe Mora", seed: "Felipe Mora", messages: [
    { id: 1, from: "them", text: "Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics.", ts: "Ayer" },
  ]},
];

export const userProfile = {
  name: "José Ignacio", surname: "Hernández",
  role: "Doctorando", dept: "Ingeniería de Sistemas",
  seed: "José Hernández",
  tags: ["Sistemas Distribuidos", "IoT", "Machine Learning"],
  groups: ["DistributedSys Lab", "IoT Center"],
  projects: 2, pubs: 8,
  bio: "Doctorando enfocado en sistemas distribuidos e IoT. Busco colaboraciones.",
  open: true,
};

export const featuredPapers: FeaturedPaper[] = [
  { id: "p1", title: "Towards Interpretable Brain-Computer Interfaces: A Survey on Deep Learning Approaches", authors: ["Elena Vargas", "Héctor Paz"], year: 2025, journal: "Nature Machine Intelligence", area: "Machine Learning", citations: 142, doi: "10.1038/s41586-025-0001" },
  { id: "p2", title: "Multilingual LLMs: Benchmarking Fairness Across 42 Low-Resource Languages", authors: ["Marcos Ibáñez", "Lucía Navarro"], year: 2025, journal: "TACL", area: "NLP", citations: 87, doi: "10.1162/tacl_a_0001" },
  { id: "p3", title: "Single-Cell Transcriptomics Reveals Novel Tumor Heterogeneity Patterns", authors: ["Valentina Soto"], year: 2026, journal: "Cell", area: "Genómica", citations: 23, doi: "10.1016/j.cell.2026.0001" },
];

export const researchAreas: ResearchArea[] = [
  { name: "Machine Learning", count: 412 },
  { name: "Neurociencia", count: 186 },
  { name: "NLP", count: 229 },
  { name: "Genómica", count: 148 },
  { name: "Computación Cuántica", count: 67 },
  { name: "Robótica", count: 134 },
  { name: "Computer Vision", count: 203 },
  { name: "Epidemiología", count: 95 },
  { name: "CRISPR", count: 42 },
  { name: "BCI", count: 38 },
  { name: "Deep Learning", count: 378 },
  { name: "Bioinformática", count: 172 },
  { name: "Salud Digital", count: 111 },
  { name: "Ética en IA", count: 58 },
  { name: "Reinforcement Learning", count: 89 },
  { name: "Criptografía", count: 73 },
];

export type FeaturedList = {
  id: string;
  title: string;
  author: string;
  area: string;
  readTime: string;
  excerpt: string;
};

export const featuredLists: FeaturedList[] = [
  {
    id: "l1",
    title: "Las 7 investigadoras que están redefiniendo la IA aplicada a salud en 2026",
    author: "Ana Torres",
    area: "Machine Learning",
    readTime: "8 min",
    excerpt:
      "Una selección curada de referentes que están marcando el ritmo en imagen médica y modelos fundacionales clínicos.",
  },
  {
    id: "l2",
    title: "Becas y convocatorias clave del Q2 2026: qué solicitar y cuándo",
    author: "Editorial ResearchNet",
    area: "Oportunidades",
    readTime: "6 min",
    excerpt:
      "Desde Marie Curie hasta ANID Fondecyt. Hemos ordenado las convocatorias más relevantes por deadline.",
  },
  {
    id: "l3",
    title: "Cómo 5 grupos de computación cuántica están colaborando entre universidades",
    author: "Paula Jiménez",
    area: "Computación Cuántica",
    readTime: "11 min",
    excerpt:
      "Entrevistas con los líderes de QuantumCS y sus pares europeos sobre la próxima generación de colaboraciones.",
  },
];

export type ResearchProject = {
  id: string;
  name: string;
  tagline: string;
  seed: string;
  initial: string;
};

export const researchProjects: ResearchProject[] = [
  {
    id: "proj1",
    name: "BrainBridge",
    tagline: "Plataforma de datos de interfaces cerebro-computadora.",
    seed: "BrainBridge",
    initial: "B",
  },
  {
    id: "proj2",
    name: "LlavePública",
    tagline: "Open access para investigación latinoamericana.",
    seed: "LlavePública",
    initial: "L",
  },
  {
    id: "proj3",
    name: "ClimaAI",
    tagline: "Modelos climáticos colaborativos con machine learning.",
    seed: "ClimaAI",
    initial: "C",
  },
  {
    id: "proj4",
    name: "OpenGenome",
    tagline: "Pipeline abierto de análisis genómico multi-universidad.",
    seed: "OpenGenome",
    initial: "O",
  },
];

export type ResearchHub = {
  id: string;
  name: string;
  count: number;
  seed: string;
  blurb: string;
};

export const researchHubs: ResearchHub[] = [
  {
    id: "h1",
    name: "Santiago",
    count: 312,
    seed: "Santiago Chile",
    blurb: "investigadores activos en Santiago",
  },
  {
    id: "h2",
    name: "Barcelona",
    count: 486,
    seed: "Barcelona",
    blurb: "investigadores activos en Barcelona",
  },
  {
    id: "h3",
    name: "Ciudad de México",
    count: 274,
    seed: "CDMX",
    blurb: "investigadores activos en Ciudad de México",
  },
];

export type FounderQuote = {
  id: string;
  name: string;
  surname: string;
  seed: string;
  role: string;
  affiliation: string;
  quote: string;
  kicker?: string;
};

export const founderQuotes: FounderQuote[] = [
  {
    id: "f1",
    name: "Elena",
    surname: "Vargas",
    seed: "Elena Vargas",
    role: "Profesora Titular · Ingeniería Biomédica",
    affiliation: "Universidad de Santiago",
    quote:
      "La interpretabilidad no es un extra: es la pieza que separa un modelo publicable de uno realmente usable en clínica.",
    kicker: "Desde el laboratorio",
  },
  {
    id: "f2",
    name: "Marcos",
    surname: "Ibáñez",
    seed: "Marcos Ibáñez",
    role: "Investigador Senior · NLP",
    affiliation: "Universidad Politécnica",
    quote:
      "Trabajar en idiomas minoritarios te obliga a cuestionar qué es una métrica justa y para quién.",
    kicker: "Desde el investigador",
  },
  {
    id: "f3",
    name: "Valentina",
    surname: "Soto",
    seed: "Valentina Soto",
    role: "Investigadora Senior · Biología Molecular",
    affiliation: "CSIC",
    quote:
      "Hacer transcriptómica de célula única en tumores sólidos cambia la pregunta: ya no buscas el gen, buscas el contexto.",
    kicker: "Desde la investigadora",
  },
  {
    id: "f4",
    name: "Andrés",
    surname: "Leal",
    seed: "Andrés Leal",
    role: "Profesor Asociado · Física Computacional",
    affiliation: "Universidad de Santiago",
    quote:
      "Los algoritmos variacionales nos permiten hacer simulaciones que antes parecían imposibles con hardware limitado.",
    kicker: "Desde el investigador",
  },
];

export const researchGroups: ResearchGroup[] = [
  { name: "NeuroAI Lab", dept: "Ingeniería Biomédica", members: 12, focus: "Interfaces cerebro-computadora y señales neuronales con deep learning.", seed: "NeuroAI Lab" },
  { name: "NLP Group", dept: "Ciencias de la Computación", members: 18, focus: "Modelos de lenguaje multilingüe y sistemas de recomendación justos.", seed: "NLP Group" },
  { name: "GenomicsLab", dept: "Biología Molecular", members: 9, focus: "Transcriptómica de célula única y edición génica computacional.", seed: "GenomicsLab" },
  { name: "QuantumCS", dept: "Física Computacional", members: 7, focus: "Algoritmos cuánticos y criptografía post-cuántica.", seed: "QuantumCS" },
  { name: "RoboticsLab", dept: "Robótica e IA", members: 14, focus: "Percepción visual y aprendizaje por refuerzo para robots autónomos.", seed: "RoboticsLab" },
  { name: "DataHealth", dept: "Salud Pública", members: 8, focus: "Modelos predictivos y minería de texto para salud pública.", seed: "DataHealth" },
];
