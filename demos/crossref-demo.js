/**
 * ResearchNet × Crossref API Demo
 * 
 * Demonstrates how Crossref's free public API can auto-fill researcher profiles
 * in ResearchNet — publications, co-authors, citation counts — without manual entry.
 * 
 * Base URL: https://api.crossref.org
 * No API key required. A User-Agent header with email is required.
 */

const https = require('https');

const EMAIL = 'research@example.org'; // ← replace with your email (Crossref policy)
const BASE   = 'api.crossref.org';

// ---------------------------------------------------------------------------
// Helper: make a JSON GET request
// ---------------------------------------------------------------------------
function fetch(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE,
      path,
      method: 'GET',
      headers: {
        'User-Agent': `${EMAIL} (ResearchNet Demo / Node.js)`,
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(`Failed to parse JSON: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Request timeout')); });
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Helper: pretty-print a publication entry
// ---------------------------------------------------------------------------
function printWork(work, index) {
  const title   = work.title?.[0] ?? '(no title)';
  const year    = work.published?.['date-parts']?.[0]?.[0] ?? '?';
  const journal = work['container-title']?.[0] ?? '(no journal)';
  const doi     = work.DOI;
  const citations = work['is-referenced-by-count'] ?? 0;
  const authors  = (work.author ?? [])
    .map(a => `${a.given ?? ''} ${a.family ?? ''}`.trim())
    .join(', ');

  console.log(`  ${index}. ${title}`);
  console.log(`     Authors : ${authors}`);
  console.log(`     Year    : ${year}`);
  console.log(`     Journal : ${journal}`);
  console.log(`     DOI     : https://doi.org/${doi}`);
  console.log(`     Citations: ${citations}`);
  console.log();
}

// ---------------------------------------------------------------------------
// Demo 1 – Search by author name
// ---------------------------------------------------------------------------
async function searchByAuthor(name, rows = 5) {
  console.log(`\n🔍  SEARCH BY AUTHOR: "${name}"\n`);
  const q = encodeURIComponent(name);
  const data = await fetch(`/works?query.author=${q}&rows=${rows}&select=DOI,title,author,published,container-title,is-referenced-by-count`);
  const items = data.message?.items ?? [];
  if (!items.length) { console.log('  No results.\n'); return []; }
  items.forEach((w, i) => printWork(w, i + 1));
  return items;
}

// ---------------------------------------------------------------------------
// Demo 2 – Search by institution keyword
// ---------------------------------------------------------------------------
async function searchByInstitution(institution, rows = 5) {
  console.log(`\n🔍  SEARCH BY INSTITUTION: "${institution}"\n`);
  const q = encodeURIComponent(institution);
  const data = await fetch(`/works?query=${q}&rows=${rows}&select=DOI,title,author,published,container-title,is-referenced-by-count`);
  const items = data.message?.items ?? [];
  if (!items.length) { console.log('  No results.\n'); return []; }
  items.forEach((w, i) => printWork(w, i + 1));
  return items;
}

// ---------------------------------------------------------------------------
// Demo 3 – Resolve a DOI for full metadata
// ---------------------------------------------------------------------------
async function resolveDOI(doi) {
  console.log(`\n🔍  RESOLVE DOI: ${doi}\n`);
  const clean = doi.replace(/^https?:\/\/doi\.org\//, '');
  const data  = await fetch(`/works/${encodeURIComponent(clean)}`);
  const work  = data.message;
  if (!work) { console.log('  DOI not found.\n'); return null; }

  const title      = work.title?.[0] ?? '(no title)';
  const year      = work.published?.['date-parts']?.[0]?.[0] ?? '?';
  const journal    = work['container-title']?.[0] ?? '(no journal)';
  const citations  = work['is-referenced-by-count'] ?? 0;
  const authors    = (work.author ?? [])
    .map(a => `${a.given ?? ''} ${a.family ?? ''}`.trim())
    .join(', ');
  const publisher  = work.publisher ?? '?';
  const type       = work.type ?? '?';
  const url        = work.URL ?? `https://doi.org/${work.DOI}`;

  console.log(`  Title     : ${title}`);
  console.log(`  Authors   : ${authors}`);
  console.log(`  Year      : ${year}`);
  console.log(`  Journal   : ${journal}`);
  console.log(`  Publisher : ${publisher}`);
  console.log(`  Type      : ${type}`);
  console.log(`  DOI       : https://doi.org/${work.DOI}`);
  console.log(`  Citations : ${citations}`);
  console.log(`  URL       : ${url}`);
  console.log();

  return work;
}

// ---------------------------------------------------------------------------
// Demo 4 – Build a mini researcher profile from Crossref
//   (simulates what ResearchNet would auto-populate)
// ---------------------------------------------------------------------------
async function buildResearcherProfile(authorName) {
  console.log(`\n📋  BUILD RESEARCHER PROFILE: "${authorName}"`);
  console.log('  (simulating auto-fill from Crossref)\n');

  const q     = encodeURIComponent(authorName);
  const data  = await fetch(`/works?query.author=${q}&rows=20&select=DOI,title,author,published,container-title,is-referenced-by-count`);
  const items = data.message?.items ?? [];

  if (!items.length) { console.log('  No publications found.\n'); return null; }

  // Aggregate co-authors
  const coauthorSet = new Set();
  const publications = items.map(w => {
    (w.author ?? []).forEach(a => {
      const full = `${a.given ?? ''} ${a.family ?? ''}`.trim();
      if (full && full !== authorName) coauthorSet.add(full);
    });
    return {
      title:     w.title?.[0] ?? '(no title)',
      year:      w.published?.['date-parts']?.[0]?.[0] ?? '?',
      doi:       w.DOI,
      citations: w['is-referenced-by-count'] ?? 0,
    };
  });

  const totalCitations = publications.reduce((s, p) => s + p.citations, 0);

  console.log(`  📚 Publications found : ${publications.length}`);
  console.log(`  👥 Unique co-authors  : ${coauthorSet.size}`);
  console.log(`  📈 Total citations    : ${totalCitations}`);
  console.log();
  console.log('  Recent publications:');
  publications.slice(0, 5).forEach((p, i) => {
    console.log(`    ${i + 1}. [${p.year}] ${p.title} (${p.citations} citations) — doi:${p.doi}`);
  });
  console.log();
  console.log('  Co-authors:');
  [...coauthorSet].slice(0, 10).forEach(c => console.log(`    - ${c}`));
  console.log();

  return { publications, coauthors: [...coauthorSet], totalCitations };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  console.log('============================================');
  console.log('  ResearchNet × Crossref API Demo');
  console.log('  Base: https://api.crossref.org');
  console.log('  Email:', EMAIL);
  console.log('============================================');

  try {
    // 1 – Search by author
    await searchByAuthor('Albert Einstein', 5);

    // 2 – Search by institution
    await searchByInstitution('MIT', 5);

    // 3 – Resolve a known DOI
    await resolveDOI('10.1038/nature12373');  // landmark Nature paper

    // 4 – Build a researcher profile
    await buildResearcherProfile('Margaret Hamilton');

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
