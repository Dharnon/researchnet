# Crossref API — Notes for ResearchNet

> **TL;DR:** Crossref is a free, public API that gives ResearchNet everything it needs to auto-populate researcher profiles — publications, co-authors, journals, years, DOIs, and citation counts — without any manual data entry.

---

## What is Crossref?

[Crossref](https://www.crossref.org/) is the DOI registration agency for academic publications. It maintains a database of 140M+ works (journal articles, books, conference papers, preprints, datasets) with metadata contributed by publishers. Its public API exposes this data at zero cost.

**Key for ResearchNet:** Crossref is the single source of truth for linking researchers → publications → citations.

---

## API Reference

| Operation | Endpoint | Notes |
|---|---|---|
| Search by author | `GET /works?query.author={name}&rows=20` | Fuzzy text match |
| Search by DOI | `GET /works/{doi}` | Full metadata, exact |
| Search by title | `GET /works?query.title={text}` | Full-text search |
| Search by institution | `GET /works?query={institution}` | Broad, add `&filter=affiliation:{ror-id}` |
| Search by ORCID | `GET /works?query.author.orcid={orcid}` | Precise, unambiguous |
| List work details | `GET /works/{doi}?mailto={email}` | Polite pool for rate limits |

### Common Query Parameters

| Param | Example | Purpose |
|---|---|---|
| `rows` | `rows=20` | Number of results (max 100 per page) |
| `select` | `select=DOI,title,author,published,is-referenced-by-count` | Only return needed fields |
| `filter` | `filter=from-pub-date:2010-01-01,type:journal-article` | Date range, document type |
| `sort` | `sort=published&order=desc` | Most-recent first |

### Required Headers

```http
User-Agent: your-email@example.com (ResearchNet / contact info)
Accept: application/json
```

Crossref requires a User-Agent with an email address. No API key needed for public access. If you exceed rate limits, add your email to get into the "polite pool" for higher limits.

### Rate Limits

- Default: **50 requests/second**
- Polite pool (include valid email in `User-Agent`): **100 requests/second**
- Per-IP soft limit: paginate with `Cursor` for large result sets

---

## What Data Can ResearchNet Pull?

### ✅ Available and Reliable

| Field | Crossref key | Use in ResearchNet |
|---|---|---|
| Publication title | `title[0]` | Core display |
| Authors + affiliations | `author[]` (given, family, ORCID, affiliation) | Researcher profile, co-author graph |
| Year published | `published["date-parts"][0][0]` | Timeline / seniority |
| Journal / conference | `container-title[0]` | Venue attribution |
| DOI | `DOI` | Permanent link, deduplication |
| Citation count | `is-referenced-by-count` | Impact metric, h-index source |
| Publisher | `publisher` | Institution context |
| Work type | `type` (journal-article, book, etc.) | Filter / badge |
| ORCID | `author[].ORCID` | Precise author disambiguation |
| URL | `URL` | Direct link to paper |
| ISSN / ISBN | `ISSN`, `ISBN` | Library integration |

### ⚠️ Available but Limited

| Field | Notes |
|---|---|
| Abstract | Only ~40% of works have it; publishers opt in |
| Full-text link | Crossref stores metadata, not content. Use Unpaywall for OA full-text |
| Author affiliation per paper | Sometimes missing, inconsistent across publishers |
| Reproducibility data | Only if authors/publishers included it |

### ❌ Not Available from Crossref

- **Full paper text** — use Unpaywall (oaDOI) for open-access PDFs
- **Peer review data** — Crossref doesn't store reviewer names or reports
- **Grant/funding info** — partially available via `funder[]` field (inconsistent)
- **Private/unpublished works** — if it has no DOI, Crossref doesn't have it

---

## How ResearchNet Should Use It

### Auto-fill Researcher Profile (primary use case)

```
User enters name → search Crossref → deduplicate by DOI/author →
populate: publications list, co-author list, total citations, h-index proxy
```

**Recommended flow:**
1. Ask for their **ORCID** first — this gives exact disambiguation (one API call)
2. Fall back to **name + institution** search
3. Show results, let researcher **confirm/select** which publications are theirs (avoids false positives from name collisions)
4. Store confirmed DOIs → poll Crossref periodically for new citations

### Deduplication Strategy

Multiple researchers can have the same name. Crossref's author disambiguation:
- **`ORCID`** — use this as primary key (`author.ORCID`)
- **`ROR ID`** — link institutions to ROR for affiliation disambiguation
- **`name + institution`** — fuzzy fallback, needs human confirmation

### Staying Fresh

Citation counts change. Crossref doesn't push updates — you must **re-fetch by DOI** periodically:
```
GET /works/{doi}  →  compare is-referenced-by-count
```
A weekly cron job on confirmed DOIs is sufficient for most use cases.

---

## Known Limitations to Communicate to Users

1. **Name ambiguity** — "John Smith" returns hundreds of people. ORCID solves this.
2. **Incomplete coverage** — Some disciplines (especially humanities, pre-2000) have low DOI coverage.
3. **Missing affiliations** — Author institutional affiliation is often absent; can't fully auto-link researcher → institution.
4. **Old works** — Pre-2000 publications often lack DOIs and Crossref records.
5. **Not peer-reviewed** — Crossref includes preprints and datasets; you may want to filter `type:journal-article`.
6. **Abstracts optional** — Don't promise abstracts; ~60% of works lack them.

---

## Quick Test Commands

```bash
# Search by author
curl -H "User-Agent: test@example.com" \
  "https://api.crossref.org/works?query.author=Albert+Einstein&rows=3"

# Resolve DOI
curl -H "User-Agent: test@example.com" \
  "https://api.crossref.org/works/10.1038/nature12373"

# With filters (journal articles only, from 2020)
curl -H "User-Agent: test@example.com" \
  "https://api.crossref.org/works?query.author=John+Smith&filter=type:journal-article,from-pub-date:2020-01-01&rows=10"
```

---

## Complementary APIs

| API | What it adds | URL |
|---|---|---|
| **Unpaywall** | Free OA PDF downloads by DOI | https://unpaywall.org/api/v2 |
| **ORCID** | Author identity + employment history | https://pub.orcid.org |
| **ROR** | Institution IDs (disambiguate "MIT") | https://ror.org/api |
| **OpenCitations** | Citation graph (who cites whom) | https://opencitations.net |

---

*Generated for ResearchNet — Crossref integration spike, 2026-04-15*
