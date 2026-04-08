<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-6B7280?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-111111?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# 안녕하세요, entangelk입니다

> **AI Product Builder**  
> 저는 아이디어가 실제 비즈니스 환경에서도 작동하는지 검증하기 위해 AI 프로토타입, 자동화 워크플로우, 서비스 컨셉을 직접 만듭니다.  
> 제 커리어는 운영, 사업기획, 데이터 분석에서 시작했습니다. 그 과정에서 모호한 비즈니스 요구와 기술적 현실 사이의 간극에 계속 부딪혔고, 그 간극을 직접 메우기 위해 시스템을 만들기 시작했습니다.  
> 지금은 불분명한 요구사항을 검증 가능한 PoC, 구조화된 실험, 그리고 현실 제약에 기반한 명확한 Go / Drop 판단으로 바꾸는 일에 집중하고 있습니다.

*"기억은 로그가 아니다. 기억은 압축된 의미다."*

## Why I Build (만들면서 배우는 이유)

저는 저수준 최적화를 다루거나 수학적 원리를 처음부터 증명하는 핵심 AI 연구자는 아닙니다.  
대신 저의 강점은 **실행력, 구조화된 실험, 그리고 제품 관점의 기술적 사고**에 있습니다.

비즈니스 병목을 마주하면, 기존 모델·API·알고리즘을 조합해 아이디어가 실제 제약 조건 안에서 성립하는지 먼저 검증합니다.  
저는 만들기 위해서만 만드는 것이 아니라, 구조적 한계를 드러내기 위해 만들고, 그 결과를 바탕으로 반복할지, 피벗할지, 확장할지, 멈출지를 판단합니다.

## Core Philosophy

- **Build to Validate:** 아이디어가 실제 비즈니스 제약을 견딜 수 있는지 검증하기 위해 프로토타입과 워크플로우를 만듭니다.
- **Production-Aware Thinking:** AI 시스템을 단순 데모가 아니라 비용, 안정성, 운영 마찰까지 고려해야 하는 서비스로 봅니다.
- **Data-Driven Decisions:** 시스템이 측정 가능한 결과로 가치를 입증하지 못하면, 실패를 기록하고 다음 판단으로 넘어갑니다.
- **Learn from Limits:** 실패한 실험, 트레이드오프, 막다른 길 역시 더 나은 시스템 설계를 위한 중요한 입력이라고 생각합니다.

## What I Work With

- AI Proof-of-Concepts (PoCs)
- Automation Workflows
- LLM Application Prototyping
- Data Pipelines
- Technical Feasibility Validation
- Product-Oriented Experiment Design

## 🏗️ 주요 아키텍처 & PoC

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)**  
  MCP 기반 장기 메모리 아키텍처입니다.  
  `Architecture:` 일관성과 메모리 압축을 위해 State of Truth(MongoDB)와 semantic retrieval layer(ChromaDB)를 분리했습니다.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)**  
  Grounding DINO, SAM, 그리고 커스텀 후처리를 결합한 zero-shot 로고 추출 파이프라인입니다.  
  `Focus:` 지도 학습 데이터 없이도 동작하는 견고한 파이프라인 구축에 집중했습니다.

## 📊 R&D, 실패한 실험, 그리고 포스트모템

*저는 성공한 결과만큼이나 실패한 실험에서 얻은 교훈도 중요하게 생각합니다. 아래 프로젝트들은 아키텍처 가설을 검증하고, 실현 가능성을 판단하며, 데이터 기반으로 결정을 내린 사례들입니다.*

- 🧪 **[Q-PSA (Project Killed)](https://github.com/entangelk/Q-PSA_Pr)**  
  양자화된 LLM에서 레이어 중요도를 추정하기 위해 discrete perturbation 방식을 실험했습니다.  
  `Decision:` 실험 결과, 베이스라인 대비 약 1300배 느리고 pruning validation에도 실패해 프로젝트를 종료했습니다.

- 🗺️ **[Circle-WFC (Architectural Pivot)](https://github.com/entangelk/circle-wfc)**  
  `A*` pathfinding을 geometry-guided Wave Function Collapse(WFC)로 대체하려는 시도였습니다.  
  `Insight:` 전역 경로 탐색 문제에서 local consistency의 구조적 한계를 발견했고, 이후 이 개념의 가치를 효율적인 search space reducer로 재정의했습니다.

- ⚡ **[HW-WFC v2.9 (Feasibility Validated)](https://github.com/entangelk/hw-wfc)**  
  제약 기반 AI compiler scheduling R&D입니다.  
  `Result:` Exact DP의 최적값과 일치해 알고리즘적 실현 가능성은 입증했지만, 실제 프로덕션 병목이 하드웨어 기반 cost-model calibration에 있다는 점을 확인하고 연구를 마무리했습니다.

## Currently Building & Exploring

- **🎓 ADIGA College Admission Data Pipeline**  
  200개 이상의 기관에서 복잡한 HTML 데이터를 추출하고 정규화하는 작업입니다.  
  `Result so far:` hallucination을 제어한 LLM 워크플로우를 통해 noisy HTML 입력 환경에서도 schema violation 비율을 낮추고 있습니다.

## Notes

트러블슈팅, 아키텍처 의사결정, 트레이드오프, 프로젝트 맥락에 대한 더 긴 글은 아래에서 볼 수 있습니다.  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## Contact

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)