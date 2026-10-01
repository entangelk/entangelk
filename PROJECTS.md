<p align="center"><a href="https://github.com/entangelk/entangelk/blob/main/README.md">Main profile</a> · <a href="https://github.com/entangelk/entangelk/blob/main/PROJECTS.ko.md">한국어</a></p>

# Product decisions and operational cases

Each case starts with the work problem, chosen experience, implemented result and validation boundary. Expand the supporting technical record below it. Implementation, documented observations and user benefit are different forms of evidence.

## Operational work and decisions

### Customer-center seasonal staffing

[Case](https://entangelk.github.io/entangelk/experience.html#staffing)

**Problem:** Average demand can hide high-load days and missed calls.

**Choice:** Split about 2.5 years of call logs by season and use Q90 of high-load days for peak planning. A monthly-peak trend with little explanatory power (R² about 0.06) stayed a reference. Estimate extra staffing from remaining demand and practical throughput, with a +1 conservative option.

**Evidence:** The report records historical back-testing at about 91% accuracy and 96% detection of understaffed days. It connects the analysis to staffing two weeks before the season and adding capacity above the per-person threshold.

**Operational outcome:** The analysis informed actual seasonal hiring, reducing headcount by three compared with the previous year and saving ₩6 million in labor costs.

**Operational cross-check:** After the staffing adjustment, the call connection rate exceeded the 90% target. During Chuseok 2026, operating with one fewer person than planned produced a connection rate of 88–91%. The observed capacity shortfall also corresponded to one staff member, providing another operational comparison against the staffing and workload estimates.

### Large-scale asset generation and review

[Case](https://entangelk.github.io/entangelk/experience.html#assets)

**Problem and experience:** Image renewal includes human comparison, regeneration and moving to the next item. The interface provides original/generated comparison, status filters, search, generation history, regeneration, review confirmation and cancellation.

**Choice:** Exclude reviewed, skipped and already-generated items from new batches and continue unfinished work. `Pass` means skipping, not approval. The current interface uses paginated lists and lazy image loading.

**Evidence:** The local generation index has 22,068 unique items. That is distinct from generation attempts, final approvals and deployed assets.

**Feedback and contribution:** Content-creator feedback led to bulk regeneration, editing tags and other metadata for direct database updates, and a page showing asset shortages by category. I handled development; the creators performed individual content review and approval.

**Operational outcome:** Content creators reviewed the replacement assets, which were all deployed to the service, and the existing license was terminated. Generation API spend was about 40% of the former annual license fee, equivalent to a payback period of roughly 0.4 years on that API-spend basis.

### NLP category matching

[Case](https://entangelk.github.io/entangelk/experience.html#nlp)

**Problem and experience:** Connect natural-language input to existing categories, related image retrieval and content generation. Embedding and reranking feed the existing classification system.

**Users and contribution:** Deployed in the production-agency workflow for v비즈링 and v프로필, services available through all three mobile carriers. I owned the entire automatic-production module, from natural-language category selection to image allocation. Internal use testing by the content specialist produced satisfactory feedback.

**Choice:** Account for common-tag bias and image relevance; update only changed embeddings instead of rebuilding everything. Docker and API documentation connect the module to the existing backend.

**Update paths:** Separate full rebuilds from incremental updates of changed mappings. Documented timings are about 125 seconds for 4,121 mappings and about 2 seconds for 10 mappings, with each workload stated explicitly.

### Internal operations automation

[Case](https://entangelk.github.io/entangelk/experience.html#automation)

**Problem and experience:** Connect repetitive collection and monthly reporting to web-based generation, viewing, editing and export. When collection encounters a CAPTCHA, a person can enter it and resume.

**Choice and result:** Connect report generation, editing and export to scheduled execution and status checks. Existing CMS/API reuse in individual workflows and the platform’s datastore and scheduler serve their respective operating scopes.

**User and operational outcome:** Used by the planning/operations specialist preparing monthly reports for four services. Work that previously took an experienced planner two days—from collection through analysis and report production—was generated in under half a day with the tool.

### Supporting work: internal network utility

Deployed a small Python utility for team work interrupted by VPN connection constraints.

## Product decisions

### AI Writer System · In development

[GitHub](https://github.com/entangelk/ai_writte_system) · [Screens and case](https://entangelk.github.io/entangelk/case-studies.html#writer)

**Audience and problem:** Long-form creators looking up earlier settings and events while writing the next section. Consistency tracking is the central product hypothesis.

**Experience and choice:** Draft → inspect a memory suggestion's source → approve or reject → retrieve during later writing. Generated prose stays in a side pad until adopted. Generated content does not enter accepted memory without review.

**Implemented result:** Drafting, generation, memory review and retrieval run locally. Separate prose-adoption and memory-approval screens let the author decide what enters the manuscript and its context.


<details>
<summary>Technical structure and documented verification</summary>

* **Product hypothesis.** Focus on the burden of finding settings and events and checking consistency while writing. Its importance relative to prose quality has not been established across writers.
* **AI Output Is Not Canon.** Every generated or analyzed result lands as a `candidate` and becomes memory only after a Gate verdict and human review. The moment "whatever the AI wrote is true" is allowed, the memory itself is contaminated — and every later retrieval inherits that contamination. Memory is **append-only**: updates stack as versions rather than overwriting, so a bad revision cannot erase the past. Every claim carries a `source_ref` pointing back to the original text position, so the author can audit the AI's judgment down to where it came from.
* **The Vector Store Is a Cache, Not the Truth.** MongoDB holds the canonical record; ChromaDB (BGE-m3 vector) and Elasticsearch (nori lexical) are derived hybrid retrieval indexes maintained through an async outbox worker. Final evidence is always reloaded from the canonical record rather than trusted from the index — the same truth-vs-cache split I first built in the **Agent Memory System** (below), applied here at product scale.
* **Swappable Parts, Measured Before Swapping.** Embedding and reranking sit behind provider-neutral seams. With no endpoint configured, embedding falls back to a fake but reranking falls back to `None` — no reranking at all — because there is no useful stand-in for "fake reranking," and shuffling at random is worse than doing nothing. The brief specified "a generic OpenAI-compatible adapter," but **OpenAI has no rerank endpoint**; following the wording literally would have implemented a contract that does not exist, so I built the shape the field actually shares (`POST /v1/rerank` — Cohere, Jina, Voyage, TEI) and recorded the departure in the brief. The assembly is locked by a guard because **this failure is silent**: if reranking quietly falls out, nothing looks broken and the ranking simply reverts. An evaluation harness (`recall@k` · `MRR` · `nDCG@k`) was written **before** any swap, with gold labels deliberately unfilled — owning a harness is not the same as having evaluated anything.
* **Documentation as a Precondition, Not a Byproduct.** Choices that cannot be quietly reversed later — architecture, contract literals, policy — are raised as a **decision brief** with an options table before any code is written, and implementation stops until the owner decides. The public snapshot contains **118 decision briefs**. After implementation, a *different* session attempts to falsify the work by **mutation**: reverting the fix to confirm the regression guard fails again. Guards must fail in both directions — reintroducing the original bug, and over-correcting into a valid case.
* **Documented system verification.** The existing public snapshot reports 118 decision briefs, 315 verification records, and 3,075 passing tests (4,239 subtests). Verdict proportions establish neither review quality nor product value. A runtime container retaining an old port mapping illustrates the need to inspect deployment state alongside tests.
* **Operating scope.** Local end-to-end operation, authentication, project ownership, quotas and administration are implemented. Remote multi-host deployment remains deferred.

</details>

**Dogfooding and iteration:** I use it for my own writing, dogfooding the product and improving the analysis display and review workflow from issues encountered during use.

### Long-Form AI Video Production System · Company project, model quality under evaluation

[Case](https://entangelk.github.io/entangelk/experience.html#video) · Private source

**Audience and problem:** Let video requesters describe intent without managing complex generation recipes.

**Experience and choice:** Video intent → scenario confirmation → required reference-image review → planning → segment generation and master review. Workflows stay internal; users work with content and intent. Free graph assembly, SNS publishing and performance-based learning are separate from the current experience.

**Ownership:** I own service planning, architecture, the full backend and management of two working developers. Frontend development is handled separately. Reference functionality was added using custom nodes.

**Purpose and status:** In development within a CEO-led task force, focused on B2B advertising. I perform most testing; the system is at the development stage before operational adoption.

**Result and next decision:** Generation and master assembly run locally. Reference features implement support for long-form continuity and voice consistency to a degree. Current evaluation focuses on differences in output quality across models.


<details>
<summary>Technical structure and documented verification</summary>

* **Checking the execution input.** Requests needing images go through scenario confirmation and image review before generation. Approved content feeds planning, with assumptions distinguished. Some image-free paths use automatic approval; not every request requires manual approval.
* **The LLM Never Authors the Graph:** Free-form graph assembly produces nonexistent nodes, incompatible checkpoints, VRAM blowouts, and unreproducible runs. The graph is fixed to operator-qualified workflows and the model fills only declared parameter slots. This inverted the product surface too: users assemble a structured prompt (shots, duration, dialogue, soundscape, music, constraints) instead of picking a workflow, which stays an internal execution recipe.
* **One Execution Boundary, Immutable Snapshots:** Our backend is the only execution boundary — a local ComfyUI host and a hosted runtime sit behind the same adapter contract, with identical queue/history handling and receipt-based resume and artifact recovery. Run-time workflow and parameters freeze into an immutable snapshot (recipes change only as a new revision), so reproduction is snapshot-based. Nothing leaving the boundary carries a raw graph, provider payload, storage key, or credential.
* **The 15-Second Wall — Continuity, Not Editing:** The generation model produces ~15 seconds at a time, so a 15 / 30 / 60 / 180-second request is analyzed once per video and planned into exactly 1 / 2 / 4 / 12 segments. The decision that mattered was refusing to merge two things into one feature: **reference-to-video** (identity, style, motion) is a subject anchor and **frame chaining** (last frame → next first frame) is a time-boundary anchor, verified separately. A manager step that sees the whole video decides per segment which references to use or omit, and a segment left with no reference is explicitly stopped rather than quietly generated from text.
* **One Prompt IR, a Gate That Only Judges:** Text-, image-, and reference-driven generation were unified behind a single structured prompt IR and renderer — verbatim dialogue with lip-sync and subtitle policy, ambient soundscape kept separate from non-diegetic music, length ceilings, and constraint phrasing now apply identically across all three modes. Multimodal image analysis records what the user *declared* apart from what the *pixels show*. Specialist steps have fixed input/output/write scopes rather than free-form agent chat, and the pre-generation gate returns only `PASS` / `REPAIR` / `BLOCKED` with a target step and reasons — it never edits the prompt; a repair re-runs just the failed step under a call ceiling.
* **Distinguish experiments from current implementation:** Earlier music-video, ad and drama trials recorded issues with musical boundaries, visual information, on-screen Hangul and voice quality. Reference features now support long-form continuity and voice consistency to a degree; current evaluation concerns model-specific output quality. The existing snapshot includes 10 decision briefs, 26 dated verification records, roughly 490 backend tests and a canonical contract.

</details>

## Technical foundations

### Verified Agentic RAG · Company technical case

[Case](https://entangelk.github.io/entangelk/experience.html#rag) · Private source

Experimented with intake, retrieval, answer candidates and evidence verification over real Korean statutes. Unresolved requests or evidence route to human review. The verification Core is a standalone foundation for other services; the caller owns final storage and acceptance.


**Purpose, contribution and status:** Built as an MVP for foundational AI-service capabilities within a CEO-led task force. I implemented approximately 98% and perform most testing. It remains at the development stage before operational adoption.

<details>
<summary>Technical structure and documented verification</summary>

* **Contract-First, Four Independent Layers:** The problem isn't solved by one LLM call, so I split it into Intake, Knowledge, RAG Harness, and Verification/Gate, and **fixed the contracts between them before building**. Each layer develops independently against mocks; the boundary objects (Task Brief, Source Ref, Gate Decision) live in one canonical contract file, and drift-lock tests fail the moment spec and code diverge — including an exact-drift guard between the committed OpenAPI document and the running service's own schema.
* **Trust Foundation Before Features:** Knowledge + Verification were built first, ahead of the RAG that feeds them. The core invariant is that **unverified text never reaches the user**, and any answer mutation (redacting an unsupported claim, for example) is re-verified before it ships.
* **The Vector Store Is a Cache, Not the Truth:** Final evidence is always reloaded from an **immutable source snapshot** via `source_ref`; if a parser or policy changes, a new snapshot is created and old references stay reproducible forever. Retrieval is ontology-aware — it returns the smallest unit plus its **path in the legal tree** (article / clause / item) and reloads surrounding context on demand, so a citation survives reindexing.
* **Schema-Guided Intake, Deterministic by Default:** A vague non-developer request isn't handed straight to the RAG. The default path is a deterministic schema registry, validator, and compiler; the LLM task classifier and slot filler sit behind opt-in flags and may only **propose**, against a registered task-type list and a field allowlist. Unknown fields stay `null` rather than guessed, a user-confirmed slot can't be overwritten by a later model guess, and an unresolvable session is **parked for human review** until a reviewer releases it explicitly.
* **Agentic Research, but the LLM Only Proposes:** Answer generation is a multi-agent loop — query planning, claim extraction, evidence linking, semantic verification, revision — behind a gate whose precedence is fixed as `block > human_review > retrieve_more > revise > pass`. The LLM proposes candidates, the verification layer confirms grounding claim-by-claim, and the gate decides what ships.
* **The Wheel Is Not the Contract:** Once the verification boundary held, I extracted the core into a standalone repository whose **only** supported cross-service interface is a versioned private HTTP API — candidate in, verified package out. The Python wheel and package facade are explicitly not an SDK boundary. Ownership is drawn the same way: the calling service owns authoritative storage and the commit decision, while the core returns a verified package and a recommended caller action. A published compatibility matrix between the testbed and the core API version acts as a release gate, structural regressions ban cross-package imports, and the extracted repo was proven by rebuilding it from a publication manifest in a clean environment (wheel install → checkout-free liveness/readiness → image build → contract fingerprint).

</details>

### Agent Memory System · Foundation for AI Writer

[GitHub](https://github.com/entangelk/agent-memory-system-public)

An MCP experiment in shared memory storage and retrieval across AI clients. Canonical-record/search-cache separation carries into AI Writer. Full cache consistency after memory updates/deletes requires reindexing or rebuilding, and the server cannot force clients to use memory.


<details>
<summary>Technical structure and documented verification</summary>

* **Separation of Concerns:** Memory is compacted meaning, not just a log. **MongoDB** is the durable, authoritative State of Truth (SoT), while **ChromaDB** is a derived Vector Cache that can be rebuilt from it. Mongo is not immutable—the system supports memory update/delete—and the current handlers still require explicit reindex/rebuild operations for full cache consistency.

</details>

## Supporting PoC

### Assessment Spec Harness · PoC

[GitHub](https://github.com/entangelk/assessment_poc) · [Case](https://entangelk.github.io/entangelk/case-studies.html#assessment)

**Audience and problem:** A PoC for assessment designers to detect drift between assignment instructions and grading rubrics.

**Experience and choice:** Spec/rubric input → inspect mismatch findings → human review → gate decision. Check the assessment design rather than automatically grading candidates. CLI and AI agents are calling interfaces, distinct from the user's job.

**Verification result:** Two synthetic examples ran three times each using deterministic extraction and mock semantic verification, reproducing the finding distributions. Live LLM SDK integration remains outside the implemented scope.


<details>
<summary>Technical structure and documented verification</summary>

* **Problem Reframing:** Most assessment tooling grades candidates. I targeted the upstream failure instead: specs and rubrics silently drift apart—optional items scored as core, must-have items covered by bonus only, double scoring—quietly making an assessment unfair. The harness treats spec/rubric consistency as something you can run CI against.
* **Deterministic Core over Immutable Snapshots:** Anchored the entire pipeline to an immutable source snapshot (sha256 + line/span `source_ref`), so every finding is grounded in the original text without a DB or RAG layer. A deterministic validation core (Rule 0 reference integrity + Rule 1–3 + rubric lint rules) produces reproducible findings—both example assignments reproduced identical finding distributions across three repeated runs with zero reference-integrity violations.
* **Agent-First CLI Contract:** Designed the primary caller to be an AI agent (Claude Code, Codex, Gemini), with a stable core output contract (`status` / `exit_code` / `command` / `next_actions`), schema introspection, and well-defined exit codes, so callers integrate safely without chasing docs. Humans participate only as final reviewers through an explicit review → gate verdict flow.
* **Honest Scope Boundary:** The deterministic core and review/verdict flow are implemented; live LLM SDK runners remain deferred. Two synthetic examples were each run end-to-end three times through `deterministic_extraction` + mock semantic verification, reproducing identical finding distributions with zero Rule 0 diagnostics. This validates deterministic workflow reproducibility on grounded artifacts—not live-LLM extraction quality.

</details>

## Research archive

### Logo Segmentation Workbench

[GitHub](https://github.com/entangelk/logo_image)

A CV workbench that separates warp, anchoring, segmentation and cleanup to inspect failures. It combines OCR/contours with Grounding DINO and SAM, using sharpness/noise to compare settings. Cleanup cannot recover missing foreground or guarantee commercially usable extraction.

### Harness IR · Mixed results

[GitHub](https://github.com/entangelk/Harness_ir)

**Hypothesis → result → decision:** Compare provider-neutral IR with baseline structured extraction. Hard distractors removed a clear advantage. Self-verification became a follow-up hypothesis rather than claiming improvement from lowering alone; the follow-up loop is outside the implementation scope.


<details>
<summary>Technical structure and documented verification</summary>

* **Single Falsifiable Hypothesis:** Built the smallest runnable slice (`role_ir.yaml -> lowering -> single backend call -> assurance`) specifically to test one claim under a shared, fair evaluation flow: does a provider-neutral Role IR beat a hardcoded baseline prompt? Kept the broader platform thesis in `docs/` so the experiment could be read against the direction it was meant to validate—without overclaiming what the code actually proves.
* **Provider-Neutral Lowering + Assurance:** Designed a Role IR that lowers to per-backend artifacts (OpenAI `json_schema`; Groq and Google GenAI/Gemma prompt + JSON extraction + schema validation; OpenRouter generic path), backed by the POC's implemented assurance checks for schema and evidence spans. Models on an already-supported provider path can be added through `backends.yaml`; a new provider family still requires an adapter and registry code.
* **Honest, Mixed Result:** On the contract eval-8 fair-mode runs, IR reached gold/near parity on some models, but on the hard distractor sets there was no clean IR win—`renewal`/`penalty` false positives became a shared failure family across both IR and baseline. I reported this directly rather than cherry-picking favorable runs.
* **What the Failure Pointed To:** The inconclusive benchmark reframed the real lever: the next-phase value is not the lowering step alone but self-verification loops, critic roles, and convergence logic—explicitly kept out of current scope. The role compiler likewise stayed a deterministic draft generator rather than a full semantic compiler.

</details>

### Constraint-search research series

- **[HW-WFC](https://github.com/entangelk/hw-wfc):** Matched Exact DP on a synthetic benchmark. Average correlation ρ=+0.52 with measured GPU timing is directional evidence, not production superiority. Research concluded at the hardware cost-model calibration boundary.
- **[Circle-WFC](https://github.com/entangelk/circle-wfc):** Early simple-map results did not hold on complex topology. Stopped the standalone-pathfinder goal; corridor proposals before A*/JPS remain an unverified follow-up hypothesis.
- **[T-WFC](https://github.com/entangelk/T-WFC):** Tested a toy MLP with five discrete weight values. Matched the baseline on linear data but observed worse performance and search cost on the tested XOR/Spiral configurations. This does not prove discrete learning fundamentally impossible.

### Q-PSA · Stopped

[GitHub](https://github.com/entangelk/Q-PSA_Pr)

Inspired by WFC but implemented perturbation analysis, without WFC collapse/propagation. Removing the bottom-ranked layer on Qwen2.5-0.5B Q4_K_M raised PPL 3.65× versus 1.05× for Layer Ablation. Scoring took 155 minutes versus 7 seconds (about 1,300× slower), so the project stopped. Local sensitivity failed as a proxy for pruning importance in this experiment.
