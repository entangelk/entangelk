<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# 안녕하세요, entangelk입니다

시간, 비용, 메모리, 복잡한 연동 경계 같은 현실 제약 안에서 버티는 데이터/AI 시스템을 만듭니다.

이 프로필에는 크게 세 가지를 남깁니다. 직접 만든 프로젝트, 검증까지 밀어붙인 실험, 그리고 실패했더라도 끝까지 한계를 규명한 포스트모텀입니다.

> "Memory is not a log. Memory is compacted meaning."

## 여기서 다루는 것

* 프로덕션 제약을 전제로 한 데이터/AI 엔지니어링
* MCP, 비전, 자동화처럼 독립된 저장소로 공개할 수 있는 일반 프로젝트
* 기억, 탐색, 제약 기반 시스템에 대한 R&D 기록
* 실패와 한계를 숨기지 않고 남기는 엔지니어링 포스트모텀

## Projects

* 🧠 **[AI 에이전트 장기 기억 시스템](https://github.com/entangelk/agent-memory-system-public):** MongoDB를 State of Truth, Vector Cache를 검색 계층으로 분리한 MCP 기반 장기 기억 아키텍처입니다.
* 🎯 **[자동화된 브랜드 로고 추출 파이프라인](https://github.com/entangelk/logo_image):** Grounding DINO, SAM, OCR 앵커링, 픽셀 단위 후처리를 결합한 zero-shot 로고 추출 파이프라인입니다.

## Experiments

* ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc):** 제약 기반 AI 컴파일러 스케줄링 R&D입니다. `결과:` Exact DP와 동일한 최적해를 확인했고, 실제 병목이 하드웨어 기반 비용 모델 보정임을 드러냈습니다.

## Failed Experiments & Post-Mortems

* 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr):** GGUF 기반 양자화 LLM에서 discrete perturbation만으로 gradient 없이 레이어 중요도를 측정할 수 있는지 검증한 실험입니다. `결과:` 민감도는 pruning 중요도를 설명하지 못했고, 단순 Layer Ablation보다 약 1,300배 느려 폐기했습니다.
* 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc):** 기하학 기반 WFC 경로탐색 실험입니다. `결과:` 범용 최단경로 탐색기로는 실패했고, 전역 탐색 이전의 탐색 공간 축소기로서 의미를 확인했습니다.
* 👁️ **[T-WFC](https://github.com/entangelk/T-WFC):** 이산 상태 붕괴 기반의 gradient-free 신경망 실험입니다. `결과:` 선형 문제에서는 PoC가 성립했지만, 비선형 문제에서는 스케일업에 실패했습니다.

### 🌱 [진행 중인 사이드 프로젝트 (Currently Building)]

* **🎓 전국 대입 정보(ADIGA) AI 합격 분석 및 데이터 파이프라인:** 218개 대학의 복잡한 비정형 입시 HTML 데이터를 파싱하여 정규화(Normalization)하고, Groq LLM을 연동해 환각(Hallucination)이 통제된 구조화된 형태(Strict JSON)의 맞춤형 합격 분석 리포트를 제공하는 서비스 구축 중.
* **🛡️ 멀티 에이전트 기반 웹 보안 점검 DevSecOps 플랫폼:** 단순 URL 스캐닝을 넘어 Playwright 기반 에이전트가 인증 이후(Authenticated)의 상태를 탐색하고, LLM 토큰 최적화를 위한 데이터 정제 및 인간 개입(HITL) 통제 엔진을 포함한 CI/CD 연동형 보안 플랫폼 설계 중.
* **🎮 개인 인디 게임 개발 (On Hold):** html기반 embeding + sLM을 사용한 자연어 기반 게임. 잠시 홀딩 중이나, 복잡한 상태 관리와 시스템 최적화를 테스트해 보기 위해 기획 및 개발을 진행 중인 개인 힐링(?) 프로젝트.

## 실무 프로젝트 요약

* `BGE-m3` 기반 NLP 카테고리 분류 마이크로서비스를 Docker와 Swagger로 패키징해 낮은 마찰로 연동
* WSL 제약과 CSR 병목을 고려해 22,000+ 에셋 생성 및 검수 파이프라인 최적화
* 새로운 플랫폼 작업 요청 대신 기존 CMS/API 표면을 재활용해 사내 자동화 워크플로 구축
* 단일 접속 VPN 병목을 완화하는 경량 Python 유틸리티 제작

## 상세 엔지니어링 문서

트러블슈팅, 아키텍처 의사결정, 프로젝트별 맥락은 아래 문서에 정리해두었습니다.

👉 **[상세 포트폴리오 및 기술 문서 보기 (PROJECTS.ko.md)](./PROJECTS.ko.md)**

## Contact

📫 **Contact:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com) | [LinkedIn](https://www.linkedin.com/in/%EC%9A%94%ED%95%9C-%EB%B0%95-b4a06a3b3/)
