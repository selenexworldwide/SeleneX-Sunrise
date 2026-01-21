# SeleneX Website Updates Report

**Last Updated**: 2026-01-21  
**Repository**: LunarTechAI/selenex-website  
**Production URL**: https://selenex.ai

---

## Summary

This document provides a comprehensive overview of all updates, fixes, and enhancements made to the SeleneX website. Updates are organized chronologically with the most recent changes first.

---

## 📅 January 2026 Updates

### Redesign: Built for Purpose Section *(2026-01-21)*

**Commit**: `1a129a0`

Major aesthetic overhaul of the "Built for Purpose" section with modern premium design:

| Feature | Description |
|---------|-------------|
| **Animated Header Badge** | Pulsing indicator with refined animation |
| **Timeline Cards** | Connected with violet/emerald dots for visual flow |
| **Compact Layout** | Horizontal design with section titles |
| **Mission Statement** | Decorative quote marks for emphasis |
| **Background** | Animated gradient orbs for depth |
| **Footer Label** | "Our Mission" with decorative lines |

**Files Modified**: [index.html](file:///d:/Desktop%20D/Apps/selenex-website/selenex-website/index.html) (+110/-59 lines)

---

### Mobile Navigation Fix *(2026-01-21)*

> [!IMPORTANT]
> Critical bug fix for mobile menu functionality.

**Issue**: Mobile menu links used incorrect `#anchor` hrefs instead of actual page paths, causing "dead taps" where navigation failed silently.

**Root Cause**: `onclick="toggleMobileMenu()"` closed the menu, but non-existent anchor targets prevented navigation.

**Links Fixed**:
| Before (Broken) | After (Fixed) |
|-----------------|---------------|
| `#technology` | `../technology/technology` |
| `#ethics` | `../technology/ethics-security` |
| `#about` | `../company/about` |
| `#careers` | `../company/careers` |
| `#armenia` | `../company/why-armenia` |
| `#team` | `../company/team` |
| `#partnerships` | `../company/partnerships` |
| `#contact` | `../company/contact` |

**Files Modified**: [partials/navbar.html](file:///d:/Desktop%20D/Apps/selenex-website/selenex-website/partials/navbar.html)

---

### Homepage Content Updates *(2026-01-21 - Staged)*

The following updates are documented for staging review:

#### Hero Animation Copy
- **Previous**: "combining radiology with pathology"
- **Updated**: Reflects full scope—pathology, radiology, genomics, and multimodal data with advanced ML/AI

#### Metrics/Statistics
- Removed/softened unverified claims ("10,000+ validated records", "15.2+ increase")
- Replaced with neutral language: "growing dataset" / "expanding record base"

#### Diagnostic Pathway Claims
- Removed specific timing claims ("Processing • 0.09s", "Ready")
- Updated to general, defensible statements about streamlined workflow

---

### Global Presence Section *(2026-01-21)*

**Update**: Added Brazil 🇧🇷 and Mexico 🇲🇽 to the international presence display.

---

### Team/Founders Page Updates *(2026-01-21)*

| Update | Details |
|--------|---------|
| **Tatev Flags** | Added 🇮🇹 Italy and 🇨🇦 Canada |
| **Experience** | Changed "9+ years" → "10+ years" |
| **Expertise** | Added "Research" to list |
| **Bio Enhancement** | Extended with paragraph on first-authored ML/AI publications and scientific writing contributions |

---

## 📅 December 2025 Updates

### Fresh Start - December 2024 Update *(2025-12-09)*

**Commit**: `0556289`

Major refresh and restructuring of the entire website:

- Complete codebase reorganization
- Updated file structure and dependencies
- Fresh styling approach

---

### Dropdown Navigation Front Glass Update *(2025-12-09)*

Enhanced navbar dropdown menus with premium glassmorphism effects:

- **Wind-style animations**: Curtain-like expand/collapse
- **Liquid glass panels**: Dark elegant style matching navbar
- **Staggered card animations**: Sequential reveal with easing
- **Viewport centering**: Proper positioning on all screen sizes
- **Responsive adjustments**: Breakpoints at 1024px and 768px

---

### Navbar and Front Video Section *(2025-12-09)*

- Updated navigation structure
- Video section enhancements
- Improved responsive behavior

---

## 📅 November 2025 Updates

### Initial Commit and Foundation *(2025-11-26 to 2025-11-27)*

**Commits**: `54d5ebb`, `1b4fd95`, `e012791`, `e851bb5`, `334902f`, `4ae6525`

| Update | Description |
|--------|-------------|
| **Initial Setup** | Added `selenex-landing.html` |
| **Clinical Gap Section** | Reduced header size for balance |
| **Clinical Evidence Header** | Resized to match "The Clinical Gap" |
| **Documentation Cleanup** | Deleted `.md` documents directory |
| **Repository Structure** | Merge and synchronization with main |

---

## 🏗️ Architecture Overview

### File Structure

```
selenex-website/
├── index.html              # Main homepage (5,561 lines)
├── research.html           # Research page
├── company/
│   ├── about.html          # About page
│   ├── careers.html        # Careers page
│   ├── contact.html        # Contact page
│   ├── partnerships.html   # Partnerships page
│   ├── team.html           # Team page
│   └── why-armenia.html    # Why Armenia page
├── technology/
│   ├── technology.html     # Technology overview
│   └── ethics-security.html # Ethics & Security
├── partials/
│   ├── navbar.html         # Shared navigation
│   └── footer.html         # Shared footer
├── assets/                 # Images, videos, icons
├── scripts/                # JavaScript utilities
├── templates/              # HTML templates
├── terms/                  # Legal documents
├── presentation/           # Presentation assets
├── selenex-data/           # Data files
└── documentation/
    ├── updates.md          # This file
    └── fixes/              # Fix documentation
```

### Design System

- **Font**: Inter (300, 400, 500, 600 weights)
- **Primary Colors**: Brand violet palette (`#8b5cf6` → `#2e1065`)
- **Animations**: fadeUp, blurIn, scaleUp, pulse-slow
- **Glass Effects**: Adaptive liquid glass navbar with dark/light modes
- **Icons**: Lucide + Iconify

---

## 📝 Pending Items

See [staging-fixes-2026-01-21.md](file:///d:/Desktop%20D/Apps/selenex-website/selenex-website/documentation/fixes/staging-fixes-2026-01-21.md) for detailed implementation status:

- [ ] Deploy all changes to staging
- [ ] Review staging environment
- [ ] Get approval for production push
- [ ] Verify production deployment

---

## 📊 Commit History Summary

| Date | Commits | Key Changes |
|------|---------|-------------|
| 2026-01-21 | 1 | Built for Purpose redesign, mobile nav fix |
| 2025-12-09 | 4 | December refresh, dropdowns, navbar updates |
| 2025-11-27 | 5 | Clinical sections, initial setup, cleanup |
| 2025-11-26 | 1 | Initial commit |

---

*This report is auto-generated from git history and documentation files.*
