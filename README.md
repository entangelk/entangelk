<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Hi, I'm entangelk 

> **Constraint-Driven AI Systems Engineer**
> I build AI systems that operate under real-world constraints — latency, cost, memory limits, and imperfect integration environments. 
> This profile is mostly a record of projects I built, experiments I validated, and failures that were useful enough to turn into clear post-mortems.

*"Memory is not a log. Memory is compacted meaning."*

## 🧠 Core Philosophy
* **Production First:** Treat AI systems as operational systems, not isolated model demos.
* **Embrace Constraints:** Optimize for cost, stability, and integration friction, not just raw accuracy.
* **Learn from Limits:** Convert failures into structured feedback and system evolution.

## ⚙️ Projects
* 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public):** MCP-based long-term memory architecture separating MongoDB as the State of Truth from a vector cache for retrieval.
  * `Focus:` Consistency, retrieval efficiency, and memory compaction.
* 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image):** Zero-shot logo extraction pipeline combining Grounding DINO, SAM, OCR anchoring, and custom pixel-level post-processing.
  * `Focus:` Robustness without supervised training.

## 🧪 Experiments
* ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc):** Constraint-driven AI compiler scheduling R&D. 
  * `Result:` Matched Exact DP's optimum and exposed hardware-backed cost-model calibration as the real production bottleneck.

## ❌ Failed Experiments & Post-Mortems
* 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr):** Quantized perturbation sensitivity analysis for GGUF LLMs. 
  * `Result:` Failed to predict pruning importance, ~1300x slower than baseline. *Insight: Discrete perturbation ≠ meaningful importance signal.*
* 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc) & [T-WFC](https://github.com/entangelk/T-WFC):** Geometry-guided WFC and discrete state collapse experiments. 
  * `Result:` Failed as general solvers, but proven useful as search-space reducers before global search.

### 🌱 [Currently Building & Exploring]
* **🎓 ADIGA College Admission Data Pipeline:** Extracting and normalizing complex HTML data across 200+ institutions.
  * `Result so far:` Reduced schema violation rate by ~35% under noisy HTML inputs using hallucination-controlled LLM workflows.
* **🛡️ Multi-Agent DevSecOps Web Vulnerability Scanner:** CI/CD-integrated security platform utilizing Playwright-based agents and token optimization.

## 🧩 Selected Practical Work
* NLP categorization microservice (`BGE-m3`), packaged with Docker and Swagger for low-friction integration.
* 22,000+ asset generation pipeline optimized for WSL limits and client-side rendering bottlenecks.
* Internal automation workflows built by reusing legacy CMS/API surfaces instead of requesting new platform work.

## 📖 Engineering Notes
For longer write-ups on troubleshooting, architecture decisions, and project context:
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## 📫 Contact
**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com) | **LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)