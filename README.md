<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Hi, I'm entangelk

I build data and AI systems that have to survive real constraints: time, cost, memory, and messy integration boundaries.

This profile is mostly a record of three things: projects I built, experiments I validated, and failures that were useful enough to turn into clear post-mortems.

> "Memory is not a log. Memory is compacted meaning."

## What You'll Find Here

* Production-minded data and AI engineering
* MCP, vision, and automation projects that can stand as repositories on their own
* R&D notes on memory, search, and constraint-driven systems
* Failures, limits, and negative results documented as engineering post-mortems

## Projects

* 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public):** MCP-based long-term memory architecture separating MongoDB as the State of Truth from a vector cache for retrieval.
* 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image):** Zero-shot logo extraction pipeline combining Grounding DINO, SAM, OCR anchoring, and custom pixel-level post-processing.

## Experiments

* ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc):** Constraint-driven AI compiler scheduling R&D. `Result:` matched Exact DP's optimum and exposed hardware-backed cost-model calibration as the real production bottleneck.

## Failed Experiments & Post-Mortems

* 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr):** Quantized perturbation sensitivity analysis for GGUF LLMs, testing whether discrete weight perturbations could rank layer importance without gradients. `Result:` failed; sensitivity did not predict pruning importance, and the method was about 1,300x slower than simple layer ablation.
* 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc):** Geometry-guided WFC pathfinding experiment. `Result:` failed as a general shortest-path solver; useful as a search-space reducer before global search.
* 👁️ **[T-WFC](https://github.com/entangelk/T-WFC):** Gradient-free neural network experiment based on discrete state collapse. `Result:` PoC worked on linear tasks, but scale-up failed on nonlinear problems.

## Selected Professional Work

* NLP categorization microservice using `BGE-m3`, packaged with Docker and Swagger for low-friction integration
* 22,000+ asset generation and review pipeline optimized for WSL limits and client-side rendering bottlenecks
* Internal automation workflows built by reusing legacy CMS/API surfaces instead of requesting new platform work
* Lightweight Python utility that eased a single-connection VPN bottleneck for the team

## Engineering Notes

For the longer write-ups on troubleshooting, architecture decisions, and project context:

👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## Contact

📫 **Contact:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com) | [LinkedIn](https://www.linkedin.com/in/%EC%9A%94%ED%95%9C-%EB%B0%95-b4a06a3b3/)
