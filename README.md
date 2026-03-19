<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Greetings!👋 I'm a Data & AI Engineer 🚀

Starting my journey as a Data Analyst (DA), I am now an engineer who bridges the gap between data flow and system architecture. Moving beyond simple API calls, my focus is on building robust, practical pipelines within strict business constraints (resources, time, cost). I strictly avoid over-engineering and treat AI models (LLMs, Vision) not as ultimate goals, but as powerful tools to solve real-world problems.

### 💡 My Philosophy
> "Memory is not a log. Memory is compacted meaning." 
> A system should reflect the philosophy of the business, and code is the most elegant means of control to enforce that philosophy.

---

### 🛠️ Practical Arsenal

* **Core Logic & Prototyping:** Python, Pandas, Jupyter Notebook
* **AI Engineering (LLM & Vision):** * *Proprietary:* GPT-5, Claude 4.6, Gemini 3.1
  * *Open-Source:* Qwen2.5, Llama 3 (llama.cpp Quantization), BGE-m3 (Embedding/Reranking), Flux, SAM, Grounding DINO, Qwen3 TTS
* **Backend & System:** FastAPI (Swagger-based API Design), MongoDB, ChromaDB, Docker

---

### 💼 Work Experience / Corporate Projects

#### 🧠 Production-Ready NLP Categorization Microservice
* **Description:** Developed and deployed an AI microservice module that matches natural language user inputs with internal DB categories for a live commercial service.
* **Key Engineering:**
  * **Embedding & Reranking:** Built a highly accurate semantic search pipeline utilizing `BGE-m3` embedding and reranking models.
  * **Frictionless Integration:** Containerized the module via **Docker** and provided comprehensive **Swagger API docs**, ensuring seamless communication and integration with the core backend development team.

#### 🖼️ Large-Scale Asset Generation & Review Pipeline
* **Description:** Built a mass-generation and review pipeline for 22,000+ service image assets, optimized for a one-off project under strict hardware limits.
* **Key Engineering:**
  * **Resource-Aware Architecture:** Designed a synchronous pipeline for a constrained local environment (WSL). Intentionally excluded DB/MQ, naturally utilizing physical hardware I/O limits as an API rate limiter.
  * **CSR Load Optimization:** Overcame a 5+ minute rendering bottleneck for 22,000 metadata entries by implementing **Lazy Loading** and **Browser Caching**, drastically improving dashboard performance.
  * **Model Scaling:** Conducted prompt PoC with local **Flux** models before successfully migrating to **Gemini API (Flash Image)** for mass production.

#### ⚙️ Zero-Overhead Internal Automation Pipeline
* **Description:** Developed an internal-only automation hub to collect scattered static data (reports, vacation logs) and send notifications, strictly adhering to corporate security policies.
* **Key Engineering:**
  * **Zero Core-Dev Intervention:** Overcame external Cloud DB access restrictions by reverse-engineering and crawling the internal CMS. Reused legacy APIs (e.g., email/SMS dispatch modules) to build the pipeline without requesting additional backend resources.
  * **Secure Closed-Network Execution:** Maintained strict security by executing scripts exclusively within the closed internal network without external port-forwarding, inheriting existing module authentications.

#### 🔧 Lightweight Internal Network Utility
* **Description:** A simple Python-based port-connection script to resolve single-connection VPN bottlenecks.
* **Impact:** Eliminated workflow interruptions caused by strict corporate VPN policies, enabling team members to maintain multiple secure connections efficiently with minimal setup.

---

### 🔥 Personal & R&D Projects

#### 🎯 Automated Brand Logo Extraction Pipeline (Test Lab)
* **Description:** A zero-shot segmentation pipeline and R&D dashboard designed to automatically extract high-quality brand logos from physical signboard images.
* **Key Engineering:**
  * **Automated Anchoring:** Combined **Grounding DINO** with OCR/Contour hybrid methods to automate input prompts for **SAM (Segment Anything)**.
  * **Vision Post-processing:** Implemented pixel-level quality tuning pipelines (Dehalo, Color Decontamination, Edge Feathering) to ensure commercial-grade image outputs.
  * **R&D Test Lab (FastAPI):** Built a web interface to tune model parameters (IoU, stability) and visualize pre/post-processing metrics (Sharpness, Noise).

#### 🧠 Agent Memory System
* **Link:** [GitHub Repository](https://github.com/entangelk/agent-memory-system-public)
* **Description:** MCP-based long-term memory architecture for AI assistants. 
* **Key Engineering:** Strictly separates State of Truth (MongoDB) and Vector Cache (ChromaDB) to maintain persistent, compacted meaning.

#### ⚡ WFC Algorithm Optimization & AI Auto-Scheduler
* **Links:** [Circle-WFC](https://github.com/entangelk/circle-wfc) | [T-WFC](https://github.com/entangelk/T-WFC) | [HW-WFC v2.0](https://github.com/entangelk/hw-wfc)
* **Description:** R&D on Wave Function Collapse (WFC) algorithms and neural network prototypes.
* **Key Engineering:**
  * Designed geometry-based WFC to overcome the topological limitations of traditional A* search.
  * Prototyped a gradient-free neural network using PyTorch, forming classification boundaries via discrete state collapse instead of backpropagation.
  * Developed a constraint-driven AI compiler auto-scheduler, achieving **~2400x speedup** and reducing the search space by 98.5%.

---

📫 **Contact:** [kdtyohan@gmail.com] | [[LinkedIn](https://www.linkedin.com/in/%EC%9A%94%ED%95%9C-%EB%B0%95-b4a06a3b3/)]
