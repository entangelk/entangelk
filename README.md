<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Hi, I'm entangelk

> **Constraint-Driven AI & Automation Engineer**  
> I started from planning, operations, and data-driven problem solving in real production environments.  
> Over time, I moved closer to engineering by building the tools and systems I needed myself.  
> Today, I focus on practical AI systems, automation workflows, and data pipelines that solve real-world problems under constraints such as latency, cost, memory limits, and imperfect integration environments.

*"Memory is not a log. Memory is compacted meaning."*

## Background → Current Focus

**Background**  
Planning, operations, business planning, and data analysis across real production environments.

**Current Focus**  
Building practical AI systems, automation workflows, and data pipelines that directly reduce operational friction and turn ambiguous problems into working systems.

## Why Engineering

I work best when I can take a vague operational or business problem and turn it into a working solution myself.  
Rather than staying only at the coordination or planning layer, I prefer to directly build tools, automate workflows, and validate systems in practice.

My engineering approach is shaped by:
- product and operations awareness from real business environments
- data-driven thinking from analytics work
- hands-on problem solving through automation, backend integration, and AI-assisted engineering

## Core Philosophy

- **Production First:** I treat AI systems as operational systems, not isolated model demos.
- **Embrace Constraints:** I optimize for cost, stability, and integration friction, not just raw accuracy.
- **Build What Works:** I prefer practical solutions that reduce real bottlenecks over impressive but fragile architectures.
- **Learn from Limits:** I turn failures, trade-offs, and dead ends into structured post-mortems and better system design.

## Selected Practical Work

- Built internal automation workflows by reusing legacy CMS/API surfaces instead of requesting new platform work.
- Developed NLP categorization microservices packaged with Docker and Swagger for low-friction integration.
- Improved large-scale review workflows by addressing CSR bottlenecks with lazy loading and browser caching.
- Worked across planning, operations, analytics, and implementation layers to close the gap between business needs and working systems.

## Projects

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)**  
  MCP-based long-term memory architecture separating MongoDB as the State of Truth from a vector cache for retrieval.  
  `Focus:` Consistency, retrieval efficiency, and memory compaction.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)**  
  Zero-shot logo extraction pipeline combining Grounding DINO, SAM, OCR anchoring, and custom pixel-level post-processing.  
  `Focus:` Robustness without supervised training.

## Experiments

- ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc)**  
  Constraint-driven AI compiler scheduling R&D.  
  `Result:` Matched Exact DP's optimum and revealed hardware-backed cost-model calibration as the real production bottleneck.

## Failed Experiments & Post-Mortems

- 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr)**  
  Quantized perturbation sensitivity analysis for GGUF LLMs.  
  `Result:` Failed to predict pruning importance and was ~1300x slower than baseline.  
  `Insight:` Discrete perturbation is not the same as meaningful importance.

- 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc)**
  Geometry-guided WFC with a layered constraint architecture (MLMC). 
  `Result:` Too expensive to replace A*, but successfully guaranteed valid path generation.
  `Insight:` Layered constraints can enforce global correctness (e.g., path validity) in local tile-based systems.

- 🧠 **[T-WFC](https://github.com/entangelk/T-WFC)**  
  Reframing model training as a discrete state collapse process instead of gradient descent.  
  `Result:` Inefficient for high-dimensional data, but effective as a search-space reduction and pattern synthesis tool.
  `Insight:` Constraint-based approaches can form decision boundaries without gradients in structured environments.
  
## Currently Building & Exploring

- **🎓 ADIGA College Admission Data Pipeline**  
  Extracting and normalizing complex HTML data across 200+ institutions.  
  `Result so far:` Reduced schema violation rates under noisy HTML inputs using hallucination-controlled LLM workflows.

- **🛡️ Multi-Agent DevSecOps Web Vulnerability Scanner**  
  CI/CD-integrated security platform utilizing Playwright-based agents and token optimization.

## Engineering Notes

For longer write-ups on troubleshooting, architectural decisions, trade-offs, and project context:  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## Contact

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)