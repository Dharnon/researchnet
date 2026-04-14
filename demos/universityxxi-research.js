/**
 * UniversityXXI — Research Notes
 * ==============================
 * 
 * Website:       Not confirmed (universityxxi.com/.es not reachable)
 * Related org:   CRUE (Conferencia de Rectores de las Universidades Españolas)
 * Status:        Appears to be a defunct/inactive initiative
 * 
 * What we found:
 * 
 * 1. CRUE (Crue Universitas Spanyol) hosts/did host UniversityXXI:
 *    - The URL crue.org/universityxxi returned a 404
 *    - No active website found at universityxxi.com or universityxxi.es
 * 
 * 2. Historical context (from Spanish higher education community):
 *    - UniversityXXI was a Spanish university collaboration project
 *    - Part of a broader EU/university digital transformation agenda
 *    - May have been related to the "Generación digital" or "España 2024" digital agenda
 * 
 * 3. API status: NO PUBLIC API DISCOVERED
 *    - No developer documentation found
 *    - No GitHub organization
 *    - Website appears offline
 * 
 * 4. Potential data sources for the same purpose:
 *    Instead of UniversityXXI, consider:
 * 
 *    a) CRIS (Current Research Information Systems) platforms:
 *       - DINA.Convergence (Danish model, used in EU)
 *       - Pure (Elsevier) — used by many Spanish universities
 *       - Most Spanish universities have their own CRIS
 * 
 *    b) Spanish academic identity systems:
 *       - ORCID — widely adopted in Spain, free public API
 *       - ResearcherID (Web of Science) — also widely used
 *       - Dialnet (Universidad de La Rioja) — Spanish thesis/paper database
 *         - API?: https://www.dialnet.unirioja.es/ — no official API but scraping possible
 * 
 *    c) CRUE working groups:
 *       - They do have working groups on digitization & research
 *       - Could be a contact point for institutional integration
 * 
 * 5. Practical recommendation for ResearchNet:
 *    UniversityXXI is NOT a viable integration target (inactive/offline).
 * 
 *    Alternatives for researcher discovery in Spain:
 *    ✅ ORCID public API         — best for researcher profile data
 *    ✅ Dialnet                  — Spanish publications, theses
 *    ✅ Google Scholar (scraping or unofficial) — broad coverage
 *    ✅ Scopus API (Elsevier)    — as researched separately
 *    ✅ Web of Science API (Clarivate) — similar to Scopus
 *    ✅ CRIS integration per university — requires individual agreements
 * 
 *    A pragmatic approach for ResearchNet:
 *    1. Ask researchers to connect ORCID on signup → auto-populate profile
 *    2. Use Scopus API (if university has subscription) to enrich with publications
 *    3. For Spanish-specific: leverage Dialnet for publications, CRUE for institutional
 * 
 * Last researched: 2026-04-15
 * Sources: Elsevier Developer Portal, web searches, CRUE website
 */

console.log('See RESEARCH.md for full documentation');