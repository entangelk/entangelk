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

### 🎯 Automated Brand Logo Extraction Pipeline (Test Lab)
*A zero-shot segmentation pipeline and R&D dashboard designed to automatically extract high-quality brand logos from physical signboard images.*

* **Automated Anchoring:** Eliminated manual prompting for **SAM (Segment Anything)** by combining **Grounding DINO** (Text-to-Bbox) with an OCR/Contour hybrid method to automatically generate foreground/background anchor points.
* **Vision Post-processing:** Raw segmentation masks are rarely production-ready. I built a pixel-level quality tuning pipeline from scratch, implementing parameters for **Dehalo**, **Color Decontamination**, and **Edge Feathering** to ensure commercial-grade image outputs.
* **R&D Test Lab (FastAPI):** Built a web interface to tune AutoMask parameters (IoU thresholds, point density) and visually evaluate pre/post-processing metrics (Sharpness, Noise level differences).

### 🧠 Agent Memory System
*MCP-based long-term memory architecture for AI assistants. [🔗 GitHub Repo](https://github.com/entangelk/agent-memory-system-public)*

* **Separation of Concerns:** Memory is compacted meaning, not just a log. To enforce this, I strictly separated the system's architecture into two layers: **MongoDB** as the immutable State of Truth (SoT) and **ChromaDB** as the dynamic Vector Cache for semantic context retrieval.

### ⚡ WFC Algorithm Optimization & AI Auto-Scheduler
*R&D on Wave Function Collapse (WFC) algorithms, neural network prototypes, and compiler scheduling across three distinct repositories.*

* **Geometry-based Pathfinding [🔗 Circle-WFC](https://github.com/entangelk/circle-wfc):** Designed a geometry-based WFC algorithm to overcome the topological limitations of traditional A* search.
* **Gradient-free Neural Network [🔗 T-WFC](https://github.com/entangelk/T-WFC):** Prototyped a network using PyTorch tensor operations that forms classification boundaries via discrete state collapse instead of traditional backpropagation.
* **AI Compiler Auto-Scheduler [🔗 HW-WFC v2.0](https://github.com/entangelk/hw-wfc):** Developed a constraint-driven AI compiler auto-scheduler, achieving **~2400x speedup** and reducing the search space by 98.5% compared to standard Grid Search.

---
<p align="center">
  <a href="./README.md">⬅️ Back to Main Profile</a>
</p>
