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

### 🧠 Verified Agentic-RAG System *(flagship)*
*A verified RAG (retrieval-augmented generation) assistant for the legal domain: hybrid retrieval over a real Korean statute corpus, a multi-agent answer-research loop, and claim-by-claim grounding verification. Company project; source is internal-only, described at the architecture/decision level. The extraction milestone is closed — the verification core now ships as its own internal repository behind a versioned HTTP contract.*

* **Contract-First, Four Independent Layers:** The problem isn't solved by one LLM call, so I split it into Intake, Knowledge, RAG Harness, and Verification/Gate, and **fixed the contracts between them before building**. Each layer develops independently against mocks; the boundary objects (Task Brief, Source Ref, Gate Decision) live in one canonical contract file, and drift-lock tests fail the moment spec and code diverge — including an exact-drift guard between the committed OpenAPI document and the running service's own schema.
* **Trust Foundation Before Features:** Knowledge + Verification were built first, ahead of the RAG that feeds them. The core invariant is that **unverified text never reaches the user**, and any answer mutation (redacting an unsupported claim, for example) is re-verified before it ships.
* **The Vector Store Is a Cache, Not the Truth:** Final evidence is always reloaded from an **immutable source snapshot** via `source_ref`; if a parser or policy changes, a new snapshot is created and old references stay reproducible forever. Retrieval is ontology-aware — it returns the smallest unit plus its **path in the legal tree** (article / clause / item) and reloads surrounding context on demand, so a citation survives reindexing.
* **Schema-Guided Intake, Deterministic by Default:** A vague non-developer request isn't handed straight to the RAG. The default path is a deterministic schema registry, validator, and compiler; the LLM task classifier and slot filler sit behind opt-in flags and may only **propose**, against a registered task-type list and a field allowlist. Unknown fields stay `null` rather than guessed, a user-confirmed slot can't be overwritten by a later model guess, and an unresolvable session is **parked for human review** until a reviewer releases it explicitly.
* **Agentic Research, but the LLM Only Proposes:** Answer generation is a multi-agent loop — query planning, claim extraction, evidence linking, semantic verification, revision — behind a gate whose precedence is fixed as `block > human_review > retrieve_more > revise > pass`. The LLM proposes candidates, the verification layer confirms grounding claim-by-claim, and the gate decides what ships.
* **The Wheel Is Not the Contract:** Once the verification boundary held, I extracted the core into a standalone repository whose **only** supported cross-service interface is a versioned private HTTP API — candidate in, verified package out. The Python wheel and package facade are explicitly not an SDK boundary. Ownership is drawn the same way: the calling service owns authoritative storage and the commit decision, while the core returns a verified package and a recommended caller action. A published compatibility matrix between the testbed and the core API version acts as a release gate, structural regressions ban cross-package imports, and the extracted repo was proven by rebuilding it from a publication manifest in a clean environment (wheel install → checkout-free liveness/readiness → image build → contract fingerprint).
* **Verified the Same Way I Verify Everything:** **177 dated verification records** across ~2 months of daily working logs, on a suite that reached **1,119 tests** in the integrated repository. AI does the work; the verification decides whether it is real.

### 🎬 Long-Form AI Video Production System *(current work)*
*A production system that turns a chat description into a multi-minute video: a conversational brief the user approves, a deterministic compile into a shot-by-shot plan, and segment generation on fixed, operator-qualified ComfyUI graphs. Active company project; source not public, described at the architecture/decision level only.*

* **Approved Spec, Not Conversation:** The model drafts a creative brief that keeps what the user **stated**, what the model **assumed**, and what it must **ask** visibly separate. Only the version the user edited and approved compiles — deterministically — into a generation plan, so an inferred mood or camera choice never rides into a paid GPU run unnoticed.
* **The LLM Never Authors the Graph:** Free-form graph assembly produces nonexistent nodes, incompatible checkpoints, VRAM blowouts, and unreproducible runs. The graph is fixed to operator-qualified workflows and the model fills only declared parameter slots. This inverted the product surface too: users assemble a structured prompt (shots, duration, dialogue, soundscape, music, constraints) instead of picking a workflow, which stays an internal execution recipe.
* **One Execution Boundary, Immutable Snapshots:** Our backend is the only execution boundary — a local ComfyUI host and a hosted runtime sit behind the same adapter contract, with identical queue/history handling and receipt-based resume and artifact recovery. Run-time workflow and parameters freeze into an immutable snapshot (recipes change only as a new revision), so reproduction is snapshot-based. Nothing leaving the boundary carries a raw graph, provider payload, storage key, or credential.
* **The 15-Second Wall — Continuity, Not Editing:** The generation model produces ~15 seconds at a time, so a 15 / 30 / 60 / 180-second request is analyzed once per video and planned into exactly 1 / 2 / 4 / 12 segments. The decision that mattered was refusing to merge two things into one feature: **reference-to-video** (identity, style, motion) is a subject anchor and **frame chaining** (last frame → next first frame) is a time-boundary anchor, verified separately. A manager step that sees the whole video decides per segment which references to use or omit, and a segment left with no reference is explicitly stopped rather than quietly generated from text.
* **One Prompt IR, a Gate That Only Judges:** Text-, image-, and reference-driven generation were unified behind a single structured prompt IR and renderer — verbatim dialogue with lip-sync and subtitle policy, ambient soundscape kept separate from non-diegetic music, length ceilings, and constraint phrasing now apply identically across all three modes. Multimodal image analysis records what the user *declared* apart from what the *pixels show*. Specialist steps have fixed input/output/write scopes rather than free-form agent chat, and the pre-generation gate returns only `PASS` / `REPAIR` / `BLOCKED` with a target step and reasons — it never edits the prompt; a repair re-runs just the failed step under a call ceiling.
* **Failures Recorded, Not Promoted:** The music-video direction improved with longer context but still drifted at the one-minute musical boundary, so it was put on hold. A ~58-second ad passed on Korean dialogue alone and failed on static framing, low information density, and broken on-screen Hangul. A ~3-minute drama had so many defects that I declined to itemize fixes rather than produce a fake remediation table. None were promoted to a user-facing capability, and per-segment voice drift is named as an open problem rather than papered over. Behind that: **10 decision briefs written before implementation**, **26 dated independent verification records**, ~**490 backend tests**, and a single canonical contract file the phase docs cannot override.

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

#### 📖 AI Writer System — A Writing Operating System for Long-Form Fiction
*A long-term memory and verification system that keeps a book-length manuscript internally consistent. Not an "AI writing chatbot": MongoDB as the canonical source of truth, narrative memory, and agentic search, combined so that consistency is a structural property rather than something the author has to remember. [🔗 GitHub Repo](https://github.com/entangelk/ai_writte_system)*

* **Problem Reframing — the failure is consistency, not prose.** What actually breaks in a long manuscript is not sentence quality: a character speaks differently in chapter 3 and chapter 17, someone killed off before chapter 20 reappears, and the author themselves cannot find what a setting originally said. A general-purpose chatbot cannot solve this structurally, because it remembers nothing outside the conversation window. So the center of this system is not the generation model — it is **memory**. Manuscript, settings, worldbuilding, and style accumulate as long-term memory, and at each writing moment only the relevant fragments are retrieved and handed to the model.
* **AI Output Is Not Canon.** Every generated or analyzed result lands as a `candidate` and becomes memory only after a Gate verdict and human review. The moment "whatever the AI wrote is true" is allowed, the memory itself is contaminated — and every later retrieval inherits that contamination. Memory is **append-only**: updates stack as versions rather than overwriting, so a bad revision cannot erase the past. Every claim carries a `source_ref` pointing back to the original text position, so the author can audit the AI's judgment down to where it came from.
* **The Vector Store Is a Cache, Not the Truth.** MongoDB holds the canonical record; ChromaDB (BGE-m3 vector) and Elasticsearch (nori lexical) are derived hybrid retrieval indexes maintained through an async outbox worker. Final evidence is always reloaded from the canonical record rather than trusted from the index — the same truth-vs-cache split I first built in the **Agent Memory System** (below), applied here at product scale.
* **Swappable Parts, Measured Before Swapping.** Embedding and reranking sit behind provider-neutral seams. With no endpoint configured, embedding falls back to a fake but reranking falls back to `None` — no reranking at all — because there is no useful stand-in for "fake reranking," and shuffling at random is worse than doing nothing. The brief specified "a generic OpenAI-compatible adapter," but **OpenAI has no rerank endpoint**; following the wording literally would have implemented a contract that does not exist, so I built the shape the field actually shares (`POST /v1/rerank` — Cohere, Jina, Voyage, TEI) and recorded the departure in the brief. The assembly is locked by a guard because **this failure is silent**: if reranking quietly falls out, nothing looks broken and the ranking simply reverts. An evaluation harness (`recall@k` · `MRR` · `nDCG@k`) was written **before** any swap, with gold labels deliberately unfilled — owning a harness is not the same as having evaluated anything.
* **Documentation as a Precondition, Not a Byproduct.** Choices that cannot be quietly reversed later — architecture, contract literals, policy — are raised as a **decision brief** with an options table before any code is written, and implementation stops until the owner decides. **96 decision briefs** exist to date. After implementation, a *different* session attempts to falsify the work by **mutation**: reverting the fix to confirm the regression guard fails again. Guards must fail in both directions — reintroducing the original bug, and over-correcting into a valid case.
* **Verification That Is Allowed to Fail.** **269 independent verification records over 61 dated days**, sitting on a suite of **2,316 passing tests (2,654 subtests)**. The verdict split is **185 pass · 80 conditional · 4 outright fail** — **30% do not come back clean**, and that rate **is the evidence the process is real** rather than ceremonial; each finding is closed in a follow-up commit. One representative catch: an enforcement recorded as "complete" was true at the compose-file level but **false at runtime**, because already-created containers still carried the old port mapping — caught by `docker ps`, not by the test suite.
* **Honest Scope Boundary.** Currently at **local single-operator stage**; real-use observation (dogfood) was **declared started on 2026-08-23**, so every number above is a *system* metric, not a *product* metric. The stack runs end-to-end on one `docker compose up` (FastAPI · React/TS · MongoDB · ChromaDB · Elasticsearch · a local Gemma 4 12B endpoint), with multi-user auth, project ownership, per-request quota, and an admin surface implemented. What it is **not** yet: a multi-tenant production service with real users. Remote multi-host deployment stays on the deferred list.

#### 🎯 Automated Brand Logo Extraction Pipeline (Test Lab)
*A zero-shot segmentation pipeline and R&D dashboard designed to automatically extract high-quality brand logos from complex physical signboard images. [🔗 GitHub Repo](https://github.com/entangelk/logo_image)*

* **Automated Hybrid Anchoring:** Overcame the brittleness of blind SAM prompting. Combined Grounding DINO for ROI bounding with an OCR/Contour hybrid method to automatically generate precise, dense foreground anchor points, significantly reducing background hallucinations.
* **Vision Post-Processing Engine:** Separated extraction logic from quality refinement. Built a custom pixel-level tuning pipeline implementing Morphological Dehalo, LAB-space Color Decontamination, and distance-transform Edge Feathering to turn raw masks into commercial-grade assets.
* **Decoupled R&D Dashboard (FastAPI):** Engineered a lazy-loaded web interface that isolates each pipeline stage (Anchor, Detect, Segment, Quality) for independent debugging. Enables real-time parameter tuning and objective evaluation via Laplacian Sharpness and MAD Noise metrics.

#### 🧠 Agent Memory System
*MCP-based long-term memory architecture for AI assistants. [🔗 GitHub Repo](https://github.com/entangelk/agent-memory-system-public)*

* **Separation of Concerns:** Memory is compacted meaning, not just a log. **MongoDB** is the durable, authoritative State of Truth (SoT), while **ChromaDB** is a derived Vector Cache that can be rebuilt from it. Mongo is not immutable—the system supports memory update/delete—and the current handlers still require explicit reindex/rebuild operations for full cache consistency.

#### 🧪 Assessment Spec Harness — CI for Hiring Assessments
*A deterministic harness that evaluates the assessment design itself—not the candidate—by detecting mismatches between a hiring assignment's public spec and its private grading rubric before candidates ever see them. [🔗 GitHub Repo](https://github.com/entangelk/assessment_poc)*

* **Problem Reframing:** Most assessment tooling grades candidates. I targeted the upstream failure instead: specs and rubrics silently drift apart—optional items scored as core, must-have items covered by bonus only, double scoring—quietly making an assessment unfair. The harness treats spec/rubric consistency as something you can run CI against.
* **Deterministic Core over Immutable Snapshots:** Anchored the entire pipeline to an immutable source snapshot (sha256 + line/span `source_ref`), so every finding is grounded in the original text without a DB or RAG layer. A deterministic validation core (Rule 0 reference integrity + Rule 1–3 + rubric lint rules) produces reproducible findings—both example assignments reproduced identical finding distributions across three repeated runs with zero reference-integrity violations.
* **Agent-First CLI Contract:** Designed the primary caller to be an AI agent (Claude Code, Codex, Gemini), with a stable core output contract (`status` / `exit_code` / `command` / `next_actions`), schema introspection, and well-defined exit codes, so callers integrate safely without chasing docs. Humans participate only as final reviewers through an explicit review → gate verdict flow.
* **Honest Scope Boundary:** The deterministic core and review/verdict flow are implemented; live LLM SDK runners remain deferred. Two synthetic examples were each run end-to-end three times through `deterministic_extraction` + mock semantic verification, reproducing identical finding distributions with zero Rule 0 diagnostics. This validates deterministic workflow reproducibility on grounded artifacts—not live-LLM extraction quality.

### Experiments

#### 🧩 Harness IR — Provider-Neutral Role IR for Structured Extraction (Feasibility Study)
*A single-hypothesis POC asking whether IR-based lowering improves structured-extraction reliability over hardcoded prompt templates, benchmarked across multiple LLM backends. [🔗 GitHub Repo](https://github.com/entangelk/Harness_ir)*

* **Single Falsifiable Hypothesis:** Built the smallest runnable slice (`role_ir.yaml -> lowering -> single backend call -> assurance`) specifically to test one claim under a shared, fair evaluation flow: does a provider-neutral Role IR beat a hardcoded baseline prompt? Kept the broader platform thesis in `docs/` so the experiment could be read against the direction it was meant to validate—without overclaiming what the code actually proves.
* **Provider-Neutral Lowering + Assurance:** Designed a Role IR that lowers to per-backend artifacts (OpenAI `json_schema`; Groq and Google GenAI/Gemma prompt + JSON extraction + schema validation; OpenRouter generic path), backed by the POC's implemented assurance checks for schema and evidence spans. Models on an already-supported provider path can be added through `backends.yaml`; a new provider family still requires an adapter and registry code.
* **Honest, Mixed Result:** On the contract eval-8 fair-mode runs, IR reached gold/near parity on some models, but on the hard distractor sets there was no clean IR win—`renewal`/`penalty` false positives became a shared failure family across both IR and baseline. I reported this directly rather than cherry-picking favorable runs.
* **What the Failure Pointed To:** The inconclusive benchmark reframed the real lever: the next-phase value is not the lowering step alone but self-verification loops, critic roles, and convergence logic—explicitly kept out of current scope. The role compiler likewise stayed a deterministic draft generator rather than a full semantic compiler.

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
