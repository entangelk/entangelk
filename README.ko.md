<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-111111?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-6B7280?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# 안녕하세요, entangelk입니다

> **Constraint-Driven AI Systems Engineer**
> 시간, 비용, 메모리, 불완전한 연동 환경 같은 현실의 제약 속에서 작동하는 데이터 및 AI 시스템을 설계하고 구축합니다.
> 이 곳은 제가 직접 만든 프로젝트, 검증을 마친 실험, 그리고 실패했더라도 그 한계를 명확히 규명한 포스트모텀(Post-mortem)의 기록입니다.

*"Memory is not a log. Memory is compacted meaning."*

## 🧠 핵심 철학 (Core Philosophy)
* **프로덕션 우선 (Production First):** AI 시스템을 통제된 벤치마크용 모델이 아닌, 실제 운영되는 시스템으로 취급합니다.
* **제약 조건 수용 (Embrace Constraints):** 단순한 정확도를 넘어 비용, 안정성, 연동 과정의 마찰을 최소화하는 방향으로 최적화합니다.
* **실패를 통한 학습 (Learn from Limits):** 실패를 숨기지 않고, 시스템을 진화시키기 위한 구조화된 피드백으로 전환합니다.

## ⚙️ Projects
* 🧠 **[AI 에이전트 장기 기억 시스템](https://github.com/entangelk/agent-memory-system-public):** MongoDB를 State of Truth로, Vector Cache를 검색 계층으로 분리한 MCP 기반 장기 기억 아키텍처입니다.
  * `Focus:` 데이터 정합성 유지, 검색 효율성, 그리고 메모리 압축(Compaction).
* 🎯 **[자동화된 브랜드 로고 추출 파이프라인](https://github.com/entangelk/logo_image):** Grounding DINO, SAM, OCR 앵커링, 픽셀 단위 후처리를 결합한 zero-shot 로고 추출 파이프라인입니다.
  * `Focus:` 지도 학습(Supervised training) 없이도 확보되는 파이프라인의 강건성(Robustness).

## 🧪 Experiments
* ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc):** 제약 기반 AI 컴파일러 스케줄링 R&D입니다. 
  * `Result:` Exact DP와 동일한 최적해를 확인했으며, 실제 병목이 하드웨어 기반 비용 모델 보정임을 규명했습니다.

## ❌ Failed Experiments & Post-Mortems
* 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr):** GGUF 기반 양자화 LLM에서 discrete perturbation만으로 gradient 없이 레이어 중요도를 측정할 수 있는지 검증한 실험입니다. 
  * `Result:` 단순 Layer Ablation보다 약 1,300배 느려 폐기. *Insight: 이산적 섭동(Discrete perturbation)은 유의미한 중요도 지표가 될 수 없음.*
* 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc):** 기하학 기반 WFC 경로탐색 실험입니다. 
  * `Result:` 범용 최단경로 탐색기로는 실패했으나, 전역 탐색 이전의 탐색 공간 축소기(Search space reducer)로서의 유용성을 확인했습니다.
* 👁️ **[T-WFC](https://github.com/entangelk/T-WFC):** 이산 상태 붕괴 기반의 gradient-free 신경망 실험입니다. 
  * `Result:` 선형 문제에서는 PoC가 성립했지만, 비선형 문제에서는 스케일업에 실패했습니다.

### 🌱 [진행 중인 사이드 프로젝트 (Currently Building)]
* **🎓 전국 대입 정보(ADIGA) AI 합격 분석 및 데이터 파이프라인:** 218개 대학의 복잡한 비정형 입시 HTML 데이터를 파싱하여 정규화하고, Groq LLM을 연동해 구조화된 형태(Strict JSON)의 맞춤형 분석 리포트를 제공합니다.
  * `현재 성과:` 노이즈가 심한 HTML 환경에서 환각(Hallucination)이 통제된 파이프라인을 구축해 스키마 위반율을 약 35% 감소시켰습니다.
* **🛡️ 멀티 에이전트 기반 웹 보안 점검 DevSecOps 플랫폼:** 단순 URL 스캐닝을 넘어 Playwright 기반 에이전트가 인증 이후(Authenticated)의 상태를 탐색하며, LLM 토큰 최적화를 위한 데이터 정제 및 인간 개입(HITL) 통제 엔진을 포함한 보안 플랫폼을 설계 중입니다.
* **🎮 개인 인디 게임 개발 (On Hold):** HTML 기반 임베딩과 sLM을 사용한 자연어 기반 게임. 복잡한 상태 관리와 시스템 최적화를 테스트