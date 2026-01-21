# SeleneX Website Fixes - Staging Review
**Date**: 2026-01-21  
**Status**: Pending Implementation  
**Workflow**: Implement on staging → Review → Push to production

---

## 1. Homepage Hero Animation Copy (High Priority)

**Current text**: "combining radiology with pathology"

**Issue**: This is incorrect and undersells our scope.

**Required update**: We are combining pathology, radiology, genomics, and other multimodal data with advanced machine learning and AI (not only radiology + pathology).

> [!IMPORTANT]
> The exact replacement text has been previously provided. Locate it and implement it as written, then confirm the final displayed copy matches the approved wording exactly.

---

## 2. Mobile Menu Responsiveness (High Priority)

**Issue**: On mobile, the menu is not reliably responsive. Example: tapping "About" does not work.

### Root Cause Analysis (Browser Testing Completed)

> [!CAUTION]
> **Confirmed Bug**: Mobile menu links use incorrect `#anchor` hrefs instead of actual page paths.

**Technical Details**:
- **File**: `partials/navbar.html` (lines 283-411)
- **Problem**: Mobile menu links point to non-existent anchors (e.g., `#about`, `#team`, `#careers`)
- **Desktop menu**: Correctly uses page paths (e.g., `company/about`, `company/team`)
- **Behavior**: When tapped, `onclick="toggleMobileMenu()"` closes the menu, but since the anchor target doesn't exist, no navigation occurs → appears as "dead tap"

**Links requiring fix**:
| Current (Broken) | Should Be |
|------------------|-----------|
| `#technology` | `../technology/technology` |
| `#ethics` | `../technology/ethics-security` |
| `#about` | `../company/about` |
| `#careers` | `../company/careers` |
| `#armenia` | `../company/why-armenia` |
| `#team` | `../company/team` |
| `#partnerships` | `../company/partnerships` |
| `#contact` | `../company/contact` |

**Required update**: Fix mobile navigation hrefs in `partials/navbar.html` to match desktop menu paths.

**Acceptance criteria**:
- [x] No dead taps
- [x] Menu closes/opens correctly
- [x] Links navigate correctly every time
- [x] All mobile menu hrefs match desktop menu hrefs

> [!NOTE]
> **Verified**: Browser testing confirmed all links now navigate correctly to their respective pages.

---

## 3. Metrics/Statistics on Homepage (High Priority)

**Items impacted**:
- "10,000+ validated records" (and associated "15.2+ increase" figures)
- Any other related numeric claims currently shown in that section

**Issue**: These numbers are not accurate yet. Vinnie is calculating/confirming the database metrics, but we do not have final validated figures at this time.

**Required update**: Remove or replace these claims with neutral, accurate language until the final numbers are confirmed:
- Examples: "growing dataset" / "expanding record base" / "validation in progress"
- OR temporarily hide the entire metrics block if that's cleaner

> [!NOTE]
> Propose the simplest accurate interim approach and implement it.

---

## 4. Diagnostic Pathway Performance/Timing Claims (High Priority)

**Current issue**: Wording implying "processing in milliseconds" and "ready" is not accurate.

**Required update**: Remove or soften performance/timing claims so we are not making unsupported statements. If needed, replace with a more general, defensible statement about streamlined workflow / efficient processing without specific time guarantees.

> [!WARNING]
> If the section cannot be made accurate without a larger rewrite, temporarily remove it and flag for content revision.

---

## 5. Global Presence Section (Medium Priority)

**Issue**: Needs to reflect broader international presence.

**Required update**: Add Brazil and Mexico (including flags) to the global presence display.

---

## 6. Team → Founders Page Updates (High Priority)

### A) Founder Flags for Tatev (Datohevasnayan section)

**Required update**: Add Italy 🇮🇹 and Canada 🇨🇦 flags in addition to existing flags, to reflect expertise/geography.

### B) Experience Label

**Current**: "9+ years"  
**Required update**: Change to "10+ years" (visible wherever "9+" appears in founders section)

### C) Expertise/Bio Enhancement

**Required updates**:
1. Add "Research" to the expertise list
2. Extend bio by one additional paragraph (3 paragraphs total is fine) to explicitly reflect:
   - First-authored publications in ML/AI
   - Scientific writing / academic contributions

> [!IMPORTANT]
> This is important for positioning and credibility given the academic nature of the startup.

---

## Implementation Checklist

- [ ] Implement all changes on **staging** first
- [ ] Send staging link for review
- [ ] Get approval before pushing to production
- [ ] After production push, verify all changes are live

---

## Staging URL
`[To be provided after deployment]`

## Production URL
`https://selenex.ai` (or current production domain)
