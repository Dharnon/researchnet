/**
 * Scopus API Demo - ResearchNet Integration
 * =========================================
 * Requires: npm install axios dotenv
 * 
 * Auth options:
 *   1. Institutional token (via university subscription) — preferred, no cost
 *   2. API Key only — limited access, some endpoints restricted
 *   3. API Key + OAuth bearer token — full access
 * 
 * Get your API key: https://dev.elsevier.com/
 * ( registration required, institutional access may be needed for full data )
 */

const axios = require('axios');

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const config = {
  // Get from https://dev.elsevier.com/ after registration
  API_KEY: process.env.SCOPUS_API_KEY || 'YOUR_API_KEY_HERE',
  
  // Institutional token — get from your university'sElsevier subscription admin
  INST_TOKEN: process.env.SCOPUS_INST_TOKEN || null,
  
  // Base URL for all Scopus APIs
  BASE_URL: 'https://api.elsevier.com',
  
  // Output format: application/json (default), application/xml, application/atom+xml
  ACCEPT: 'application/json'
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function createClient() {
  const headers = {
    'X-ELS-APIKey': config.API_KEY,
    'Accept': config.ACCEPT
  };
  
  if (config.INST_TOKEN) {
    headers['X-ELS-Insttoken'] = config.INST_TOKEN;
  }
  
  return axios.create({
    baseURL: config.BASE_URL,
    headers
  });
}

// ─── API: Author Search ───────────────────────────────────────────────────────
/**
 * Search for authors by name, affiliation, co-author, ORCID, etc.
 * Docs: https://dev.elsevier.com/documentation/AuthorSearchAPI.wadl
 * 
 * Useful query fields:
 *   - authname(n)       → exact author name
 *   - affil(name)       → affiliation name
 *   - coauthor(auid)    → authors co-authored with a given author ID
 *   - orcid             → ORCID identifier
 *   - city              → affiliation city
 *   - country           → affiliation country
 */
async function searchAuthors(query, limit = 25) {
  const client = createClient();
  const response = await client.get('/content/search/author', {
    params: {
      query,
      count: limit,
      start: 0
    }
  });
  
  const results = response.data['search-results'];
  console.log(`\n🔍 Author Search: "${query}"`);
  console.log(`   Total results: ${results['opensearch:totalResults']}`);
  
  return results.entry || [];
}

// ─── API: Author Retrieval ───────────────────────────────────────────────────
/**
 * Get full author profile by Scopus Author ID.
 * Docs: https://dev.elsevier.com/documentation/AuthorRetrievalAPI.wadl
 * 
 * Returns: publications count, citation count, h-index, co-authors,
 *          subject areas, affiliation history, ORCID, etc.
 */
async function getAuthorProfile(authorId) {
  const client = createClient();
  const response = await client.get(`/content/author/author_id/${authorId}`);
  
  const profile = response.data['author-retrieval-response'][0];
  console.log(`\n👤 Author Profile: ${authorId}`);
  
  return profile;
}

// ─── API: Abstract Retrieval (by SCOPUS EID) ──────────────────────────────────
/**
 * Get abstract + metadata for a publication by its Scopus EID.
 * Docs: https://dev.elsevier.com/documentation/AbstractRetrievalAPI.wadl
 * 
 * Returns: title, abstract, authors, keywords, cited-by count,
 *          references, publication type, date, venue, etc.
 */
async function getAbstract(eid) {
  const client = createClient();
  const response = await client.get(`/content/abstract/eid/${eid}`, {
    params: { view: 'FULL' }
  });
  
  console.log(`\n📄 Abstract: ${eid}`);
  return response.data;
}

// ─── API: Affiliation Search ───────────────────────────────────────────────────
/**
 * Search for institutions/universities by name.
 * Docs: https://dev.elsevier.com/documentation/AffiliationSearchAPI.wadl
 * 
 * Returns: affiliation ID, name, city, country, type, URL
 */
async function searchAffiliations(query, limit = 10) {
  const client = createClient();
  const response = await client.get('/content/search/affiliation', {
    params: { query, count: limit }
  });
  
  const results = response.data['search-results'];
  console.log(`\n🏛️ Affiliation Search: "${query}"`);
  console.log(`   Total results: ${results['opensearch:totalResults']}`);
  
  return results.entry || [];
}

// ─── API: SciVal Author Metrics ───────────────────────────────────────────────
/**
 * Get metric data for Scopus authors (h-index, citation counts, collaboration, etc.)
 * Docs: https://dev.elsevier.com/documentation/SciValAuthorAPI.wadl
 * 
 * Metric types available:
 *   HIndices, CitationCount, CitedPublications, FieldWeightedCitationImpact,
 *   ScholarlyOutput, Collaboration, CollaborationImpact, CitationsPerPublication,
 *   OutputsInTopCitationPercentiles, AcademicCorporateCollaboration, etc.
 * 
 * Note: SciVal is a paid product — may require institutional subscription
 */
async function getAuthorMetrics(authorIds, metricTypes = ['HIndices', 'CitationCount', 'ScholarlyOutput']) {
  const client = createClient();
  const response = await client.get('/content/scidir/author', {
    params: {
      authors: authorIds.join(','),
      metricTypes: metricTypes.join(','),
      yearRange: '5yrs'
    }
  });
  
  console.log(`\n📊 SciVal Author Metrics for: ${authorIds.join(', ')}`);
  return response.data;
}

// ─── DEMOS ────────────────────────────────────────────────────────────────────

async function runDemos() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║          SCOPUS API — ResearchNet Demos                ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  
  // NOTE: These calls require valid API credentials.
  // Uncomment the calls below once you have your API key configured.
  
  // ── Demo 1: Search authors by name
  // const authors = await searchAuthors('authname(Garcia-Sanchez) AND affil(Barcelona)');
  // authors.slice(0, 5).forEach(a => {
  //   console.log(`  [${a['dc:identifier']}] ${a['preferred-name']['given-name']} ${a['preferred-name']['surname']} — ${a['affiliation-current']?.['affiliation-name'] || 'no affiliation'}`);
  // });
  
  // ── Demo 2: Get author profile by Scopus ID
  // Replace with a real Scopus Author ID
  // const profile = await getAuthorProfile('57025948800');
  // const info = profile['author-profile'];
  // console.log(`  Name: ${info['person-name']['given-name']} ${info['person-name']['surname']}`);
  // console.log(`  Documents: ${profile['coredata']['document-count']}`);
  // console.log(`  Citations: ${profile['coredata']['citation-count']}`);
  
  // ── Demo 3: Search institutions
  // const affiliations = await searchAffiliations('affil(Universidad Complutense Madrid)');
  // affiliations.forEach(a => console.log(`  [${a['affiliation-id']}] ${a['affiliation-name']}, ${a['affiliation-city']}, ${a['affiliation-country']}`));
  
  // ── Demo 4: SciVal metrics (requires paid subscription)
  // const metrics = await getAuthorMetrics(['57025948800'], ['HIndices', 'CitationCount']);
  
  console.log('\n✅ Demo scaffold complete. Configure SCOPUS_API_KEY in .env to activate.');
  console.log('\nRelevant Scopus API endpoints:');
  console.log('  GET /content/search/author        — Search authors');
  console.log('  GET /content/author/author_id/:id — Get author profile');
  console.log('  GET /content/abstract/eid/:eid    — Get publication abstract');
  console.log('  GET /content/search/affiliation   — Search institutions');
  console.log('  GET /content/scidir/author         — SciVal metrics (paid)');
}

runDemos().catch(console.error);

module.exports = { searchAuthors, getAuthorProfile, getAbstract, searchAffiliations, getAuthorMetrics };