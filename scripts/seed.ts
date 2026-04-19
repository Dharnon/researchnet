/**
 * Seed script for ResearchNet.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *   # or (if tsx unavailable): npx ts-node --transpile-only scripts/seed.ts
 *
 * Inserts ~20 mock researchers with skills, publications and affiliations so
 * that /discover looks populated even without real ORCID signups.
 *
 * Safe to re-run: upserts by ORCID and skips rows that already exist.
 */

import Database from "better-sqlite3";

type Mock = {
  orcid: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  affiliation: string;
  openToCollab: 0 | 1;
  skills: string[];
  publications: { title: string; year: number; journal: string; doi?: string; citations?: number }[];
};

const MOCK: Mock[] = [
  {
    orcid: "0000-0001-0001-0001",
    name: "Elena Vargas",
    role: "Profesora Titular",
    department: "Ingeniería Biomédica",
    affiliation: "Universidad de Santiago",
    bio: "Interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales.",
    openToCollab: 1,
    skills: ["Machine Learning", "Neurociencia", "BCI", "Deep Learning"],
    publications: [
      { title: "Towards Interpretable Brain-Computer Interfaces: A Survey on Deep Learning Approaches", year: 2025, journal: "Nature Machine Intelligence", doi: "10.1038/s41586-025-0001", citations: 142 },
      { title: "EEG decoding with transformer models", year: 2024, journal: "NeurIPS", citations: 58 },
    ],
  },
  {
    orcid: "0000-0001-0002-0002",
    name: "Marcos Ibáñez",
    role: "Investigador Senior",
    department: "Ciencias de la Computación",
    affiliation: "Universidad Politécnica",
    bio: "Modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa.",
    openToCollab: 1,
    skills: ["NLP", "LLMs", "Ética en IA", "Machine Learning"],
    publications: [
      { title: "Multilingual LLMs: Benchmarking Fairness Across 42 Low-Resource Languages", year: 2025, journal: "TACL", doi: "10.1162/tacl_a_0001", citations: 87 },
    ],
  },
  {
    orcid: "0000-0001-0003-0003",
    name: "Sofía Ríos",
    role: "Profesora Asociada",
    department: "Biología Molecular",
    affiliation: "CSIC",
    bio: "Herramientas computacionales para análisis de variantes genéticas y edición génica.",
    openToCollab: 0,
    skills: ["Genómica", "CRISPR", "Bioinformática"],
    publications: [
      { title: "CRISPR screening in organoids", year: 2024, journal: "Nature Methods", citations: 66 },
    ],
  },
  {
    orcid: "0000-0001-0004-0004",
    name: "Andrés Leal",
    role: "Profesor Asociado",
    department: "Física Computacional",
    affiliation: "Universidad de Santiago",
    bio: "Algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria.",
    openToCollab: 1,
    skills: ["Computación Cuántica", "Simulación", "Algoritmos"],
    publications: [
      { title: "Variational Quantum Eigensolvers for Lattice Gauge Theories", year: 2023, journal: "Physical Review X", citations: 41 },
    ],
  },
  {
    orcid: "0000-0001-0005-0005",
    name: "Carmen Fuentes",
    role: "Investigadora Posdoctoral",
    department: "Salud Pública",
    affiliation: "Universidad Autónoma",
    bio: "Modelos predictivos a datos epidemiológicos para sistemas de alerta temprana.",
    openToCollab: 1,
    skills: ["Epidemiología", "Salud Digital", "Machine Learning"],
    publications: [
      { title: "Early warning dashboards for respiratory outbreaks", year: 2025, journal: "Lancet Digital Health", citations: 19 },
    ],
  },
  {
    orcid: "0000-0001-0006-0006",
    name: "Felipe Mora",
    role: "Profesor Titular",
    department: "Robótica e IA",
    affiliation: "Universidad Politécnica",
    bio: "Sistemas de percepción visual para robots autónomos en entornos no estructurados.",
    openToCollab: 0,
    skills: ["Robótica", "Computer Vision", "Deep Learning"],
    publications: [{ title: "Vision transformers for off-road autonomy", year: 2024, journal: "ICRA", citations: 44 }],
  },
  {
    orcid: "0000-0001-0007-0007",
    name: "Lucía Navarro",
    role: "Doctoranda",
    department: "Ciencias de la Computación",
    affiliation: "Universidad Politécnica",
    bio: "Sistemas de recomendación justos y explicables.",
    openToCollab: 1,
    skills: ["Machine Learning", "Fairness", "Recommender Systems"],
    publications: [{ title: "Counterfactual fairness in rank-aware metrics", year: 2025, journal: "FAccT", citations: 5 }],
  },
  {
    orcid: "0000-0001-0008-0008",
    name: "Héctor Paz",
    role: "Profesor Titular",
    department: "Ingeniería Biomédica",
    affiliation: "Universidad de Santiago",
    bio: "Segmentación de imagen médica con modelos generativos.",
    openToCollab: 1,
    skills: ["Imagen Médica", "Deep Learning", "BCI"],
    publications: [{ title: "Diffusion priors for 3D MRI reconstruction", year: 2024, journal: "MICCAI", citations: 27 }],
  },
  {
    orcid: "0000-0001-0009-0009",
    name: "Valentina Soto",
    role: "Investigadora Senior",
    department: "Biología Molecular",
    affiliation: "CSIC",
    bio: "Transcriptómica de célula única aplicada a tumores sólidos.",
    openToCollab: 1,
    skills: ["Genómica", "Single-cell", "Cáncer"],
    publications: [{ title: "Single-Cell Transcriptomics Reveals Novel Tumor Heterogeneity Patterns", year: 2026, journal: "Cell", doi: "10.1016/j.cell.2026.0001", citations: 23 }],
  },
  {
    orcid: "0000-0001-0010-0010",
    name: "Ramón Estévez",
    role: "Profesor Asociado",
    department: "Física Computacional",
    affiliation: "Universidad Autónoma",
    bio: "Protocolos criptográficos post-cuánticos.",
    openToCollab: 1,
    skills: ["Computación Cuántica", "Criptografía", "Algoritmos"],
    publications: [{ title: "Lattice-based post-quantum key exchange at scale", year: 2023, journal: "Crypto", citations: 31 }],
  },
  {
    orcid: "0000-0001-0011-0011",
    name: "Diana Herrera",
    role: "Posdoctoral",
    department: "Robótica e IA",
    affiliation: "Universidad Politécnica",
    bio: "Aprendizaje por refuerzo para manipulación robótica.",
    openToCollab: 1,
    skills: ["Robótica", "Reinforcement Learning", "Computer Vision"],
    publications: [{ title: "Offline RL for contact-rich manipulation", year: 2025, journal: "RSS", citations: 12 }],
  },
  {
    orcid: "0000-0001-0012-0012",
    name: "Iván Cabrera",
    role: "Investigador Posdoctoral",
    department: "Salud Pública",
    affiliation: "Universidad Autónoma",
    bio: "Minería de texto clínico para detección temprana de brotes.",
    openToCollab: 0,
    skills: ["Epidemiología", "NLP", "Salud Digital"],
    publications: [{ title: "Clinical text mining for syndromic surveillance", year: 2024, journal: "JAMIA", citations: 15 }],
  },
  {
    orcid: "0000-0001-0013-0013",
    name: "Nora Salinas",
    role: "Profesora Asistente",
    department: "Ciencias de la Computación",
    affiliation: "Universidad Autónoma",
    bio: "Compiladores y runtimes para sistemas distribuidos.",
    openToCollab: 1,
    skills: ["Sistemas Distribuidos", "Compiladores", "Runtime Systems"],
    publications: [{ title: "A tracing-aware Rust runtime for service meshes", year: 2025, journal: "OSDI", citations: 8 }],
  },
  {
    orcid: "0000-0001-0014-0014",
    name: "Alejandro Reyes",
    role: "Profesor Asociado",
    department: "Ingeniería de Sistemas",
    affiliation: "Universidad de Santiago",
    bio: "IoT industrial y edge computing con garantías de tiempo real.",
    openToCollab: 1,
    skills: ["IoT", "Edge Computing", "Sistemas Distribuidos"],
    publications: [{ title: "Deterministic scheduling on LoRa mesh networks", year: 2024, journal: "IEEE IoT", citations: 17 }],
  },
  {
    orcid: "0000-0001-0015-0015",
    name: "Martina Vega",
    role: "Doctoranda",
    department: "Biología Molecular",
    affiliation: "Universidad Politécnica",
    bio: "Bioinformática aplicada a microbioma humano.",
    openToCollab: 1,
    skills: ["Bioinformática", "Genómica", "Machine Learning"],
    publications: [{ title: "Meta-analysis of gut microbiome signatures in IBD", year: 2025, journal: "Gut", citations: 10 }],
  },
  {
    orcid: "0000-0001-0016-0016",
    name: "Rafael Ocampo",
    role: "Profesor Titular",
    department: "Física Computacional",
    affiliation: "CSIC",
    bio: "Métodos numéricos para dinámica de fluidos y clima.",
    openToCollab: 0,
    skills: ["Simulación", "Computación Científica", "HPC"],
    publications: [{ title: "Large-eddy simulations of tropical convection on GPUs", year: 2023, journal: "JCP", citations: 22 }],
  },
  {
    orcid: "0000-0001-0017-0017",
    name: "Beatriz Canales",
    role: "Investigadora Senior",
    department: "Ciencias de la Computación",
    affiliation: "Universidad de Santiago",
    bio: "Verificación formal de sistemas críticos.",
    openToCollab: 1,
    skills: ["Verificación Formal", "Lenguajes de Programación", "Seguridad"],
    publications: [{ title: "Mechanized proofs for distributed consensus", year: 2024, journal: "PLDI", citations: 14 }],
  },
  {
    orcid: "0000-0001-0018-0018",
    name: "Camilo Ortiz",
    role: "Doctorando",
    department: "Robótica e IA",
    affiliation: "Universidad Autónoma",
    bio: "Drones autónomos para agricultura de precisión.",
    openToCollab: 1,
    skills: ["Robótica", "Computer Vision", "UAV"],
    publications: [{ title: "Canopy-aware path planning for UAV spraying", year: 2025, journal: "Computers and Electronics in Agriculture", citations: 3 }],
  },
  {
    orcid: "0000-0001-0019-0019",
    name: "Julieta Peña",
    role: "Profesora Asociada",
    department: "Ingeniería Biomédica",
    affiliation: "Universidad Politécnica",
    bio: "Señales cardiovasculares y modelos de predicción personalizada.",
    openToCollab: 1,
    skills: ["Imagen Médica", "Machine Learning", "Bioseñales"],
    publications: [{ title: "Wearable ECG foundations for personalized risk", year: 2024, journal: "npj Digital Medicine", citations: 34 }],
  },
  {
    orcid: "0000-0001-0020-0020",
    name: "Sebastián Moya",
    role: "Postdoctoral",
    department: "Salud Pública",
    affiliation: "Universidad de Santiago",
    bio: "Redes sociales y difusión de desinformación en salud.",
    openToCollab: 1,
    skills: ["NLP", "Redes Sociales", "Salud Digital"],
    publications: [{ title: "Detecting health misinformation cascades on Mastodon", year: 2025, journal: "EPJ Data Science", citations: 7 }],
  },
];

function run() {
  const sqlite = new Database("research.db");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      orcid TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      role TEXT,
      department TEXT,
      bio TEXT,
      avatar TEXT,
      affiliation TEXT,
      open_to_collab INTEGER DEFAULT 0,
      access_token TEXT,
      refresh_token TEXT,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS publications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orcid TEXT NOT NULL REFERENCES users(orcid),
      doi TEXT,
      title TEXT NOT NULL,
      year INTEGER,
      journal TEXT,
      citations INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orcid TEXT NOT NULL REFERENCES users(orcid),
      skill TEXT NOT NULL
    );
  `);

  type ColInfo = { name: string };
  const ensureCol = (col: string, ddl: string) => {
    const info = sqlite.prepare("PRAGMA table_info(users)").all() as ColInfo[];
    if (!info.some((c) => c.name === col)) sqlite.exec(`ALTER TABLE users ADD COLUMN ${ddl}`);
  };
  ensureCol("affiliation", "affiliation TEXT");
  ensureCol("open_to_collab", "open_to_collab INTEGER DEFAULT 0");

  const now = Date.now();
  let inserted = 0;
  let skipped = 0;

  const insertUser = sqlite.prepare(`
    INSERT OR IGNORE INTO users (orcid, name, role, department, bio, affiliation, open_to_collab, created_at)
    VALUES (@orcid, @name, @role, @department, @bio, @affiliation, @openToCollab, @createdAt)
  `);
  const hasSkill = sqlite.prepare(`SELECT 1 FROM skills WHERE orcid = ? AND skill = ? LIMIT 1`);
  const insertSkill = sqlite.prepare(`INSERT INTO skills (orcid, skill) VALUES (?, ?)`);
  const hasPub = sqlite.prepare(`SELECT 1 FROM publications WHERE orcid = ? AND title = ? LIMIT 1`);
  const insertPub = sqlite.prepare(`
    INSERT INTO publications (orcid, title, year, journal, doi, citations)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const tx = sqlite.transaction(() => {
    for (let i = 0; i < MOCK.length; i++) {
      const r = MOCK[i]!;
      const res = insertUser.run({
        orcid: r.orcid,
        name: r.name,
        role: r.role,
        department: r.department,
        bio: r.bio,
        affiliation: r.affiliation,
        openToCollab: r.openToCollab,
        createdAt: now - i * 86400_000,
      });
      if (res.changes > 0) inserted++;
      else skipped++;

      for (const s of r.skills) {
        if (!hasSkill.get(r.orcid, s)) insertSkill.run(r.orcid, s);
      }
      for (const p of r.publications) {
        if (!hasPub.get(r.orcid, p.title)) {
          insertPub.run(r.orcid, p.title, p.year, p.journal, p.doi ?? null, p.citations ?? 0);
        }
      }
    }
  });
  tx();

  console.log(`Seed complete. Inserted ${inserted} users, skipped ${skipped} existing.`);
  sqlite.close();
}

run();
