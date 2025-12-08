# **SLIDE 1 — INTRODUCTION**

### **Slide Title:**

**SeleneX — The First GenAI Super-Agent for Early & Equitable Ovarian Cancer Care**

### **Visible Slide Text (minimal):**

- Multimodal AI for early detection
- Synthetic data engine
- Privacy-preserving federated learning
- Built for low-resource settings

---

## **SPEAKER SCRIPT — Slide 1**

“SeleneX is the first **GenAI super-agent** designed to radically improve ovarian cancer care — from early detection to treatment planning and follow-up.

Ovarian cancer is one of the **deadliest and most silent** cancers. Most women show no symptoms until Stage III or IV, when survival drops below 30%. This is even worse in **low-resource regions**, where diagnostic tools, genomic testing, and specialist care are limited.

SeleneX unifies ultrasound imaging, biomarkers, genomics, symptoms, and clinical history into one intelligent system. A core part of its power is our **multimodal Synthetic Data Generation Engine**, which overcomes the biggest barriers in women’s health AI: data scarcity, demographic bias, and privacy constraints.

Our goal is simple: **detect ovarian cancer earlier and more equitably — so more women live.**”

---

# **SLIDE 2 — THE PROBLEM**

### **Slide Title:**

**Why Women Are Diagnosed Too Late**

### **Visible Slide Text:**

- 70–75% diagnosed at Stage III–IV
- <30% late-stage survival
- Data scarcity & demographic bias
- Limited access to genomics, specialists
- Weak follow-up → high recurrence deaths

---

## **SPEAKER SCRIPT — Slide 2**

“Ovarian cancer is a silent killer. **Over 70%** of women are diagnosed at late stages, with survival below **30%**.

Why? Because today there is **no unified diagnostic system** that combines imaging, biomarkers, genomics, symptoms, and socio-economic factors.

AI models often fail in regions like Armenia because **datasets are scarce and biased**, and most tools are built on Western populations.

Women also lack access to genomic testing, high-quality imaging, and oncology specialists — especially in low-resource settings.

And even when diagnosed early, many women die from **recurrence** because follow-up imaging is inconsistent and clinicians lack AI support.

Women aren’t dying because the cancer is unbeatable — they are dying because **the technology is missing**.”

---

# **SLIDE 3 — THE SOLUTION**

### **Slide Title:**

**SeleneX: Early Detection, Treatment Personalization, and Continuous Follow-up**

### **Visible Slide Text:**

- Multimodal diagnostic AI
- Synthetic data generation engine
- Federated learning
- Personalized treatment
- AI-guided follow-up

---

## 🎤 **SPEAKER SCRIPT — Slide 3**

“SeleneX directly fills these gaps.

It is a **multimodal diagnostic and decision-support AI** that integrates ultrasound, omics, biomarkers, clinical features, and symptoms — something no existing system provides.

Our **Synthetic Data Engine** generates high-quality imaging, omics, and clinical data, solving scarcity and bias while ensuring privacy.

SeleneX also provides **treatment personalization**, incorporating tumor biology, drug availability, and real-world constraints such as local specialists and socio-economic barriers.

And because recurrence is common, SeleneX includes **AI-guided follow-up**, supporting clinicians in catching relapse earlier.

Everything runs on privacy-preserving **federated learning**, so hospitals improve models collaboratively without sharing patient data.

SeleneX is a complete ecosystem for early detection, personalized treatment, and continuous care.”

## SLIDE 4 — “What We Built: The Synthetic Data Generation Engine (SDGE)

Here is what we have built so far: the SeleneX Synthetic Data Generation Engine, or SDGE.

One of the things that makes this so unique is that we built — from scratch — **the largest curated ovarian cancer data library available today**.

There is no open-source, unified resource anywhere that brings together ultrasound datasets, biomarker tables, omics matrices, global cancer registries, clinical schemas, and lesion taxonomies into one place.

We built that. And this library is what powers the SDGE — an engine that learns from real medical data and generates realistic synthetic patients that can be safely used for AI training, fairness testing, and research, without exposing any real patient identities.

The engine itself is modular — GANs, diffusion, and latent-space models — and I’ll explain how these pieces work together on the next slide.

## **SLIDE 5 Architecture**

“The engine is built in modules.

**Module 1** is our starting point. Before any model can generate synthetic data, it must first ‘see’ what real ovarian cancer data looks like. So Module 1 combines real ultrasound images and biomarker values to give us a reference of reality.

**Module 2** then learns the basic clinical patterns using CTGAN — things like how age relates to CA-125 levels or tumour size.

**Module 3A** improves this further using diffusion models. Diffusion captures more subtle and rare patterns, such as younger BRCA-positive women with normal biomarkers but suspicious ultrasound findings.

**Module 3B** extends diffusion into more complex data — gene expression, high-dimensional omics, and in the future, image embeddings.

All outputs pass through an evaluation layer that checks medical plausibility, statistical accuracy, and fairness.

And while today we generate high-quality clinical tabular data, this architecture is designed to expand into synthetic ultrasound, CT, MRI and omics as we move forward.”

Make a 1-row horizontal pipeline with 5 boxes:

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

## **Slide 6 — Codebase Overview**

**Goal:** Prove that the system is real, modular, audited, and easy to inspect.

### Frame A – Top-level repo (≈ 40–45s)

**What you show**

Use the screenshot like the last one you sent: top-level `LunarTech-SeleneX` GitHub view with folders:

- `LargestOpenSourceCancerDataSet/`
- `Ovarian Ultrasound + Biomarker Diagnostic Mini-Prototype/`
- `Synthetic Data Generation with GANs/`
- `DiffusionModules/`
- `Privacy-Preserving Federated Learning …/`
- `Synthetic Ovarian Cancer Cohort/`
- `src/`
- plus the **main README** which already explains SeleneX + SDGE. main. TatevKaren:LunarTech-Sele…

![Screenshot 2025-12-03 at 4.14.44 PM.png](attachment:e742e560-b2b0-44eb-b55d-789b4579d311:Screenshot_2025-12-03_at_4.14.44_PM.png)

“Here is our main SDGE repo.

– **‘LargestOpenSourceCancerDataSet’** 

– **‘Ovarian Ultrasound + Biomarker Diagnostic Mini-Prototype’** – this is Module 1, the real-data baseline with ultrasound + biomarkers.

– **‘Synthetic Data Generation with GANs’** – this is Module 2, our CTGAN-based tabular generator.

– **‘DiffusionModules’** – this contains Module 3A and 3B, the diffusion models for clinical and latent data.

– **‘Privacy-Preserving Federated Learning’** and **‘Synthetic Ovarian Cancer Cohort’** show how we plug generators into federated training and package datasets for partners.

“Let me zoom into one of the core SDGE modules.

This is **Module 3A – Tabular Diffusion**.

You can see it’s structured like a real production ML project:

– **`config/`** holds YAML configs for the diffusion schedule and model hyper-parameters.

– **`data/`** contains the preprocessing scripts that turn clinical features into training arrays.

– **`modeling/`** defines the DDPM and neural network architecture.

– **`model_training/`** has the training loop, metrics, and plots.

– **`api/`** exposes a simple `generate_samples` function we can call from the UI.

Everything is documented in the module-level README so other teams can reuse it.”

If you open a file:

“Here, for example, of a file that loads processed arrays, runs the DDPM training, logs metrics and saves checkpoints — this is original code we wrote for SeleneX.”

[]()

“Another important part of the codebase is this folder:

**‘LargestOpenSourceCancerDataSet’**.

This is a curated library we built that maps out ovarian and other cancer datasets worldwide — imaging, biomarkers, genomics, pathology and text — with schemas and access notes.

It’s the data backbone that our Synthetic Data Generation Engine learns from and that partners can also use independently.”

On Slides We can mention which technology we are using

## **Slide 7 — Prototype Walkthrough (~1 min)**

**Goal:** Show the UI, build trust, and prove functionality — FAST.

Use **3–4 screenshots maximum**.

### **SLIDE TEXT**

**SDGE Prototype (Live UI)**

- Upload → Configure → Generate → Audit → Export
- Multimodal support: tabular, imaging, omics
- Built for hospitals, NGOs & researchers

### **SPEAKER SCRIPT**

“This is the SDGE prototype we built.

**1. Upload** anonymized data from ultrasound, clinical tables, or omics.

**2. Configure** the modality and model — CTGAN, Tabular Diffusion, Latent Diffusion — with clinical filters such as ovarian subtype, parity, menopause, BRCA or CA-125.

**3. Generate** synthetic patients, with real-time metrics on fairness, privacy, and statistical fit.

**4. Preview** synthetic patient cards — tabular values, distributions, embeddings.

**5. Audit** the entire dataset for bias, clinical plausibility, and calibration.

**6. Export** in CSV, JSON, FHIR/OMOP or DICOM format for clinicians, researchers,  etc.

## SLIDE 8 - TEAM and Partnerships

## Block A – Core SeleneX SDG Team

*(grant-funded, hands-on build team)*

**Founders (top row – make these visually bigger)**

- 🇦🇲🇺🇸 **Tatev Aslanyan – CEO, Chief AI Architect & Co-Founder**
    
    9+ yrs AI & data science 🇳🇱 🇬🇧 🇮🇹 🇨🇦 🇺🇸
    
    Leads AI architecture, data science, overall team and strategic partnerships.
    
    MSc Econometrics & Operations Research (Erasmus University Rotterdam & Tilburg University).
    
- 🇦🇲🇳🇱🇨🇦 **Vahe Aslanyan – CTO & Co-Founder**
    
    9+ yrs ML systems & infra.
    
    Manages the tech team and technical roadmap, from architecture to deployment.
    
    BSc Computer Science (University of British Columbia), executive education at Harvard Business School.
    

---

**Product & UX**

- 🇪🇸🇲🇽 **Bernardo Torres Santillana – Product & UX/UI Designer**
    
    Product & UX/UI Designer (complex digital & health products, UX flows, design systems).
    
    ![PHOTO-2025-12-04-19-36-46.jpg](attachment:9da92afe-8a4b-4495-b22b-5eddb3e8a278:PHOTO-2025-12-04-19-36-46.jpg)
    

---

**Engineering & Data**

- 🇦🇲 **Seryozha Hovsepyan – AI Engineer**
    
    AI Engineer (DL, NLP, CV, LLMs, embedded/edge deployment).
    
    ![7ac6fd75-24b5-43f5-b3d3-b4786a1b6585.JPG](attachment:5759e6b0-f37e-4999-b5a7-77b678c4c18f:7ac6fd75-24b5-43f5-b3d3-b4786a1b6585.jpg)
    
- 🇦🇲 **Vahagn Tovmasyan – AI Engineer**
    
    AI Engineer (model training, evaluation, experimentation).
    
    ![1679662978827.jpeg](attachment:94938a0a-56b8-4b9a-85ae-460018e319a2:1679662978827.jpeg)
    
- 🇺🇸🇮🇳 **Latha Shree K. P. – Full-Stack Engineer**
    
    Full-Stack Engineer (APIs, dashboards, SDG tooling – Angular, TypeScript, NodeJS, MongoDB).
    
- 🇨🇦 **Farnia GhanizadehSeraj – AI Engineer / Data Scientist**
    
    AI Engineer / Data Scientist (ML & DS workflows, data prep, metrics, dashboards).
    

**Footer for Block A (small text):**

> UNICEF funds this lean core team that builds and maintains the open-source synthetic data engine and dataset.
> 

---

## Block B – Clinical & Scientific Expert Council

*(advisory / MoUs – not full-time payroll)*

**Paediatrics & infectious disease (UNICEF-relevant)**

- 🇦🇲🇳🇱 **Dr Susanna Khachaturyan – Pediatrician & Infectious Disease Specialist**
    
    15+ yrs paediatrics & infections; paediatric oncology exposure.
    

---

**Oncology, surgery & women’s health**

- 🇺🇦🇨🇦 **Dr Oksana Korolova, MD PhD – Oncologist & Clinical Research Lead**
    
    20+ yrs clinical, research & leadership in oncology / neurology / immunology; clinical trials & regulatory-driven studies.
    
    ![1754117825604.jpeg](attachment:0dff2990-f552-4414-96f0-fcb7125ea529:1754117825604.jpeg)
    
- 🇺🇦 **Dr Nadiia Voronkova, MD – Gynecologist & Onco-Gynecology Specialist**
    
    20+ yrs gyn/onc; focus on ovarian & other gynecological cancers.
    
    ![869380d8-272c-4f47-8bcb-ecf8dab32b99.JPG](attachment:feb5a46f-dde2-43c8-b125-8b8e5da05f8f:869380d8-272c-4f47-8bcb-ecf8dab32b99.jpg)
    
- 🇺🇦 **Dr Anton Hlebov, MD PhD – CEO & Onco-Urologist, D-Clinic**
    
    15+ yrs urology & onco-urology; PCA3 early-diagnostics pioneer.
    
    ![1aca6f5a-041d-47e1-bf00-79391a27ce88.JPG](attachment:e364dcf4-2a7f-4679-8cbd-64988c78469e:1aca6f5a-041d-47e1-bf00-79391a27ce88.jpg)
    

### Oncology & Bioinformatics *(goes inside Block B)*

- 🇺🇸 **Dr Christopher Morris-Radston – Oncology, Omics & AI Expert**
    
    Oncology, omics & AI; PhD in oncology-related data science and published author working with complex cancer datasets.
    
- 🇵🇹 **Dr Tiago Moreira – Bioinformatics & Oncology AI Specialist**
    
    Bioinformatics and oncology-focused AI; multimodal data fusion across clinical, molecular and imaging data.
    
    ![1589212530772.jpeg](attachment:c4cc973f-ba69-4cc2-bae7-0c61f81d2f5d:1589212530772.jpeg)
    

---

**Radiology & imaging**

- 🇦🇲 **Dr Kostan Galumyan, MD PhD – Head Radiologist of Armenia**
    
    20+ yrs diagnostic & oncologic imaging; national radiology leadership.
    
    ![Screenshot 2025-12-04 at 7.36.18 PM.png](attachment:11a41521-f88e-494e-8d29-00fa18c2c741:Screenshot_2025-12-04_at_7.36.18_PM.png)
    

---

**Clinical trials & AI/ML regulation**

- 🇨🇦🇺🇸 **Dr Alaknanda Dhotre, MD MBA – Clinical Trials & Regulatory Expert**
    
    10+ yrs oncology trials & regulatory strategy; AI/ML medical-device and digital-health products.
    
    ![1758471159941.jpeg](attachment:d702ec9c-81a0-4d67-b257-ecc1c74e8ecf:1758471159941.jpeg)
    

**Footer for Block B:**

> Senior clinicians for oncology, paediatrics, imaging & trials, engaged via MoUs / consulting, not as FTEs.
> 

## Block C – Business, Governance & Institutional Partners

*(MoUs / advisory – give reach & credibility, not full-time)*

![1697576304269.jpeg](attachment:56229266-1f89-4cc5-a283-1f255fe15ece:1697576304269.jpeg)

---

**Data governance, AI Act & infra (Insight Arcs)**

![insightarcs_logo.jpeg](attachment:70e36f0d-31d0-4d93-95ca-179949e5ba97:insightarcs_logo.jpeg)

- 🇩🇪 **Andreas Behrens – Co-Founder & Managing Director, Insight Arcs GmbH**
    
    15+ yrs digital-health & data programmes; data governance & AI policy.
    
    ![1681805584674.jpeg](attachment:1008f9cf-1dd7-408c-a799-b324777e584b:1681805584674.jpeg)
    
- 🇩🇪 **Danielle Jeffery – Senior Consultant & Data Scientist, Insight Arcs GmbH**
    
    7+ yrs analytics & ML projects; KPI & governance.
    
    ![1583250502006.jpeg](attachment:b2deca83-0193-4121-9265-1d35b6fe4a8b:1583250502006.jpeg)
    
- 🇵🇹🇩🇪 **Júlio Reis – Tech Lead & Data/Software Engineer, Insight Arcs GmbH**
    
    10+ yrs data infra, ETL & BI; healthcare data integration.
    

---

**Institutional partners**

- 🇪🇸 **IESE Business School – CRHIM (Spain)**
    
    Health-innovation & management; business models, impact & scale-up.
    
- 🇺🇦 **D-Clinic (Kyiv, Ukraine)**
    
    Onco-urology / onco-gyn clinic; clinical validation site & patient pathways.
    
    ![383ebd56-e6d3-4e7a-b5e3-7ba9e90ea579.JPG](attachment:9fbf34a1-38b2-45ec-8051-77b2d9c235e9:383ebd56-e6d3-4e7a-b5e3-7ba9e90ea579.jpg)
    
- 🇨🇦🇺🇸 **ANDglobal Solutions (Canada/US)**
    
    Oncology, clinical & RWE, AI med-device, regulatory & market access expertise.
    
- 🇺🇸 **University of Texas (US, MoU in progress)**
    
    Academic partner for oncology & AI in health; research & validation network extension.
    

**Footer for Block C:**

> These partners support SeleneX via MoUs and advisory agreements, providing access, validation and regulatory depth without adding full-time cost to the UNICEF grant.
> 

**Script**

We are a lean, female-led deep-tech startup with a large, international team that works naturally with universities, hospitals, clinics and tech partners across Europe and North America.

In the first section, you see our **core SeleneX team** for this grant: a compact, fast group with more than nine years of AI and ML experience at founder level, educated at Erasmus University, Tilburg University and the University of British Columbia in Canada. Around that, we have engineers and designers who have worked across Canada, the Netherlands, Spain, India, Turkey and Portugal. This is the team that will actually build, ship and maintain the open-source synthetic data engine and dataset that sit at the core of the wider SeleneX platform.

In the second section, you see that we are **not a small team in expertise**. As part of SeleneX we have MoUs with **over 15 PhDs**, including **professors**, and many doctors with **15–20+ years** in oncology, radiology, paediatrics and infectious diseases, coming from Armenia, Ukraine, Germany, Portugal, Canada and the US. They give us deep medical and scientific strength without creating heavy fixed costs on this grant.

In the third section, you see our **institutional partners**: a Ukrainian cancer clinic, German experts in data protection and the AI Act, Canadian and US partners in oncology, regulation and business, one of the most recognised Spanish business schools in health innovation and digital health, and an MoU in preparation with the University of Texas.

We also already have a visible LunarTech and SeleneX brand and community, which helps us share the open-source engine widely, attract more users, partners and funding, and make UNICEF’s investment visible and impactful far beyond this project.”

**Version 2:**

**“To close, I want to show you the team and partnerships behind SeleneX — because in healthcare AI, the people matter as much as the technology.**

**Our core SeleneX Synthetic Data Generation Engine team is lean, senior, and fully hands-on.**

I lead the project — Tatev Aslanyan — with 9+ years in AI across Europe and North America, responsible for architecture and strategy.

My co-founder Vahe is our CTO, a systems and ML engineer from UBC with experience building complex AI products end-to-end.

We’re supported by a strong engineering group — AI engineers in Armenia, a full-stack engineer in the US, a data scientist in Canada — and a dedicated product & UX designer in Spain.

This is the team that has already built the working SDG engine you saw today.

**But what makes SeleneX truly powerful is our clinical and scientific expert council.**

We work with oncologists, gynecologic surgeons, radiologists, pediatric specialists, bioinformaticians, omics experts, and regulatory advisors — including the Head Radiologist of Armenia, senior oncologists from Ukraine and Canada, and specialists in clinical trials and AI regulation in the US.

Their involvement ensures every component we build aligns with real clinical workflows, medical safety, and future regulatory approval.

**Finally, SeleneX stands on a global network of institutional partners.**

We have MoUs and collaborations with IESE Business School in Spain, D-Clinic in Ukraine, ANDglobal Solutions in Canada/US, Insight Arcs in Germany, and we’re formalizing collaboration with the University of Texas for oncology and AI research.

These partners provide validation sites, governance expertise, and pathways for scaling responsible medical AI.

**Together, this team gives SeleneX the scientific depth, engineering strength, and global reach to deliver a trustworthy, open-source synthetic data engine — and to make early ovarian cancer detection accessible far beyond high-resource settings.”**

## SLIDE 9: Business Model

### **Open-Core Strategy**

- SDGE core (engine, schemas, baseline models) released as **open-source**
- Ensures transparency, trust, and global reuse (UNICEF, hospitals, researchers)

---

### **Revenue Streams**

1. **Hosted SDGE & Support**
    - Managed deployments for hospitals / NGOs
    - SLAs, monitoring, updates, security
2. **Customisation & Integrations**
    - Country- / hospital-specific schemas & bias audits
    - EHR / PACS / federated-learning integrations
3. **Advanced Modules & Training**
    - Imaging & omics diffusion, multimodal simulators
    - Training & certification for local technical teams
4. **SeleneX full platform including SDGE** = commercial clinical product

---

### **Equity Principle**

- High-resource clients help **subsidise low-resource settings**
- UNICEF deployments can remain low-cost / free
- Sustainable path beyond the grant

**SCRIPT**

To close, here is how SeleneX and the SDGE stay sustainable.

We follow an open-core model: the SDGE engine, schemas and baseline models remain open-source so UNICEF, hospitals and researchers can use them freely.

Above that, we generate revenue in three ways:

(1)

**Hosted SDGE deployments**

with support, security and updates.

(2)

**Customisation and integrations**

for specific countries, hospitals and health systems.

(3)

**Advanced modules and training**

, including imaging diffusion, omics generators and national capacity-building.

And importantly,

**SeleneX as a full clinical platform will also be commercialised**

— offering early-detection, treatment-personalisation and follow-up modules to hospitals and payers.

High-resource clients help subsidise low-resource deployments, keeping UNICEF implementations low-cost or free while funding continued development.