<p align="center">
  <a href="./README.md">⬅️ Back to Main Profile</a> | <a href="./PROJECTS.ko.md">🇰🇷 Read in Korean</a>
</p>

# 🛠️ Selected Project Details & Engineering Notes

This document contains the engineering context, troubleshooting processes, and architectural decisions for my selected corporate and personal projects. My focus is always on **practical problem-solving, resource optimization, and avoiding over-engineering.**

---

## 💼 Corporate Projects

### 🧠 Production-Ready NLP Categorization Microservice
*A live AI microservice module matching natural language user inputs with internal DB categories.*

* **Semantic Search Pipeline:** Implemented an embedding and reranking pipeline utilizing the `BGE-m3` model to maximize the accuracy of natural language matching against static categorical data.
* **Frictionless Integration:** To ensure zero friction with the core backend team, the module was containerized using **Docker** and delivered with comprehensive **Swagger API documentation**. This allowed the core team to plug and play the service into the live commercial environment without backend restructuring.

### 🖼️ Large-Scale Asset Generation & Review Pipeline
*A mass-generation and review pipeline for 22,000+ service image assets, optimized for a one-off project under strict hardware limits.*

* **Resource-Aware Architecture (Sync Pipeline):** Operated within a highly constrained local environment (WSL). Intentionally excluded heavy DBs or Message Queues (MQ) to avoid over-engineering for a one-off task. I utilized the physical hardware I/O limits to naturally act as an API rate limiter, maintaining a stable synchronous generation flow.
* **CSR Load Optimization:** The initial review dashboard faced a massive bottleneck, taking over 5 minutes to render 22,000+ metadata entries on the client side (CSR). I solved this by implementing **Lazy Loading** and **Browser Caching**, achieving near-instant dashboard load times.
* **Model Scaling:** Conducted prompt engineering and PoC using local **Flux** models. For actual mass production, seamlessly migrated the pipeline to the **Gemini API (Flash Image / Nano Banana 2)** to ensure stability and speed.

### ⚙️ Zero-Overhead Internal Automation Pipeline
*An internal-only automation hub collecting scattered static data and dispatching notifications.*

* **Zero Core-Dev Intervention:** Overcame corporate security constraints that blocked external Cloud DB access. Instead of requesting new APIs from the core team, I reverse-engineered and crawled the internal CMS, reusing legacy APIs (such as email/SMS dispatch modules) to build the automation pipeline with zero additional backend resources.
* **Secure Closed-Network Execution:** Maintained strict security compliance by executing scripts exclusively within the closed internal network (no external port-forwarding), fully inheriting the existing modules' security authentications.

### 🔧 Lightweight Internal Network Utility
*A simple, effective script to resolve corporate VPN bottlenecks.*

* **Impact:** Corporate security policies restricted multiple simultaneous VPN connections, causing workflow bottlenecks. I developed and deployed a lightweight Python-based port-connection script that enabled team members to maintain multiple secure connections efficiently, drastically improving team productivity with minimal setup.

---

## 🔥 Personal & R&D Projects

🎯 Automated Brand Logo Extraction Pipeline (Test Lab)

A zero-shot segmentation pipeline and R&D dashboard designed to automatically extract high-quality brand logos from complex physical signboard images.

Automated Hybrid Anchoring: Overcame the brittleness of blind SAM prompting. Combined Grounding DINO for ROI bounding with an OCR/Contour hybrid method to automatically generate precise, dense foreground anchor points, significantly reducing background hallucinations.

Vision Post-Processing Engine: Separated extraction logic from quality refinement. Built a custom pixel-level tuning pipeline implementing Morphological Dehalo, LAB-space Color Decontamination, and distance-transform Edge Feathering to turn raw masks into commercial-grade assets.

Decoupled R&D Dashboard (FastAPI): Engineered a lazy-loaded web interface that isolates each pipeline stage (Anchor, Detect, Segment, Quality) for independent debugging. Enables real-time parameter tuning and objective evaluation via Laplacian Sharpness and MAD Noise metrics.

### 🧠 Agent Memory System
*MCP-based long-term memory architecture for AI assistants. [🔗 GitHub Repo](https://github.com/entangelk/agent-memory-system-public)*

* **Separation of Concerns:** Memory is compacted meaning, not just a log. To enforce this, I strictly separated the system's architecture into two layers: **MongoDB** as the immutable State of Truth (SoT) and **ChromaDB** as the dynamic Vector Cache for semantic context retrieval.

### 🗺️ Limits of Geometry-Guided Pathfinding (Circle-WFC)
*Pathfinding R&D and post-mortem aimed at replacing traditional A* search with geometry-guided WFC. [🔗 GitHub Repo](https://github.com/entangelk/circle-wfc)*

* **Hypothesis & Early Wins:** Attempted to apply the Wave Function Collapse (WFC) algorithm to geometric layers (circles/rays) rather than tile grids. In early tests on simple or empty maps, it significantly outperformed A* in both speed and memory efficiency.
* **Root Cause Analysis:** Performance degraded sharply in complex mazes. Through rigorous debugging, I identified a fundamental structural contradiction: WFC is an engine for **'local consistency'**, whereas pathfinding requires **'global connectivity'**. WFC's tendency for "early commitment" (state collapse) proved fatal when long, topologically complex detours were required.
* **Conclusion:** Concluded that Circle-WFC is unsuitable as a standalone, general-purpose shortest-path solver. However, I successfully redefined its engineering value as a **'Search Space Reducer'** or 'Candidate Corridor Generator'—a highly efficient preprocessing module that drastically narrows the search area before a global solver (like A*) takes over.

### 👁️ Gradient-free Neural Network Prototype (T-WFC)
*Designing a neural network training prototype without backpropagation and analyzing its scaling limits. [🔗 GitHub Repo](https://github.com/entangelk/T-WFC)*

* **Discrete State Collapse (PoC):** Successfully trained a toy MLP without utilizing autograd, backpropagation, or continuous optimizers. The model was trained purely through the WFC observe-collapse-propagate loop, restricting weights to only 5 discrete values (`{-1, -0.5, 0, 0.5, 1}`). It successfully matched the SGD baseline (100% accuracy) on linearly separable datasets.
* **Scaling Limits Analysis:** When tested on moderate-to-strong non-linear problems (XOR, Spiral), performance dropped significantly. I proved that the combinatorial search capacity of 5 discrete values is fundamentally insufficient to form complex, non-linear decision boundaries. Furthermore, as parameter count increased, memory and time overhead scaled exponentially, proving it impractical for deep learning scale-up.
* **Conclusion:** While not viable as a replacement for SGD in large models, this research validated the WFC-to-weight mapping concept. It leaves the door open for niche applications, such as alternative low-bit quantization for extreme edge devices or spatially local architectures (e.g., CNNs) where WFC's propagation model fits more naturally.

### ⚡ AI Compiler Auto-Scheduler (HW-WFC v2.0)
*Constraint-driven auto-scheduling R&D for hardware optimization. [🔗 GitHub Repo](https://github.com/entangelk/hw-wfc)*

* **Constraint-driven Auto-Scheduling:** Introduced a constraint-driven search algorithm to the AI compiler scheduler to overcome the limits of brute-force methods. This drastically reduced the search space by 98.5% and achieved a **~2400x speedup** compared to conventional Grid Search.

---
<p align="center">
  <a href="./README.md">⬅️ Back to Main Profile</a>
</p>
