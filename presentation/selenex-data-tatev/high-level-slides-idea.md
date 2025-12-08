## SLIDE 1 — INTRODUCTION

**Title:**

> SeleneX — The First GenAI Super-Agent for Early & Equitable Ovarian Cancer Care
> 

**Visible slide text (bullets):**

- Multimodal AI for early detection
- Synthetic data engine
- Privacy-preserving federated learning
- Built for low-resource settings

**Logos to include on this slide:**

- Partners with signed MoUs
- Journals where we have been featured
- Other partners we are partnering with

Explicitly mentioned examples (get exact logos from Notion):

- Forbes
- Insider
- Benzinga
- Humans of Future for Women Empowerment
- Free Code Camp
- University of Texas
- University of Erasmus
- Inside Arc
- Spanish Business School
- D-Clinic

---

## SLIDE 2 — THE PROBLEM

**Title:**

> Why Women Are Diagnosed Too Late
> 

**Visible slide text (5 bullet points):**

- 70–75% diagnosed at Stage III–IV
- <30% late-stage survival
- Data scarcity & demographic bias
- Limited access to genomics, specialists
- Weak follow-up → high recurrence deaths

*No script or extra content on the slide. Just title + bullets.*

---

## SLIDE 3 — THE SOLUTION

**Title:**

> SeleneX: Early Detection, Treatment Personalization, and Continuous Follow-up
> 

**Subtitle (on slide):**

> The synthetic data generation engine for Selenix / UNICEF
> 

**Visible slide text (keywords / bullets):**

- Multimodal diagnostic AI
- Synthetic data generation engine
- Federated learning
- Personalized treatment
- AI-guided follow-up

*No screenshots or videos here — just text + visual design.*

---

## SLIDE 4 — WHAT WE BUILT

**Title:**

> What We Built: The Synthetic Data Generation Engine (SDGE)
> 

**Design instruction:**

- **Place an iPad / iPod mockup** on the slide.
- Leave the **screen area empty / generic** so that **I can later insert video or visuals** showing:
    - The prototype of the product / SDGE.

You don’t need to decide the internal content of the screen. Only the frame and layout.

Visible text can be just the **title**, or you can add a very small label like “SDGE prototype” if needed, but no extra bullets are required beyond what I’ve written above.

---

## SLIDE 5 — ARCHITECTURE

**This is the architecture slide.**

**Design instruction:**

- Make a **1-row horizontal pipeline with 5 boxes**, exactly like this structure:

```
[ Module 1 ]
 Real Ultrasound + Biomarkers
 ↓ Reference Distribution

[ Module 2 ]
 CTGAN Clinical Generator
 ↓ Structured Synthetic Data

[ Module 3A ]
 Tabular Diffusion (DDPM)
 ↓ High-fidelity Clinical Profiles

[ Module 3B ]
 Latent/Omics Diffusion
 ↓ High-Dimensional Representations

[ Evaluation Layer ]
 Plausibility • Statistics • Fairness

```

- Keep this pipeline as the **main visual**.
- No extra video or code content is needed here.

---

## SLIDE 6 — CODE BASE OVERVIEW

**Title:**

> Code Base Overview
> 

**Design instruction:**

- **Use a mockup for an iPad** on this slide.
- Inside the iPad screen, **do NOT put real code or GitHub structure** — just leave space / placeholder so **I can later add the GitHub repo and code walkthrough (video or screenshots)**.
- You may add a simple label on or under the device like:
    - “GitHub repo & code base (placeholder)”

No folder lists, no text explaining the repo structure — I will handle all that content later.

---

## SLIDE 7 — PROTOTYPE WALKTHROUGH

**Title:**

> Prototype Walkthrough
> 

**Design instruction:**

- Again, **use a mockup for an iPad / iPod**.
- The iPad screen should be **empty or with a generic placeholder** so that **I can later insert the prototype walkthrough (video / screenshots)**.

**Visible text on slide (as you specified earlier):**

- SDGE Prototype (Live UI)
- Upload → Configure → Generate → Audit → Export
- Multimodal support: tabular, imaging, omics
- Built for hospitals, NGOs & researchers

No extra step-by-step explanation on the slide — I will cover that verbally and/or via the video.

---

## SLIDE 8 — TEAM & PARTNERSHIPS (WITH BLOCKS)

Slide 8 is the **team and partnerships** section, structured into **three blocks**.

You can either:

- Make **one slide with three clearly separated blocks**, or
- Use **sub-slides** (8A, 8B, 8C) if needed for readability.

### BLOCK A — CORE SELENIX SDG TEAM

**Description from me:**

> Block A is the core Selenix SDG team, which means that those are the founders that have Embahe. This is the product and UX team. So Bernardo, Seroja, Embahag, and as well as Lua, Tai, and Farnia. This will be all engineers, AI engineers, data scientists, postdoc engineers.
> 

**Design instruction:**

- Show **founders** and **product/UX + engineering team** in one block.
- Use **names and roles** from the Notion page:
    - Founders (e.g. Tatev, Vahe)
    - Product & UX (Bernardo)
    - Engineers & data (Seroja, Embahag, Lua, Tai, Farnia, etc. as listed)
- Use **photos + names + role titles** only. No long bios on slide.

---

### BLOCK B — CLINICAL & SCIENTIFIC EXPERTS (SMEs)

**Groups (as I specified):**

- Clinical and scientific experts / SMEs in oncology:
    - Dr. Susana
    - Dr. Oksana
    - Dr. Nadia
    - Dr. Anton
- Oncology and bioinformatics SMEs:
    - Dr. Christopher
    - Dr. Tiago
- Radiology and imaging:
    - Dr. Galumyan
- Clinical trials and AI and ML regulation:
    - Dr. Alaknandra
- Commercialization and business:
    - Dr. Yvonne

**Design instruction:**

- Visually group these by their **sub-category** (oncology, bioinformatics, radiology, clinical trials, commercialization).
- For each person: **photo + name + short role/area** (pulled from Notion).
- No long descriptive text on the slide itself.

---

### BLOCK C — INSTITUTIONAL PARTNERS

**Partners to show (as I specified):**

- Inside Arc — German partners
- DI Clinic — Ukrainian partners
- IESE Business School — Spanish partners, academic partners in health innovation
- ANDglobal Solutions — Canadian / U.S. partners with oncology, clinical, and RBE

**Design instruction:**

- Use each **institution’s logo + name**.
- Under each, a **very short line** indicating the type of partner (e.g., “German partner,” “Ukrainian partner,” etc., following the wording above).
- No extra copy beyond what I have written.

All detailed descriptions and photos are on the Notion page — please use those as the source, but avoid turning long bios into slide text.

---

## SLIDE 9 — BUSINESS MODEL

**Topic (from me):**

> “The business model, which is the open source, open core strategy, the revenue streams, and the equity principles.”
> 

**On-slide structure:**

You can use three sections on the same slide:

1. **Open source, open core strategy**
2. **Revenue streams**
3. **Equity principles**

**Content (exact concepts to reflect):**

- **Open-Core Strategy**
    - SDGE core (engine, schemas, baseline models) released as open-source.
    - Transparency, trust, global reuse (UNICEF, hospitals, researchers).
- **Revenue Streams**
    1. Hosted SDGE & Support
    2. Customisation & Integrations
    3. Advanced Modules & Training
    4. SeleneX full platform including SDGE = commercial clinical product
- **Equity Principle**
    - High-resource clients help subsidise low-resource settings.
    - UNICEF deployments can remain low-cost / free.
    - Sustainable path beyond the grant.

No speaker script on this slide — just these elements as text/boxes.