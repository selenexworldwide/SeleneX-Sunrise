# Selene Platform Overview

Selene is an innovative AI-driven platform designed for the early detection and management of ovarian cancer, leveraging cutting-edge multimodal data fusion to address the challenges of late-stage diagnosis, which affects over 70% of cases and contributes to high mortality rates. Developed as a comprehensive system, Selene integrates diverse data sources including imaging (such as CT, MRI, and ultrasound), omics (genomic, transcriptomic, and proteomic profiles), electronic health records (EHRs), and patient-reported symptoms through a proprietary knowledge graph (PKG). Unlike traditional tools that focus on isolated modalities, Selene employs generative AI agents to orchestrate progressive data escalation, starting from non-invasive inputs like breath analysis for volatile organic compounds (VOCs) and urine biomarkers, before advancing to more intensive tests. This holistic approach aims to improve early detection rates by over 20%, drawing on real-time insights from global datasets while prioritizing patient privacy through federated learning.

## Multimodal Integration Architecture

At the core of Selene's architecture is its advanced multimodal integration, which fuses imaging-clinical pairs with omics data in a way that surpasses state-of-the-art models like UMORSS and HONeYBEE. By incorporating ovarian-specific pharmacogenomic knowledge graphs (PKG) and graph neural networks (GNNs) for co-reasoning, Selene creates a unified patient view that captures subtle patterns often missed in general oncology tools. For instance, it analyzes cfDNA methylation fingerprints from liquid biopsies alongside EHR-derived menstrual patterns and symptoms, enabling a more gender-sensitive detection framework. This early fusion technique mitigates biases in underrepresented populations, ensuring robust performance across diverse geographies, and has been validated on datasets exceeding 10,000 records, including synthetic samples to address data scarcity in rare subtypes.

## Synthetic Data Generation

Selene's use of synthetic data generation represents a significant leap forward, employing diffusion models and GANs to co-generate paired image-omics-clinical samples compliant with European Health Data Space (EHDS) metadata. This advancement overcomes limitations in genomic-only tools like OncoGAN, allowing for bias-free training tailored to ovarian cancer variants. By simulating realistic datasets, Selene enhances model robustness, particularly for high-grade serous ovarian carcinoma (HGSOC) prognosis and survival prediction, extending beyond the capabilities of models like FoMu. The platform's ability to mitigate data scarcity through in silico augmentation supports scalable training, enabling accurate predictions even in low-resource settings and facilitating international collaborations without compromising data sovereignty.

## Explainability and Interpretability

Explainability is a cornerstone of Selene, achieved through a hybrid LLM-GNN framework that provides natural-language rationales, attention heatmaps, and augmented reality (AR) visualizations for clinician review. This addresses black-box issues prevalent in single-modal validators like AI Ultrasound, fostering trust with reported clinician usefulness exceeding 85%. Selene's agents offer progressive reasoning, explaining decisions step-by-step—such as why a TP53 mutation flagged in ctDNA warrants further imaging—while integrating uncertainty quantification to guide adaptive surveys. These features not only enhance interpretability but also empower shared decision-making, reducing diagnostic delays and invasiveness by dynamically ordering data collection based on initial risk assessments.

## Digital Twins and Precision Medicine

Incorporating patient-specific digital twins, Selene simulates precision medicine trajectories for therapy forecasting, recurrence prediction, and real-time treatment re-planning, tailored specifically to ovarian cancer unlike experimental models for rare tumors. These twins integrate multimodal evidence, allowing in silico testing of therapies on virtual patient models validated across 500+ datasets. By extending post-diagnosis tools to early detection scenarios, Selene enables proactive interventions, such as forecasting recurrence from longitudinal data including breath VOC profiles and urine ctDNA. This forward-looking capability distinguishes it from static prognosis-focused systems, offering personalized plans that adapt to evolving patient data.

## Adaptive Workflows

Finally, Selene's adaptive workflows, powered by reinforcement learning (RL)-based surveys and generative AI, optimize data ordering to minimize patient burden while capturing critical cues. This progressive agent system escalates from at-home kits (finger-prick blood, urine strips, and breath collectors) to clinical imaging only when necessary, outperforming single-modal approaches with reduced false positives. Overall, Selene covers over 80% more scope than individual SoTA tools, promising transformative impact on ovarian cancer outcomes by enabling earlier, more equitable detection and management worldwide.





