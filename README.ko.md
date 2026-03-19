<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# Greetings!👋 I'm a Data & AI Engineer 🚀

데이터 분석가(DA)로 시작해, 현재는 데이터의 흐름과 시스템 아키텍처 사이의 간극을 메우는 **Data & AI Engineer**입니다. 
단순한 API 호출을 넘어, 비즈니스의 엄격한 제약 조건(리소스, 시간, 비용) 안에서 가장 실용적이고 단단한 파이프라인을 구축하는 데 집중합니다. 오버엔지니어링을 철저히 경계하며, AI 모델(LLM, Vision)을 맹목적인 '목표'가 아닌, 현실의 문제를 해결하기 위한 강력한 '도구'로 활용합니다.

### 💡 My Philosophy
> "Memory is not a log. Memory is compacted meaning." 
> 시스템은 비즈니스의 철학을 반영해야 하며, 코드는 그 철학을 강제하는 가장 우아한 통제 수단입니다.

---

### 🛠️ Practical Arsenal

* **Core Logic & Prototyping:** Python, Pandas, Jupyter Notebook
* **AI Engineering (LLM & Vision):**
  * *Proprietary:* GPT-5.2, Claude 4.6, Gemini 3.1
  * *Open-Source:* Qwen2.5, Llama 3 (llama.cpp 양자화), BGE-m3 (임베딩/리랭킹), Flux, SAM, Grounding DINO
* **Backend & System:** FastAPI (Swagger 기반 API 설계), MongoDB, ChromaDB, Docker

---

### 💼 Work Experience / Corporate Projects

#### 🧠 실 서비스 적용 NLP 카테고리 분류 마이크로서비스
* **Description:** 상용 서비스 환경에서 자연어 사용자 입력을 사내 DB 카테고리와 매칭하는 AI 마이크로서비스 모듈 개발 및 배포.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Embedding & Reranking:** `BGE-m3` 임베딩 및 리랭킹 모델을 활용해 고도의 의미론적 검색(Semantic Search) 파이프라인 구축.
* **Frictionless Integration:** 모듈을 **Docker** 컨테이너로 빌드하고 **Swagger API Docs**를 제공하여, 코어 백엔드 개발팀과 마찰 없는 매끄러운 통합 및 라이브 서비스 적용 완료.
</details>

#### 🖼️ 대규모 에셋 생성 및 검수 파이프라인
* **Description:** 서비스 리소스용 22,000+장 대규모 이미지 생성 및 검수 대시보드 구축 (엄격한 하드웨어 한계를 가진 단발성 프로젝트 최적화).
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Resource-Aware Architecture:** 제한된 로컬 환경(WSL)에 맞춰 오버엔지니어링(DB/MQ)을 배제하고 파일 시스템 기반의 동기식(Sync) 파이프라인 설계. 하드웨어 I/O 한계를 자연스러운 API Rate Limiter로 역활용.
* **CSR Load Optimization:** 2만여 개의 메타데이터 렌더링 시 발생하는 병목(기존 5분 이상 소요)을 **Lazy Loading** 및 **브라우저 캐싱**으로 해결하여 검수 페이지 성능 대폭 개선.
* **Model Scaling:** 로컬에서 **Flux** 모델로 프롬프트 PoC 진행 후, 대량 양산을 위해 **Gemini API (Flash Image)**로 파이프라인 전환 및 스케일업.
</details>

#### ⚙️ 사내 자원 재활용(Zero-Overhead) 자동화 파이프라인
* **Description:** 산재된 사내 정적 데이터(보고서, 휴가 등)를 수집하여 알림을 발송하는 사내망 전용 자동화 허브 구축.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Zero Core-Dev Intervention:** 외부 클라우드 DB 접근 불가라는 보안 제약을 우회하기 위해 사내 CMS를 크롤링 및 파싱. 기존에 존재하던 레거시 API(이메일/SMS 발송 모듈 등)를 재활용하여 코어 개발팀의 추가 리소스 소모 없이 파이프라인 완성.
* **Secure Closed-Network Execution:** 외부 포트 포워딩을 전면 차단하고 기존 모듈의 보안 인증을 상속받는 폐쇄망 전용 구조로 설계하여 사내 보안 리스크 원천 차단.
</details>

#### 🔧 경량 사내망 네트워크 유틸리티
* **Description:** 단일 접속만 허용되는 사내 VPN 병목을 해결하기 위한 파이썬 기반의 단순 포트 연결 스크립트.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Impact:** 엄격한 사내 VPN 정책으로 인한 업무 흐름 단절을 해소하고, 최소한의 세팅으로 팀원들이 안정적인 다중 보안 연결을 유지할 수 있도록 지원하여 팀 생산성 향상.
</details>

---

### 🔥 Personal & R&D Projects

#### 🎯 자동화된 브랜드 로고 추출 파이프라인 (Test Lab)
* **Description:** 물리적인 간판 이미지에서 브랜드 로고와 타이틀을 고품질로 자동 추출하는 Zero-shot Segmentation 파이프라인 및 R&D 대시보드 개발.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Automated Anchoring:** **Grounding DINO**와 OCR/Contour 하이브리드 방식을 결합하여 **SAM(Segment Anything)**의 입력 프롬프트를 자동화.
* **Vision Post-processing:** 이미지 상용화를 위해 Dehalo(빛번짐 제거), Color Decontamination(색상 오염 제거), Edge Feathering 등 픽셀 단위 퀄리티 튜닝 파이프라인 직접 구현.
* **R&D Test Lab (FastAPI):** 모델 파라미터 튜닝과 처리 전/후 Metrics(Sharpness, Noise)를 시각화하여 평가하는 웹 검증 인터페이스 개발.
</details>

#### 🧠 AI 에이전트 장기 기억(Memory) 시스템
* **Link:** [GitHub Repository](https://github.com/entangelk/agent-memory-system-public)
* **Description:** AI 어시스턴트를 위한 MCP 기반의 장기 기억 아키텍처.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* **Key Engineering:** 진실의 공급원(SoT)을 위한 MongoDB와 문맥 검색을 위한 Vector Cache(ChromaDB)를 엄격하게 분리하여 영구적이고 압축된 의미망 구축.
</details>

#### ⚡ WFC 알고리즘 최적화 및 AI 컴파일러 자동 스케줄러
* **Links:** [Circle-WFC](https://github.com/entangelk/circle-wfc) | [T-WFC](https://github.com/entangelk/T-WFC) | [HW-WFC v2.0](https://github.com/entangelk/hw-wfc)
* **Description:** WFC(Wave Function Collapse) 기반의 경로 탐색 알고리즘 및 AI 컴파일러 자동 스케줄러 R&D.
<details>
<summary><b>🛠️ 엔지니어링 디테일 보기</b></summary>

* 전통적인 A* 탐색의 위상학적 한계를 극복하기 위한 기하학 기반 WFC 설계.
* PyTorch의 텐서 연산을 활용한 역전파(Backprop) 없는 이산 상태 붕괴(Discrete state collapse) 분류 경계 형성 프로토타이핑.
* 제약 기반 자동 스케줄러를 통해 Grid Search 대비 **약 2400배 속도 향상** 및 탐색 공간 98.5% 축소.
</details>

---

📫 **Contact:** [kdtyohan@gmail.com] | [[LinkedIn](https://www.linkedin.com/in/%EC%9A%94%ED%95%9C-%EB%B0%95-b4a06a3b3/)]
