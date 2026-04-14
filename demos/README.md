# ResearchNet — External Data Sources Research

## 1. Scopus API (Elsevier)

### Overview
Scopus is the largest abstract and citation database of peer-reviewed literature.
It's the industry standard for academic author profiles and publication data.

### API Capabilities

| Endpoint | Purpose | Auth Required |
|---|---|---|
| `GET /content/search/author` | Find authors by name, affiliation, ORCID | API Key |
| `GET /content/author/author_id/{id}` | Full author profile | API Key |
| `GET /content/author/eid/{eid}` | Author profile by EID | API Key |
| `GET /content/author/orcid/{orcid}` | Author profile by ORCID | API Key |
| `GET /content/abstract/eid/{eid}` | Full abstract + metadata | API Key |
| `GET /content/search/affiliation` | Search institutions | API Key |
| `GET /content/search/scopus` | Search publications | API Key |
| `GET /content/scidir/author` | SciVal metrics (paid) | API Key + subscription |

### What you get per author:
- Name, affiliation history (current + past)
- Document count, citation count, h-index
- Co-author list with author IDs
- Subject areas, ORCID
- Publication history with EIDs

### Auth Options
1. **Institution token** (`X-ELS-Insttoken`) — via university Elsevier subscription, preferred
2. **API Key only** — registration at dev.elsevier.com, limited access
3. **API Key + OAuth** — full access

### Cost
- Registration: Free
- API Key: Free (with rate limits ~5k/month on free tier)
- Full data access: **Requires institutional subscription** (Elsevier contracts with universities — cost varies, typically €thousands/year)

### Rate Limits (free key)
- ~5 requests/second
- Monthly quota varies by plan

### Use for ResearchNet: ⭐⭐⭐⭐ (4/5)
- ✅ Excellent author profile data
- ✅ Co-author network data useful for researcher matching
- ✅ h-index, citation metrics for ranking/recommendation
- ⚠️ Institutional access required for full data — most Spanish universities likely have it
- ⚠️ Not free for commercial use beyond free tier

---

## 2. UniversityXXI

### Overview
Spanish university collaboration platform. Managed/sponsored by CRUE (Conferencia de Rectores de las Universidades Españolas).

**Status: INACTIVE / NOT FOUND**
- universityxxi.com — domain not found
- universityxxi.es — not found
- crue.org/universityxxi — 404

### What it was
Based on context from CRUE's digital agenda, UniversityXXI was likely part of a Spanish
digital transformation initiative for universities, possibly related to open science,
research data infrastructure, or inter-university collaboration tools.

### API Status: **NONE DISCOVERED**
- No developer documentation found
- No public API endpoint
- Website appears offline

### Recommendation: Do not integrate with UniversityXXI directly.
It is not an active platform as of 2026.

### Better alternatives for researcher matching in Spain:

| Source | API | Best For |
|---|---|---|
| **ORCID** | Public, free | Author identity, publications, ORCID ID |
| **Dialnet** (Univ. La Rioja) | Unofficial scraping | Spanish theses, publications |
| **Scopus** (Elsevier) | Commercial | As above — institutional access |
| **Google Scholar** | Unofficial/scraping | Broad coverage, citation counts |
| **CRUE** | Contact directly | Institutional partnerships |

---

## Summary: Recommended Integration Path for ResearchNet

```
Sign-up flow:
1. Researcher creates account with email
2. Optional: connect ORCID → auto-populate name, publications, ORCID ID
3. Manual: add areas of expertise, university affiliation
4. Recommendation engine uses ORCID data + manual input to match

Institutional enrichment (if university has Scopus subscription):
- On profile completion, prompt "Enrich with publications"
- Query Scopus API with ORCID or name+affiliation
- Display imported publications with verification badge
```

This approach avoids the biggest onboarding friction (manual data entry) while keeping
legal/compliance simple (user controls what gets imported).