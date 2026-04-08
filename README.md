<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Hi, I'm entangelk

> **AI Product Builder**  
> I build AI prototypes, automation workflows, and service concepts to test whether ideas actually work in real business environments.  
> My background is in operations, business planning, and data analysis. While working across those roles, I became increasingly drawn to the gap between ambiguous business needs and technical reality, and started building systems myself to close it.  
> Today, I focus on turning vague requirements into testable PoCs, structured experiments, and clear Go / Drop decisions grounded in real-world constraints.

*"Memory is not a log. Memory is compacted meaning."*

## Why I Build (Learning by Building)

I am not a core AI researcher working on low-level optimization or deriving algorithms from first principles. My strength is **execution, structured experimentation, and product-minded technical thinking.**  
When I encounter a business bottleneck, I combine existing models, APIs, and algorithms to test whether an idea is actually feasible under real constraints. I build to uncover structural limits, and I use evidence to decide whether to iterate, pivot, scale, or stop.

## Core Philosophy

- **Build to Validate:** I use prototypes and workflows to test whether an idea can survive real business constraints.
- **Production-Aware Thinking:** I treat AI systems as services that must work with cost, stability, and operational friction in mind.
- **Data-Driven Decisions:** If a system does not prove its value through measurable results, I document the failure and move on.
- **Learn from Limits:** Failed experiments, trade-offs, and dead ends are often the most useful inputs for better system design.

## What I Work With

- AI Proof-of-Concepts (PoCs)
- Automation Workflows
- LLM Application Prototyping
- Data Pipelines
- Technical Feasibility Validation
- Product-Oriented Experiment Design

## 🏗️ Highlighted Architecture & PoC

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)**  
  MCP-based long-term memory architecture.  
  `Architecture:` Separated the State of Truth (MongoDB) from the semantic retrieval layer (ChromaDB) to improve consistency and memory compaction.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)**  
  Zero-shot logo extraction pipeline combining Grounding DINO, SAM, and custom post-processing.  
  `Focus:` Built a robust pipeline that operates without supervised training data.

## 📊 R&D, Failed Experiments & Post-Mortems

*I value the lessons learned from failed experiments as much as successful deployments. Below are projects where I tested architectural ideas, examined feasibility, and made data-driven decisions.*

- 🧪 **[Q-PSA (Project Killed)](https://github.com/entangelk/Q-PSA_Pr)**  
  Tested discrete perturbation for quantized LLMs to estimate layer importance.  
  `Decision:` Killed the project after experiments showed it was ~1300x slower than the baseline and failed pruning validation.

- 🗺️ **[Circle-WFC (Architectural Pivot)](https://github.com/entangelk/circle-wfc)**  
  Attempted to replace `A*` pathfinding with a geometry-guided Wave Function Collapse (WFC).  
  `Insight:` Found the structural limit of local consistency in global pathfinding, then reframed the value of the concept into an efficient search space reducer.

- ⚡ **[HW-WFC v2.9 (Feasibility Validated)](https://github.com/entangelk/hw-wfc)**  
  Constraint-driven AI compiler scheduling R&D.  
  `Result:` Matched Exact DP's optimum, validating algorithmic feasibility, but concluded the research after identifying hardware-backed cost-model calibration as the real production bottleneck.

## Currently Building & Exploring

- **🎓 ADIGA College Admission Data Pipeline**  
  Extracting and normalizing complex HTML data across 200+ institutions.  
  `Result so far:` Reduced schema violation rates under noisy HTML inputs using hallucination-controlled LLM workflows.

## Notes

For longer write-ups on troubleshooting, architectural decisions, trade-offs, and project context:  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## Contact

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)