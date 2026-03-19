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

### 🗺️ 기하학 기반 경로 탐색 알고리즘의 한계 규명 (Circle-WFC)
*전통적인 A* 탐색을 대체하기 위한 기하학 기반 WFC 경로 탐색 R&D 및 포스트모텀. [🔗 GitHub Repo](https://github.com/entangelk/circle-wfc)*

* **Hypothesis & Early Wins:** WFC(Wave Function Collapse) 알고리즘을 타일이 아닌 기하학적 위상(Circle layers)에 적용하여 A*를 대체하고자 했습니다. 초기 단순 맵에서는 A*보다 압도적으로 빠르고 메모리 효율이 높음을 확인했습니다.
* **Root Cause Analysis (한계 분석):** 복잡한 미로 환경에서 성능이 급감하는 현상을 디버깅한 결과, 근본적인 구조적 모순을 발견했습니다. WFC는 '국소적 일관성(Local consistency)'을 맞추는 데 최적화되어 있으나, 경로 탐색은 '전역적 연결성(Global connectivity)'이 필수적입니다. 즉, 조기 결정(Early commitment)을 내리는 WFC의 특성이 복잡한 위상학적 탐색과는 맞지 않음을 수치와 로그로 증명했습니다.
* **Conclusion:** Circle-WFC를 범용 경로 탐색기로 사용하는 것은 부적합하다는 명확한 결론을 내렸습니다. 대신, A*와 같은 전역 탐색기가 작동하기 전 후보 영역을 극단적으로 좁혀주는 **'탐색 공간 축소기(Search Space Reducer)'** 및 하이브리드 전처리 모듈로서의 새로운 활용 가치를 도출했습니다.

### 👁️ Gradient-free 신경망 프로토타입 (T-WFC)
*역전파 없는 이산값(Discrete) 기반의 신경망 학습 프로토타입 설계 및 한계 분석. [🔗 GitHub Repo](https://github.com/entangelk/T-WFC)*

* **Discrete State Collapse:** 모델 학습의 정석인 역전파(Backpropagation)에 의존하지 않고, 5개의 이산값(`{-1, -0.5, 0, 0.5, 1}`)에 대한 상태 붕괴(State collapse) 방식만으로 장난감 신경망(Toy MLP)을 학습시키는 데 성공하며 PoC(Proof of Concept)를 완료했습니다. 선형 분리 문제에서는 SGD와 동일한 100%의 정확도를 달성했습니다.
* **Scaling Limits (한계 분석):** XOR이나 Spiral 같은 비선형 문제에 도입 시, 5개의 이산값 조합만으로는 결정 경계(Decision boundary)를 형성하는 표현력이 턱없이 부족함을 확인했습니다. 또한, 파라미터가 증가함에 따라 메모리와 탐색 시간이 기하급수적으로 폭발하여 신경망의 고차원적/비국소적 상호작용을 처리하는 데는 치명적인 한계가 있음을 입증했습니다.
* **Conclusion:** WFC 기반 학습은 딥러닝 스케일업에는 부적합하지만, 극단적인 저전력 엣지 디바이스 환경에서의 **저비트 양자화(Low-bit quantization)** 대안이나 국소적 연결성을 가진 아키텍처(CNN 등)에서의 후속 연구 가능성을 남겼습니다.

---
<p align="center">
  <a href="./README.ko.md">⬅️ 메인 프로필로 돌아가기</a>
</p>
