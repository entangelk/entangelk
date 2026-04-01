<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-6B7280?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-111111?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# 안녕하세요, entangelk입니다

> **제약 조건 기반 AI & 자동화 엔지니어**  
> 저는 실제 운영 환경에서 기획, 운영, 데이터 기반 문제 해결 업무로 시작했습니다.  
> 시간이 지나면서 필요한 도구와 시스템을 직접 만들기 시작했고, 점점 엔지니어링에 더 가까워졌습니다.  
> 지금은 지연 시간, 비용, 메모리 한계, 불완전한 연동 환경 같은 현실적인 제약 속에서 실제 문제를 해결하는 AI 시스템, 자동화 워크플로우, 데이터 파이프라인 구축에 집중하고 있습니다.

*"기억은 로그가 아니다. 기억은 압축된 의미다."*

## Background → Current Focus

**배경**  
실제 운영 환경에서의 기획, 운영, 사업 기획, 데이터 분석 경험.

**현재 집중 분야**  
운영 마찰을 줄이고, 모호한 문제를 실제 동작하는 시스템으로 바꾸는 실용적인 AI 시스템, 자동화 워크플로우, 데이터 파이프라인 구축.

## 왜 엔지니어링인가

저는 모호한 운영/비즈니스 문제를 직접 동작하는 해결책으로 바꾸는 방식에서 가장 강점을 발휘합니다.  
조율이나 기획에만 머무르기보다, 직접 도구를 만들고, 워크플로우를 자동화하고, 실제 환경에서 시스템을 검증하는 쪽이 더 잘 맞습니다.

제 엔지니어링 방식은 다음의 배경에서 만들어졌습니다:
- 실제 비즈니스 환경에서 얻은 제품/운영 감각
- 데이터 분석 업무에서 다져진 데이터 기반 사고
- 자동화, 백엔드 연동, AI 활용 구현을 통한 직접적인 문제 해결 경험

## 핵심 철학

- **Production First:** AI 시스템을 단순 모델 데모가 아니라 실제 운영 시스템으로 다룹니다.
- **Embrace Constraints:** 정확도만이 아니라 비용, 안정성, 연동 마찰까지 함께 최적화합니다.
- **Build What Works:** 그럴듯하지만 취약한 구조보다, 실제 병목을 줄이는 실용적인 해결책을 선호합니다.
- **Learn from Limits:** 실패, 트레이드오프, 한계를 구조화된 회고와 더 나은 시스템 설계로 바꿉니다.

## Selected Practical Work

- 새로운 플랫폼 작업을 요청하는 대신, 기존 CMS/API를 재활용해 내부 자동화 워크플로우를 구축했습니다.
- Docker와 Swagger를 포함한 NLP 분류 마이크로서비스를 구현해 낮은 연동 마찰로 제공했습니다.
- Lazy Loading과 브라우저 캐싱을 통해 대규모 CSR 리뷰 워크플로우의 병목을 개선했습니다.
- 기획, 운영, 분석, 구현 레이어를 모두 경험하며 비즈니스 요구와 실제 동작하는 시스템 사이의 간극을 줄여왔습니다.

## 프로젝트

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)**  
  MongoDB를 State of Truth로, 벡터 캐시를 검색 계층으로 분리한 MCP 기반 장기 기억 아키텍처.  
  `Focus:` 일관성, 검색 효율, 기억 압축.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)**  
  Grounding DINO, SAM, OCR 앵커링, 픽셀 단위 후처리를 결합한 zero-shot 로고 추출 파이프라인.  
  `Focus:` 지도학습 없이도 견고하게 동작하는 추출 시스템.

## 실험

- ⚡ **[HW-WFC v2.9](https://github.com/entangelk/hw-wfc)**  
  제약 조건 기반 AI 컴파일러 스케줄링 R&D.  
  `Result:` Exact DP 최적해를 재현했고, 실제 병목이 하드웨어 기반 비용 모델 보정이라는 점을 드러냈습니다.

## 실패한 실험과 포스트모템

- 🧪 **[Q-PSA](https://github.com/entangelk/Q-PSA_Pr)**  
  GGUF LLM을 위한 양자화 perturbation 민감도 분석.  
  `Result:` pruning 중요도를 예측하지 못했고, baseline 대비 약 1300배 느렸습니다.  
  `Insight:` 이산 perturbation은 의미 있는 중요도 지표와 같지 않았습니다.

- 🗺️ **[Circle-WFC](https://github.com/entangelk/circle-wfc)**
  다층 제약 구조(MLMC)를 활용한 geometry 기반 WFC 실험 
  `Result:` A* 같은 일반적인 경로 탐색 알고리즘을 대체하기엔 비효율적이지만, 절차적 생성에서 유효한 경로 존재를 보장하는 데는 성공했습니다.
  `Insight:` 계층적 제약 구조를 통해 로컬 타일 기반 시스템에서도 전역적인 논리적 일관성(예: 경로 존재)을 강제할 수 있었습니다.

- 🧠 **[T-WFC](https://github.com/entangelk/T-WFC)**  
  모델 학습을 gradient descent가 아닌 이산 상태 붕괴 과정(WFC)으로 재해석한 실험
  `Result:` 고차원 데이터에서는 비효율적이지만, 탐색 공간 축소 및 패턴 생성 프로토타입으로는 유의미한 가능성 확인했습니다.
  `Insight:` 제약 기반 접근은 gradient 없이도 구조화된 환경에서 의사결정 경계를 형성할 수 있는 새로운 패러다임을 확인하였습니다.

## 현재 만들고 있는 것들

- **🎓 ADIGA College Admission Data Pipeline**  
  200개 이상의 기관에서 복잡한 HTML 데이터를 추출하고 정규화하는 파이프라인.  
  `Result so far:` hallucination 제어형 LLM 워크플로우를 통해 noisy HTML 환경에서 schema violation rate를 낮추고 있습니다.

- **🛡️ Multi-Agent DevSecOps Web Vulnerability Scanner**  
  Playwright 기반 에이전트와 토큰 최적화를 활용한 CI/CD 연동 보안 플랫폼.

## 엔지니어링 노트

트러블슈팅, 아키텍처 결정, 트레이드오프, 프로젝트 맥락에 대한 더 긴 기록은 아래에서 볼 수 있습니다.  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## 연락처

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)