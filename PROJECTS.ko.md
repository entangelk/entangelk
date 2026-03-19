<p align="center">
  <a href="./README.ko.md">⬅️ 메인 프로필로 돌아가기</a> | <a href="./PROJECTS.md">🇺🇸 Read in English</a>
</p>

# 🛠️ 상세 포트폴리오 및 기술 문서 (Engineering Notes)

이 문서는 제가 진행한 주요 실무 및 개인 프로젝트의 **문제 상황(Context), 트러블슈팅 과정, 그리고 아키텍처 설계의 의도**를 담고 있습니다. 
단순히 기술을 나열하는 것을 넘어, **'비즈니스 요구사항을 충족하기 위한 실용적인 문제 해결'**과 **'오버엔지니어링 방지'**에 집중한 엔지니어링 고민들을 기록했습니다.

---

## 💼 실무 프로젝트 (Corporate Projects)

### 🧠 실 서비스 적용 NLP 카테고리 분류 마이크로서비스
*상용 서비스 환경에서 자연어 사용자 입력을 사내 DB 카테고리와 매칭하는 AI 마이크로서비스 모듈.*

* **Semantic Search Pipeline:** `BGE-m3` 임베딩 및 리랭킹 모델을 도입하여 정적인 카테고리 데이터와 사용자 자연어 입력 간의 매칭 정확도를 극대화한 의미론적 검색 파이프라인을 구축했습니다.
* **Frictionless Integration (무마찰 통합):** 코어 백엔드 개발팀의 추가 리소스 소모를 막기 위해, 모듈을 **Docker** 컨테이너로 독립시키고 **Swagger API Docs**를 제공했습니다. 이를 통해 기존 백엔드 아키텍처의 수정 없이 라이브 서비스에 즉시 플러그인(Plug & Play) 할 수 있었습니다.

### 🖼️ 대규모 에셋 생성 및 검수 파이프라인
*서비스 리소스용 22,000+장 대규모 이미지 생성 및 검수 대시보드 구축 (엄격한 하드웨어 한계를 가진 단발성 프로젝트 최적화).*

* **Resource-Aware Architecture (동기식 설계):** 극도로 제한된 로컬 환경(WSL)에서 구동해야 하는 단발성 프로젝트였습니다. 무거운 DB나 메시지 큐(MQ)를 도입하는 오버엔지니어링을 철저히 배제하고, 파일 시스템 기반의 동기식(Sync) 파이프라인을 설계했습니다. 흥미롭게도 물리적인 하드웨어 I/O 한계가 자연스럽게 API Rate Limiter 역할을 해주어, 별도의 지연 로직 없이도 안정적인 대량 생성이 가능했습니다.
* **CSR Load Optimization:** 2만여 개의 메타데이터를 클라이언트(CSR)에서 렌더링할 때 5분 이상이 소요되는 심각한 병목이 발생했습니다. 이를 해결하기 위해 **Lazy Loading**과 **브라우저 캐싱(Browser Caching)**을 선제적으로 도입하여 대시보드 로딩 시간을 즉각적인 수준으로 단축했습니다.
* **Model Scaling:** 로컬에서 **Flux** 모델을 구동하여 프롬프트 엔지니어링 및 PoC를 진행한 후, 대량 양산의 속도와 안정성을 확보하기 위해 클라우드 기반의 **Gemini API (Flash Image / Nano Banana 2)**로 파이프라인을 매끄럽게 전환했습니다.

### ⚙️ 사내 자원 재활용(Zero-Overhead) 자동화 파이프라인
*산재된 사내 정적 데이터를 수집하고 알림을 발송하는 사내망 전용 자동화 허브.*

* **Zero Core-Dev Intervention:** 사내 보안 정책상 외부 클라우드 DB에 직접 접근할 수 없는 상황이었습니다. 타 개발팀에 새로운 API를 요청하는 대신, 사내 CMS를 리버스 엔지니어링 및 크롤링하고 기존에 존재하던 레거시 API(이메일/SMS 발송 등)를 재활용하여 코어 개발팀의 리소스 소모(Zero Overhead) 없이 파이프라인을 완성했습니다.
* **Secure Closed-Network Execution:** 외부 포트 포워딩을 전면 차단하고, 스크립트가 철저히 폐쇄된 사내망 내부에서만 동작하도록 설계했습니다. 기존 모듈의 보안 인증을 그대로 상속받아 사내 보안 리스크를 원천 차단했습니다.

### 🔧 경량 사내망 네트워크 유틸리티
*단일 접속만 허용되는 사내 VPN 병목을 해결하기 위한 포트 연결 스크립트.*

* **Impact:** 엄격한 사내 VPN 보안 정책으로 인해 다중 접속이 차단되어 업무 흐름이 자주 끊기는 병목 현상이 있었습니다. 이를 우회하기 위해 파이썬 기반의 단순하고 가벼운 포트 연결 스크립트(Utility)를 자체 개발 및 사내에 배포하였고, 팀원들이 최소한의 세팅만으로 안정적인 다중 연결을 유지하게 만들어 팀 생산성을 크게 향상시켰습니다.

---

## 🔥 개인 R&D 프로젝트 (Personal & R&D Projects)

### 🎯 자동화된 브랜드 로고 추출 파이프라인 (Test Lab)
*물리적인 간판 이미지에서 브랜드 로고와 타이틀을 고품질로 자동 추출하는 Zero-shot Segmentation 파이프라인 및 R&D 대시보드.*

* **Automated Anchoring:** **SAM (Segment Anything)**의 수동 프롬프트 입력을 자동화하기 위해, **Grounding DINO** (Text-to-Bbox)와 OCR/Contour 하이브리드 방식을 결합하여 전경/배경(FG/BG) 앵커 포인트를 자동으로 생성하는 로직을 구현했습니다.
* **Vision Post-processing:** AI가 분리한 원시 마스크(Raw Mask)는 상용으로 쓰기엔 한계가 있습니다. 이를 해결하기 위해 **Dehalo**(빛번짐 제거), **Color Decontamination**(색상 오염 제거), **Edge Feathering** 등 픽셀 단위의 퀄리티 튜닝 파이프라인을 직접 설계하고 구현했습니다.
* **R&D Test Lab (FastAPI):** AutoMask 파라미터(IoU 컷오프, 포인트 밀도 등)를 직관적으로 튜닝하고, 처리 전/후의 Metrics(Sharpness, Noise Level)를 시각화하여 객관적으로 모델 성능을 평가할 수 있는 웹 기반 검증 인터페이스를 개발했습니다.

### 🧠 AI 에이전트 장기 기억(Memory) 시스템
*AI 어시스턴트를 위한 MCP 기반의 장기 기억 아키텍처. [🔗 GitHub Repo](https://github.com/entangelk/agent-memory-system-public)*

* **Separation of Concerns:** "기억은 단순한 로그가 아니라 압축된 의미망이다"라는 철학을 시스템으로 구현했습니다. 진실의 공급원(State of Truth) 역할을 하는 **MongoDB**와, 문맥의 의미론적 검색을 담당하는 Vector Cache인 **ChromaDB**를 엄격하게 분리하여 영구적이고 논리적인 기억 아키텍처를 설계했습니다.

### 🗺️ 기하학 기반 경로 탐색 알고리즘 (Circle-WFC)
*전통적인 A* 탐색의 위상학적 한계를 극복하기 위한 경로 탐색 R&D. [🔗 GitHub Repo](https://github.com/entangelk/circle-wfc)*

* **Geometry-based Pathfinding:** WFC(Wave Function Collapse) 알고리즘을 타일 그리드가 아닌 기하학적 위상에 적용할 수 있도록 구조를 재설계하여, 더 복잡하고 유연한 경로 탐색이 가능하도록 구현했습니다.

### 👁️ Gradient-free 신경망 프로토타입 (T-WFC)
*역전파 없는 새로운 형태의 신경망 학습 프로토타입 설계. [🔗 GitHub Repo](https://github.com/entangelk/T-WFC)*

* **Discrete State Collapse:** PyTorch의 텐서 연산을 '수학적 도구'로 활용하여, 모델 학습의 정석인 역전파(Backpropagation)에 의존하지 않고 이산 상태 붕괴(Discrete state collapse) 방식을 통해 자체적인 데이터 분류 경계를 형성하는 구조를 증명했습니다.

### ⚡ AI 컴파일러 자동 스케줄러 (HW-WFC v2.0)
*하드웨어 최적화를 위한 제약 기반 자동 스케줄링 R&D. [🔗 GitHub Repo](https://github.com/entangelk/hw-wfc)*

* **Constraint-driven Auto-Scheduling:** 무차별 대입 방식의 한계를 넘기 위해 제약 기반 탐색(Constraint-driven search) 알고리즘을 AI 컴파일러 스케줄러에 도입했습니다. 결과적으로 기존 Grid Search 대비 탐색 공간을 98.5% 축소하고 **약 2400배의 속도 향상**을 달성했습니다.

---
<p align="center">
  <a href="./README.ko.md">⬅️ 메인 프로필로 돌아가기</a>
</p>
