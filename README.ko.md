<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/Language-EN-6B7280?style=for-the-badge" alt="English"></a>
  <a href="./README.ko.md"><img src="https://img.shields.io/badge/Language-KO-111111?style=for-the-badge" alt="한국어"></a>
</p>
<p align="center"><sub>Switch language / 언어 전환</sub></p>

# 안녕하세요, entangelk입니다

> **Technical AI Product Manager & Service Architect** > "저는 기획서만 쓰지 않습니다. 이를 증명하기 위해 직접 프로토타입을 만듭니다."  
> 저는 운영, 사업 기획, 데이터를 다루며 커리어를 시작했습니다. 모호한 비즈니스 요구사항과 기술적 현실 사이의 간극이 답답해, 직접 AI 아키텍처와 자동화 워크플로우를 구축하기 시작했습니다.  
> 지금은 AI 서비스를 기획하고, 실제 동작하는지 검증(PoC)하며, 데이터를 바탕으로 현실적인 제약 속에서 기술적인 "Go/Drop" 의사결정을 내리는 데 집중하고 있습니다.

*"기억은 로그가 아니다. 기억은 압축된 의미다."*

## Why I Build (직접 만들며 검증하는 이유)

저는 메모리를 최적화하거나 수학 공식을 밑바닥부터 유도하는 정통 AI 코어 엔지니어가 아닙니다. 제 무기는 **'실행력'과 '아키텍처 설계'**입니다. 비즈니스 병목에 직면하면, 저는 기존 모델, API, 알고리즘을 결합하여 이 아이디어가 제약이 많은 실제 환경에서 동작하는지(Feasibility) 테스트합니다. 구조적 한계를 찾기 위해 직접 코드를 짜고, 데이터를 통해 객관적으로 프로젝트의 피벗(Pivot), 스케일업, 또는 폐기(Kill)를 결정합니다.

## Core Philosophy

- **Production First:** AI 시스템을 단순 모델 데모가 아니라 실제 운영 시스템으로 다룹니다.
- **Embrace Constraints:** 정확도만이 아니라 비용, 안정성, 연동 마찰까지 함께 최적화합니다.
- **Data-Driven Decisions:** 속도, 성공률 등의 지표로 가치를 증명하지 못하는 시스템은 실패를 객관적으로 기록하고 과감히 폐기(Kill)합니다.
- **Learn from Limits:** 실패, 트레이드오프, 한계를 구조화된 회고(Post-mortem)와 더 나은 시스템 설계로 바꿉니다.

## 🏗️ Highlighted Architecture & PoC

- 🧠 **[Agent Memory System](https://github.com/entangelk/agent-memory-system-public)** MCP 기반 장기 기억(Memory) 아키텍처.  
  `Architecture:` 진실의 공급원(MongoDB)과 의미론적 검색 계층(ChromaDB)을 엄격히 분리하여 기억의 일관성과 압축을 보장하도록 설계했습니다.

- 🎯 **[Automated Brand Logo Extraction](https://github.com/entangelk/logo_image)** Grounding DINO, SAM, 그리고 자체 픽셀 후처리를 결합한 zero-shot 로고 추출 파이프라인.  
  `Focus:` 지도학습(Supervised learning) 데이터 없이도 견고하게 동작하는 파이프라인 구축.

## 📊 R&D, Failed Experiments & Post-Mortems
*저는 성공적인 배포만큼이나 실패한 실험에서 얻은 교훈을 소중하게 생각합니다. 아래는 아키텍처 가설을 테스트하고 데이터 기반으로 의사결정을 내렸던 R&D 프로젝트들입니다.*

- 🧪 **[Q-PSA (Project Killed)](https://github.com/entangelk/Q-PSA_Pr)** 양자화 LLM의 레이어 중요도를 추정하기 위해 이산적(discrete) perturbation을 테스트한 실험.  
  `Decision:` baseline 대비 약 1300배 느리고 pruning 검증에 실패했다는 데이터를 확인한 후, 객관적으로 프로젝트를 폐기(Kill)했습니다.

- 🗺️ **[Circle-WFC (Architectural Pivot)](https://github.com/entangelk/circle-wfc)**
  전통적인 `A*` 경로 탐색을 기하학 기반의 WFC로 대체하고자 했던 실험. 
  `Insight:` 전역 탐색에서 '국소적 일관성'이 가지는 구조적 한계를 발견하고, 이를 고효율 '탐색 공간 축소기(Search Space Reducer)'로 피벗(Pivot)했습니다.

- ⚡ **[HW-WFC v2.9 (Feasibility Validated)](https://github.com/entangelk/hw-wfc)** 제약 조건 기반 AI 컴파일러 스케줄링 R&D.  
  `Result:` Exact DP의 최적해를 재현하며 알고리즘의 유효성을 증명했으나, 실제 상용화의 병목이 '하드웨어 기반 비용 모델 보정'에 있음을 파악하고 연구를 전략적으로 마무리했습니다.
  
## Currently Building & Exploring

- **🎓 ADIGA College Admission Data Pipeline** 200개 이상의 기관에서 복잡한 HTML 데이터를 추출하고 정규화하는 파이프라인.  
  `Result so far:` hallucination 제어형 LLM 워크플로우를 통해 noisy HTML 환경에서 schema violation rate를 낮추고 있습니다.

## Engineering Notes

트러블슈팅, 아키텍처 결정, 트레이드오프, 프로젝트 맥락에 대한 더 긴 기록은 아래에서 볼 수 있습니다.  
👉 **[Selected Project Details (PROJECTS.md)](./PROJECTS.md)**

## 연락처

**Email:** [kdtyohan@gmail.com](mailto:kdtyohan@gmail.com)  
**LinkedIn:** [entangelk](https://www.linkedin.com/in/entangelk/)