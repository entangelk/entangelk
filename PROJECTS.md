<p align="center">
  <a href="./README.md">⬅️ Back to Main Profile</a> | <a href="./PROJECTS.ko.md">🇰🇷 Read in Korean</a>
</p>

# 🛠️ Selected Project Details & Engineering Notes

This document collects the engineering context, troubleshooting processes, architectural decisions, and post-mortems behind my selected corporate and personal projects.

My background spans planning, operations, business planning, and data-driven problem solving in real production environments.  
Over time, I moved closer to engineering by building the tools, workflows, and systems I needed to solve problems directly.

As a result, my work sits at the intersection of **operations, data, automation, and AI systems**.  
I care most about building practical solutions that reduce friction, work under real constraints, and avoid unnecessary complexity.

## What this document focuses on

- turning ambiguous operational or business problems into working systems
- building practical automation and AI workflows instead of isolated demos
- making architectural decisions under constraints such as limited resources, integration friction, or security boundaries
- documenting failures honestly when they reveal important technical limits

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

## 🔥 Personal Projects, Experiments & Post-Mortems

### Projects

#### 🎯 Automated Brand Logo Extraction Pipeline (Test Lab)
*A zero-shot segmentation pipeline and R&D dashboard designed to automatically extract high-quality brand logos from complex physical signboard images. [🔗 GitHub Repo](https://github.com/entangelk/logo_image)*

* **Automated Hybrid Anchoring:** Overcame the brittleness of blind SAM prompting. Combined Grounding DINO for ROI bounding with an OCR/Contour hybrid method to automatically generate precise, dense foreground anchor points, significantly reducing background hallucinations.
* **Vision Post-Processing Engine:** Separated extraction logic from quality refinement. Built a custom pixel-level tuning pipeline implementing Morphological Dehalo, LAB-space Color Decontamination, and distance-transform Edge Feathering to turn raw masks into commercial-grade assets.
* **Decoupled R&D Dashboard (FastAPI):** Engineered a lazy-loaded web interface that isolates each pipeline stage (Anchor, Detect, Segment, Quality) for independent debugging. Enables real-time parameter tuning and objective evaluation via Laplacian Sharpness and MAD Noise metrics.

#### 🧠 Agent Memory System
*MCP-based long-term memory architecture for AI assistants. [🔗 GitHub Repo](https://github.com/entangelk/agent-memory-system-public)*

* **Separation of Concerns:** Memory is compacted meaning, not just a log. To enforce this, I strictly separated the system's architecture into two layers: **MongoDB** as the immutable State of Truth (SoT) and **ChromaDB** as the dynamic Vector Cache for semantic context retrieval.

### Experiments

#### ⚡ AI Compiler Auto-Scheduler R&D & Feasibility Study (HW-WFC v2.9)
*Constraint-driven scheduling R&D validating the practical potential of WFC in AI hardware compilation. [🔗 GitHub Repo](https://github.com/entangelk/hw-wfc)*

* **Algorithm Validation:** Applied WFC to AI compiler scheduling, successfully identifying the exact optimum matched by Dynamic Programming (Exact DP). The custom cost model accurately predicted the correct directional performance, showing a positive correlation with actual RTX 3060 kernel execution times (Average ρ = +0.52, Softmax up to 1.0).
* **Strategic Scope Management:** Proved the algorithm's search capability, while objectively identifying that true production value—such as outperforming existing Autotuners—requires calibrating the cost model with massive real-world GPU profiling data. Having fulfilled all software-level prototype objectives, the research was strategically concluded at the hardware-dependency boundary.
* **Path Forward & Potential:** This project highlighted the immense power of constraint-driven search under tight memory limits (e.g., 12KB SRAM). With future hardware-backed cost model calibration, this architecture has strong potential for zero-shot cross-compilation and acting as a powerful candidate-reducer to warm-start traditional autotuners.

### Failed Experiments & Post-Mortems

#### 🧪 Q-PSA: Quantized Perturbation Sensitivity Analysis
*Layer importance scoring for quantized LLMs, designed to test whether discrete-space perturbation could replace gradient-based analysis. [🔗 GitHub Repo](https://github.com/entangelk/Q-PSA_Pr)*

* **Initial Hypothesis:** Existing layer-importance methods were built for continuous-weight models and degrade on quantized GGUF models. I proposed Q-PSA as a native discrete-space alternative: perturb sampled weights by `±1` quantization level and measure the resulting perplexity shift to estimate layer criticality without gradients.
* **Kill-Criteria Evaluation:** On `Qwen2.5-0.5B-Instruct (Q4_K_M)`, Q-PSA produced differentiated rankings, but failed the only validation that mattered: pruning usefulness. Removing the bottom-1 layer ranked by Q-PSA caused a **3.65x** PPL increase, while the much simpler **Layer Ablation** baseline held to **1.05x**. It was also roughly **1,300x slower** (`155 min` vs `7 s`), so the project was objectively killed in Phase 1.
* **Root Cause Analysis:** The method was framed as inspired by WFC's "observation in discrete space," but in practice it implemented classical perturbation sensitivity analysis: no collapse, no propagation, and no constraint reasoning. More importantly, I confirmed that **local sensitivity is not the same as functional importance** for pruning. A layer can be robust to small perturbations yet still be essential when removed entirely.
* **Platform Lesson & Reusable Output:** Choosing **GGUF/llama.cpp** created structural limits that invalidated the planned layer-looping validation and blocked meaningful inter-weight constraint modeling. Still, the project produced a reusable in-memory GGUF weight perturbation pipeline and, just as importantly, a documented proof that this WFC-inspired direction should be abandoned.

#### 🗺️ Limits of Geometry-Guided Pathfinding (Circle-WFC)
*Pathfinding R&D and post-mortem aimed at replacing traditional `A*` search with geometry-guided WFC. [🔗 GitHub Repo](https://github.com/entangelk/circle-wfc)*

* **Hypothesis & Early Wins:** Attempted to apply the Wave Function Collapse (WFC) algorithm to geometric layers (circles/rays) rather than tile grids. In early tests on simple or empty maps, it significantly outperformed A* in both speed and memory efficiency.
* **Root Cause Analysis:** Performance degraded sharply in complex mazes. Through rigorous debugging, I identified a fundamental structural contradiction: WFC is an engine for **'local consistency'**, whereas pathfinding requires **'global connectivity'**. WFC's tendency for "early commitment" (state collapse) proved fatal when long, topologically complex detours were required.
* **Conclusion:** Concluded that Circle-WFC is unsuitable as a standalone, general-purpose shortest-path solver. However, I successfully redefined its engineering value as a **'Search Space Reducer'** or 'Candidate Corridor Generator'—a highly efficient preprocessing module that drastically narrows the search area before a global solver (like A*) takes over.

#### 👁️ Gradient-free Neural Network Prototype (T-WFC)
*Designing a neural network training prototype without backpropagation and analyzing its scaling limits. [🔗 GitHub Repo](https://github.com/entangelk/T-WFC)*

* **Discrete State Collapse (PoC):** Successfully trained a toy MLP without utilizing autograd, backpropagation, or continuous optimizers. The model was trained purely through the WFC observe-collapse-propagate loop, restricting weights to only 5 discrete values (`{-1, -0.5, 0, 0.5, 1}`). It successfully matched the SGD baseline (100% accuracy) on linearly separable datasets.
* **Scaling Limits Analysis:** When tested on moderate-to-strong non-linear problems (XOR, Spiral), performance dropped significantly. I proved that the combinatorial search capacity of 5 discrete values is fundamentally insufficient to form complex, non-linear decision boundaries. Furthermore, as parameter count increased, memory and time overhead scaled exponentially, proving it impractical for deep learning scale-up.
* **Conclusion:** While not viable as a replacement for SGD in large models, this research validated the WFC-to-weight mapping concept. It leaves the door open for niche applications, such as alternative low-bit quantization for extreme edge devices or spatially local architectures (e.g., CNNs) where WFC's propagation model fits more naturally.

---
<p align="center">
  <a href="./README.md">⬅️ Back to Main Profile</a>
</p>
