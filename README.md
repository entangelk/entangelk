<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Hi, I'm entangelk

> **Technical AI Product Manager & Service Architect** > I don't just write product requirements; I build prototypes to prove them.  
> My career started in operations, business planning, and data analysis. Frustrated by the gap between ambiguous business needs and technical realities, I started building AI architectures and automation workflows myself.  
> Today, I design AI services, build Proof-of-Concepts (PoCs) to test feasibility, validate them with data, and make technical "Go/Drop" decisions based on real-world constraints.

*"Memory is not a log. Memory is compacted meaning."*

## Why I Build (Learning by Building)

I am not a core AI researcher who optimizes low-level memory or derives mathematical formulas from scratch. My weapon is **execution and architectural thinking.** When faced with a business bottleneck, I combine existing models, APIs, and algorithms to test if an idea actually works in a constrained business environment. I build to find structural limits, and I use data to objectively decide whether to pivot, scale, or kill a project.

## Core Philosophy

- **Production First:** I treat AI systems as operational systems, not isolated model demos.
- **Embrace Constraints:** I optimize for cost, stability, and integration friction, not just raw accuracy.
- **Data-Driven Decisions:** If a system doesn't prove its worth through metrics (e.g., speed, pass rate), I objectively document the failure and kill it.
- **Learn from Limits:** I turn failures, trade-offs, and dead ends into structured post-mortems and better system designs.

## 🏗️ Highlighted Architecture & PoC

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)** MCP-based long-term memory architecture.  
  `Architecture:` Strictly separated the State of Truth (MongoDB) from the semantic retrieval layer (ChromaDB) to ensure consistency and memory compaction.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)** Zero-shot logo extraction pipeline combining Grounding DINO, SAM, and custom post-processing.  
  `Focus:` Building a robust pipeline that operates without supervised training data.

## 📊 R&D, Failed Experiments & Post-Mortems
*I value the lessons learned from failed experiments as much as successful deployments. Below are R&D projects where I tested architectural hypotheses and made data-driven decisions.*

- 🧪 **[Q-PSA (Project Killed)](https://github.com/entangelk/Q-PSA_Pr)** Tested discrete perturbation for quantized LLMs to estimate layer importance.  
  `Decision:` Objectively killed the project after my data showed it was ~1300x slower than the baseline and failed pruning validations.

- 🗺️ **[Circle-WFC (Architectural Pivot)](https://github.com/entangelk/circle-wfc)**
  Attempted to replace `A*` pathfinding with a geometry-guided Wave Function Collapse (WFC). 
  `Insight:` Discovered the structural limits of 'local consistency' in global pathfinding. Pivoted the concept's value into a highly efficient 'Search Space Reducer'.

- ⚡ **[HW-WFC v2.9 (Feasibility Validated)](https://github.com/entangelk/hw-wfc)** Constraint-driven AI compiler scheduling R&D.  
  `Result:` Matched Exact DP's optimum, proving algorithmic feasibility, but strategically concluded the research after identifying hardware-backed cost-model calibration as the real production bottleneck.
  
## Currently Building & Exploring

- **🎓 ADIGA College Admission Data Pipeline** Extracting and normalizing complex HTML data across 200+ institutions.  
  `Result so far:` Reduced schema violation rates under noisy HTML inputs using hallucination-controlled LLM workflows.

## Engineering Notes

For longer write-ups on troubleshooting, architectural decisions, trade-offs, and project context:  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## Contact

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)