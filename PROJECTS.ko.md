<p align="center"><a href="https://github.com/entangelk/entangelk/blob/main/README.ko.md">메인 프로필</a> · <a href="https://github.com/entangelk/entangelk/blob/main/PROJECTS.md">English</a></p>

# 제품 판단과 실무 사례

업무의 문제, 선택한 경험, 구현 결과와 검증 한계를 먼저 정리했습니다. 기술 구조와 기존 검증 기록은 각 사례 아래에서 펼쳐 볼 수 있습니다. 구현·문서 기록·실사용 효과는 서로 다른 근거로 다룹니다.

## 제품 판단 사례

### AI Writer System · 개발 중

[GitHub](https://github.com/entangelk/ai_writte_system) · [화면과 사례](https://entangelk.github.io/entangelk/case-studies.html#writer)

**대상과 문제:** 이전 장의 설정·사건을 찾아 다음 집필에 활용하려는 장편 창작자. 일관성 추적을 제품의 핵심 가설로 삼았습니다.

**경험과 선택:** 원고 작성 → 기억 후보의 원문 확인 → 승인·거절 → 다음 집필에서 검색. AI가 제안한 원고는 옆 패드에 두고 사람이 채택하기 전까지 원본을 유지합니다. 검토 없이 생성 결과를 기억에 편입하는 경로는 두지 않았습니다.

**현재 결과와 다음 판단:** 로컬 관통 동작과 실제 생성·검토 화면은 확인됩니다. dogfood 선언 이후의 사용량, 검색 시간, 기억 승인·생성 채택률은 미확인입니다. 다음 검증은 실제 장문 작업의 검색·검토·복구 부담이며, 그 결과로 경험을 수정합니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **제품 가설.** 장편 집필에서 설정과 사건을 찾고 앞뒤를 확인하는 부담을 줄이는 데 집중합니다. 이것이 모든 작가에게 문장 품질보다 중요하다고 입증한 것은 아닙니다.
* **AI 출력은 정본이 아니다.** 생성·분석 결과는 전부 `candidate`로 남고, Gate 판정과 사람의 검토를 거쳐야 기억이 됩니다. "AI가 쓴 것이 곧 사실"이 되는 순간 기억 자체가 오염되고, 이후의 모든 검색이 그 오염을 물려받기 때문입니다. 기억은 **append-only**입니다 — 덮어쓰지 않고 버전을 쌓아, 잘못된 갱신이 과거를 지우지 못하게 합니다. 모든 주장에는 원문 위치로 되짚는 `source_ref`가 붙어, 작가가 AI의 판단을 출처까지 검증할 수 있습니다.
* **벡터 저장소는 진실이 아니라 캐시.** 정본은 MongoDB가 들고, ChromaDB(BGE-m3 벡터)와 Elasticsearch(nori 어휘)는 async outbox 워커로 유지되는 **파생** 하이브리드 색인입니다. 최종 근거는 색인을 믿지 않고 항상 정본에서 재조회합니다 — **Agent Memory System**(아래)에서 처음 만든 진실/캐시 분리를 제품 규모로 다시 적용한 것입니다.
* **교체할 자리는 교체 가능하게, 다만 재기 전에는 바꾸지 않는다.** 임베딩과 리랭킹은 provider-neutral seam 뒤에 있습니다. 엔드포인트가 없으면 임베딩은 fake로 내려가지만 리랭킹은 `None`으로 — 아예 재정렬하지 않습니다. 리랭킹에는 "가짜 재정렬"이라는 쓸모 있는 대체물이 없고, **무작위로 섞는 것은 no-op보다 나쁘기** 때문입니다. 브리프의 문언은 "generic OpenAI-호환 어댑터"였지만 **OpenAI에는 rerank 엔드포인트가 없습니다.** 글자를 그대로 따랐으면 **존재하지 않는 계약**을 구현할 뻔했고, 그래서 이 분야가 실제로 공유하는 형태(`POST /v1/rerank` — Cohere · Jina · Voyage · TEI)를 구현하고 그 이탈을 브리프에 적었습니다. 조립은 가드로 잠급니다 — **이 실패가 조용하기** 때문입니다. 리랭킹이 조용히 빠져도 비는 것이 없고 순위만 예전으로 돌아갑니다. 그리고 교체하기 **전에** 평가 하네스(`recall@k` · `MRR` · `nDCG@k`)를 먼저 썼습니다. 정답은 일부러 채우지 않았습니다 — 하네스가 있다는 사실은 "평가했다"가 아닙니다.
* **문서는 코드의 부산물이 아니라 선행 조건.** 조용히 고르면 나중에 되돌릴 수 없는 선택 — 아키텍처·계약 리터럴·정책 — 은 코드를 쓰기 전에 선택지 표를 갖춘 **결정 브리프**로 올리고, 오너가 결정할 때까지 구현을 멈춥니다. 기존 공개 스냅샷에 **결정 브리프 118개**가 기록돼 있습니다. 구현 뒤에는 **다른 세션**이 **뮤테이션**으로 반증을 시도합니다 — 고친 것을 되돌려 회귀 가드가 다시 실패하는지 확인하는 방식입니다. 가드는 양방향이어야 합니다: 원래 결함을 재현해도 실패하고, 과잉 교정으로 정상 경로를 깨도 실패해야 합니다.
* **기록된 시스템 검증.** 기존 공개 스냅샷은 결정 브리프 118개, 검증 기록 315건, 통과 테스트 3,075건(서브테스트 4,239)을 보고합니다. 판정 분포는 검증 품질이나 제품 효과의 증명이 아닙니다. 런타임 컨테이너에 옛 포트 매핑이 남은 사례는 테스트 외에 실제 배포 상태를 확인할 필요를 보여줍니다. 이 수치는 이번에 재측정하지 않았습니다.
* **검증 상태.** 로컬 관통 동작과 인증·프로젝트 소유권·quota·관리자 기능은 구현 근거입니다. 2026-08-23에는 dogfood 착수가 선언됐지만 이후 실제 사용 기록과 제품 지표는 이번 자료에서 확인하지 못했습니다. 외부 다중 사용자 서비스와 원격 다중 호스트 운영은 검증 범위에 포함하지 않습니다.

</details>

### 장편 AI 영상 제작 시스템 · 회사 프로젝트, 품질 미해결

[사례](https://entangelk.github.io/entangelk/experience.html#video) · 소스 비공개

**대상과 문제:** 원하는 영상을 설명하는 요청자가 복잡한 생성 레시피까지 다뤄야 하는 부담을 줄이는 것이 목표입니다. 기존 제작 시간과 실제 사용자의 업무 관찰은 미확인입니다.

**경험과 선택:** 영상 의도 입력 → 시나리오 확인 → 필요한 참조 이미지 검토 → 생성 계획 → 구간 생성·완성본 확인. 사용자가 workflow를 고르는 대신 영상 의도와 내용을 다루도록 했습니다. 실행 그래프의 자유 조립과 SNS 게시·성과 학습은 현재 제품 경험과 분리합니다.

**현재 결과와 다음 판단:** 로컬 관통 동작은 확인됐으나 기존 뮤직비디오·광고·드라마 실험은 최종 사용 기준을 통과하지 못했습니다. 생성 성공과 사용 가능한 품질을 구별하고, 제작 부담·연속성·목소리를 별도로 평가해야 합니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **실행 입력을 확인하는 경로.** 이미지가 필요한 요청에서는 시나리오 확인과 이미지 검수가 생성에 앞섭니다. 승인한 내용을 실행 계획으로 연결하고 추정값을 구분합니다. 이미지가 필요 없는 경로에는 자동 승인이 있어 모든 요청을 사람이 승인한다고 일반화하지 않습니다.
* **LLM은 그래프를 만들지 않는다:** 모델이 그래프를 자유롭게 조립하면 존재하지 않는 노드, 호환되지 않는 체크포인트, VRAM 초과, 재현 불가능한 실행이 나옵니다. 그래서 그래프는 운영자가 검증한 워크플로우로 고정하고 모델은 선언된 파라미터 슬롯만 채웁니다. 이 결정은 제품 표면도 뒤집었습니다 — 사용자는 워크플로우를 고르는 대신 숏·길이·대사·환경음·음악·제약으로 이뤄진 구조화 프롬프트를 조립하고, 워크플로우는 내부 실행 레시피로 남습니다.
* **실행 경계는 하나, 스냅샷은 불변:** 우리 백엔드가 유일한 실행 경계입니다. 로컬 ComfyUI 호스트와 호스팅 런타임은 같은 adapter 계약 뒤에 있고, 큐·히스토리 상태 분기와 receipt 기반 재개·산출물 회수를 동일하게 처리합니다. 실행 시점의 워크플로우와 파라미터는 불변 스냅샷으로 고정되고 레시피는 새 revision으로만 바뀌므로, 재현은 기억이 아니라 스냅샷 기준입니다. 경계 밖으로 나가는 응답에는 raw graph·provider payload·storage key·credential이 포함되지 않습니다.
* **15초의 벽 — 편집이 아니라 연속성 문제:** 생성 모델이 한 번에 만드는 길이는 약 15초입니다. 그래서 15 / 30 / 60 / 180초 요청은 영상당 한 번 분석해 정확히 1 / 2 / 4 / 12개 세그먼트로 계획합니다. 중요한 판단은 두 가지를 같은 기능으로 묶지 않은 것이었습니다 — **reference-to-video**(인물·스타일·모션 동일성)는 대상 앵커이고 **프레임 체이닝**(이전 마지막 프레임 → 다음 첫 프레임)은 시간 경계 앵커이며, 각각 따로 검증합니다. 전체 영상을 한 번에 보는 관리자 단계가 세그먼트마다 어떤 참조를 쓰고 뺄지 결정하고, 참조가 남지 않은 세그먼트는 조용히 텍스트로 생성하지 않고 명시적으로 중단합니다.
* **하나의 prompt IR, 판정만 하는 게이트:** 텍스트·이미지·참조 기반 생성을 하나의 구조화 prompt IR과 renderer로 통합했습니다. 대사 원문과 립싱크·자막 정책, 환경음과 비-디제틱 음악의 분리, 길이 상한, 제약 표현이 세 모드에 동일하게 적용됩니다. 멀티모달 이미지 분석은 사용자가 *선언한 사실*과 *픽셀에서 관찰된 것*을 분리해 기록합니다. 전문가 단계들은 자유로운 에이전트 대화가 아니라 입력·출력·쓰기 권한이 고정돼 있고, 생성 직전 게이트는 `PASS` / `REPAIR` / `BLOCKED`와 대상 단계·근거만 반환합니다 — 게이트가 프롬프트를 직접 고치지 않으며, 보정은 실패한 단계만 호출 상한 안에서 다시 실행합니다.
* **실패는 기록하고 승격하지 않는다:** 뮤직비디오 방향은 문맥을 늘리자 상대적으로 개선됐지만 1분 음악 경계에서 여전히 어긋나 보류했습니다. 약 58초 광고는 한국어 대사만 통과했고 정적인 화면·낮은 정보 밀도·깨진 화면 한글로 최종 사용에 실패했습니다. 약 3분 드라마는 결함이 너무 많아 그럴듯한 수정표를 만드는 대신 세부 수정 범위 도출을 거부했습니다. 셋 다 사용자 대상 기능으로 승격하지 않았고, 세그먼트마다 인물 목소리가 달라지는 문제도 덮지 않고 열린 과제로 명시했습니다. 그 뒤에는 **구현 전에 쓴 결정 브리프 10건**, **날짜별 독립 검증 기록 26건**, **약 490개의 백엔드 테스트**, 그리고 페이즈 문서가 덮어쓸 수 없는 단일 계약 정본 파일이 있습니다.

</details>

### Assessment Spec Harness · PoC

[GitHub](https://github.com/entangelk/assessment_poc) · [사례](https://entangelk.github.io/entangelk/case-studies.html#assessment)

**대상과 문제:** 과제 설계팀이 공개 안내와 채점 기준을 따로 고치면서 생기는 불일치를 확인하도록 만드는 도구입니다. 실제 채용팀의 수요는 사용자 가설입니다.

**경험과 선택:** 명세·rubric 입력 → 불일치 finding 확인 → 사람의 검토 → gate 판정. 응시자를 자동 채점하지 않고 평가 설계를 검사합니다. AI agent와 CLI는 호출 인터페이스이며 사용자의 직무와 구별합니다.

**현재 결과와 다음 판단:** 합성 예제 2개를 결정론적 추출과 mock 의미 검증으로 각각 3회 실행한 결과입니다. 실제 과제의 오탐·검토 시간, live LLM 추출 품질은 미검증입니다. 다음 검증은 실제 spec/rubric 쌍과 사람 검토의 비교입니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **문제 재정의 (Problem Reframing):** 대부분의 평가 도구는 응시자를 채점합니다. 저는 그 위쪽 단계의 실패에 집중했습니다. spec과 rubric은 조용히 어긋나며(optional 항목이 core로 채점되거나, must 항목이 bonus로만 커버되거나, double scoring이 발생) 평가를 은밀하게 불공정하게 만듭니다. 이 하네스는 spec/rubric 정합성을 'CI로 돌릴 수 있는 대상'으로 다룹니다.
* **불변 스냅샷 기반 결정론적 코어:** 전체 파이프라인을 불변 소스 스냅샷(sha256 + line/span `source_ref`)에 anchor해, DB나 RAG 레이어 없이도 모든 finding이 원문에 grounding되도록 했습니다. 결정론적 검증 코어(Rule 0 reference integrity + Rule 1~3 + rubric lint rules)가 재현 가능한 finding을 생성하며, 두 예제 과제 모두 3회 반복 실행에서 동일한 finding 분포를 재현했고 reference integrity 위반은 0건이었습니다.
* **에이전트 우선 CLI 계약:** 1차 호출 주체를 AI 에이전트(Claude Code, Codex, Gemini)로 설계했습니다. 안정적인 core 출력 계약(`status` / `exit_code` / `command` / `next_actions`), schema introspection, 명확한 종료 코드를 제공해 호출 측이 문서를 일일이 따라가지 않아도 안전하게 통합할 수 있습니다. 사람은 review → gate 판정 흐름에서 최종 검토자로만 참여합니다.
* **정직한 범위 경계:** 결정론적 코어와 review/verdict 흐름은 구현됐지만 live LLM SDK runner는 보류 상태입니다. 두 합성 예제를 `deterministic_extraction` + mock semantic verification으로 각각 3회 end-to-end 실행해 동일한 finding 분포와 Rule 0 진단 0건을 재현했습니다. 이는 grounded artifact 위 결정론적 workflow의 재현성 검증이며, live LLM 추출 품질 검증은 아닙니다.

</details>

## 실무 업무와 운영 판단

### 고객센터 특별기간 인력 분석

[사례](https://entangelk.github.io/entangelk/experience.html#staffing)

**문제:** 평균 수요로 채용하면 고부하일의 응답 실패를 놓칠 수 있습니다.

**선택:** 약 2년 반의 상담 로그를 시즌별로 나누고 고부하일 Q90을 피크 기준으로 사용했습니다. 설명력이 낮은 월별 최대 호수 추세(R² 약 0.06)는 참고값으로 내렸습니다. 잔여 수요와 실무 처리량으로 필요 인력을 산정하고 +1명 보수안을 제시했습니다.

**확인된 결과:** 보고서의 과거 데이터 역검증은 정확도 약 91%, 부족일 탐지 약 96%를 기록합니다. 시즌 2주 전 확보와 인당 부하 초과 시 증원이라는 운영 규칙으로 연결했습니다. 기존에 서술한 2026년 여름 600만 원 절감은 사후 산정 근거를 확인 중이며, 적용 후 서비스 수준 유지까지 입증한 것은 아닙니다.

### 대규모 에셋 생성·검수 파이프라인

[사례](https://entangelk.github.io/entangelk/experience.html#assets)

**문제와 경험:** 대량 이미지 갱신은 생성뿐 아니라 사람이 결과를 확인하고 다시 만들거나 다음 대상으로 넘어가는 작업입니다. 원본·생성물 비교, 상태 필터·검색, 생성 이력 선택, 재생성, 검수 확인·취소를 제공했습니다.

**선택:** 검수 완료·건너뛰기·이미 생성한 대상을 배치에서 제외하고 미완료 작업을 이어갑니다. `Pass`는 건너뛰기이며 검수 승인과 다릅니다. 현재 화면은 페이지별 목록과 lazy 이미지 로딩을 사용합니다.

**현재 결과:** 로컬 생성 인덱스의 고유 항목 22,068개를 확인했습니다. 이는 생성 시도·최종 검수 승인·배포 수와 다릅니다. 초기 로딩 개선 후 시간, 검수 처리량과 실제 비용 절감은 미확인입니다. 과거 비용 비교 문서는 예상치이며 청구액이 아닙니다.

### NLP 카테고리 매칭

[사례](https://entangelk.github.io/entangelk/experience.html#nlp)

**문제와 경험:** 자연어 입력을 기존 카테고리와 연결하고 관련 이미지 검색·콘텐츠 생성으로 이어가는 모듈입니다. 임베딩과 재정렬을 사용하되 결과를 기존 분류 체계에 연결합니다.

**선택:** 카테고리·태그의 공통어 편중과 이미지 관련성을 고려하고, 데이터 변경 시 전체 임베딩 재생성 대신 변경분만 갱신합니다. Docker와 API 문서로 기존 백엔드에 연결했습니다.

**수치 조건:** 서비스 README는 4,121개 매핑의 전체 재생성 약 125초와 10개 매핑의 증분 갱신 약 2초를 기록합니다. 작업량이 다른 비교이므로 ‘동일 작업 61.5배 개선’이라고 쓰지 않습니다. 상용 적용은 기존 서술이며 정확도 비교·운영 기간·사용량은 별도 확인이 필요합니다.

### 사내 업무 자동화

[사례](https://entangelk.github.io/entangelk/experience.html#automation)

**문제와 경험:** 기획·운영의 반복 수집과 월간 보고서를 웹에서 생성·조회·편집·내보내는 흐름으로 연결했습니다. 수집 중 CAPTCHA가 생기면 사람이 입력하고 재개하는 경로를 제공했습니다.

**선택과 결과:** 정기 실행과 상태 확인을 포함한 작업 흐름이 구현돼 있습니다. README의 월 10시간 이상 절감은 산식·표본 확인 전 문서상 주장으로 구분합니다. 특정 CMS/API 재사용 자동화의 제약을 DB를 쓰는 통합 플랫폼 전체의 특성으로 확대하지 않습니다.

### 보조 업무: 사내망 네트워크 유틸리티

VPN 연결 제약으로 끊기던 팀 작업을 위한 경량 Python 도구를 사내 배포했습니다. 사용 인원과 시간 절감은 미측정입니다.

## 기술 기반

### Verified Agentic RAG · 회사 기술 사례

[사례](https://entangelk.github.io/entangelk/experience.html#rag) · 소스 비공개

실제 한국 법령 코퍼스에서 요청 정리·검색·답변 후보·근거 검증의 흐름을 실험했습니다. 불확실한 요청과 근거는 사람의 검토로 보류하고, 검증 Core는 다른 서비스가 호출할 수 있는 기반으로 분리했습니다. 호출 서비스가 최종 저장과 채택을 결정합니다. 구현·모델 실험이 답변 정확도나 사용자 검토 시간의 효과를 입증하지는 않습니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **Contract-First, 네 개의 독립 레이어:** 이 문제는 LLM 한 번 호출로 풀리지 않습니다. Intake / Knowledge / RAG Harness / Verification·Gate로 나누고 **구현보다 먼저 레이어 간 계약을 고정**했습니다. 각 레이어는 mock으로 독립 개발하고, 경계 객체(Task Brief·Source Ref·Gate Decision)는 단일 정본 계약 파일에 있으며, 명세와 코드가 어긋나는 순간 실패하는 drift-lock 테스트로 잠갔습니다 — 커밋된 OpenAPI 문서와 실행 중인 서비스 스키마 사이의 exact-drift 가드를 포함합니다.
* **기능보다 신뢰 기반을 먼저:** RAG보다 Knowledge·Verification을 먼저 만들었습니다. 핵심 불변식은 **검증되지 않은 텍스트는 사용자에게 나가지 않는다**이며, 답변을 바꾸는 처리(근거 없는 claim 제거 등)는 재검증을 거친 뒤에만 나갑니다.
* **VectorDB는 진실이 아니라 캐시다:** 최종 근거는 항상 **불변 source snapshot**에서 `source_ref`로 재로드합니다. parser나 정책이 바뀌면 새 snapshot을 만들고 과거 참조는 영원히 재현됩니다. 검색은 ontology-aware입니다 — **법령 트리(조/항/호/목)**의 최소 단위와 경로를 함께 돌려주고 상위 맥락은 필요할 때 재조회하므로, 재색인 후에도 인용이 살아남습니다.
* **Schema-guided intake, 기본은 결정론:** 비개발자의 모호한 요청을 RAG에 바로 넘기지 않습니다. 기본 경로는 결정론 스키마 레지스트리·validator·compiler이고, LLM task classifier와 slot filler는 opt-in 플래그 뒤에서 등록된 task type 목록과 필드 allowlist 안에서 **제안만** 합니다. 모르는 필드는 추측하지 않고 `null`로 두며, 사용자가 확정한 슬롯은 이후 모델 추정이 덮어쓸 수 없고, 해소되지 않는 세션은 리뷰어가 명시적으로 해제할 때까지 **human review로 보류**됩니다.
* **Agentic 연구, 그러나 LLM은 제안만 한다:** 답변 생성은 query planning → claim extraction → evidence linking → semantic verification → revision의 멀티 에이전트 루프이며, 게이트 우선순위는 `block > human_review > retrieve_more > revise > pass`로 고정돼 있습니다. LLM은 후보를 제안하고, 검증 레이어가 claim 단위로 grounding을 확인하며, 게이트가 무엇을 내보낼지 결정합니다.
* **wheel은 계약이 아니다:** 검증 경계가 안정되자 Core를 독립 저장소로 추출했고, 다른 서비스가 쓸 수 있는 **유일한** 지원 인터페이스는 버전이 붙은 private HTTP API 하나입니다 — candidate가 들어가고 verified package가 나옵니다. Python wheel과 package facade는 SDK 경계가 아니라고 명시했습니다. 소유권도 같은 방식으로 그었습니다 — authoritative storage와 commit 결정은 호출하는 서비스가 소유하고, Core는 검증된 package와 권고 action만 반환합니다. testbed와 Core API 버전 사이의 호환성 매트릭스가 릴리스 게이트로 동작하고, 구조 회귀 테스트가 package 간 import를 금지하며, 분리된 저장소는 publication manifest로 clean 환경에서 재조립해 증명했습니다(wheel 설치 → checkout 없는 liveness/readiness → image 빌드 → 계약 fingerprint).

</details>

### Agent Memory System · AI Writer의 기술 기반

[GitHub](https://github.com/entangelk/agent-memory-system-public)

여러 AI 클라이언트의 기억 저장·검색을 위한 MCP 기반 실험입니다. 정본과 파생 검색 캐시의 역할 분리를 AI Writer에 이어 적용했습니다. 기억 update/delete 후 완전한 캐시 정합성에는 재색인·재구축이 필요하며, 서버가 클라이언트의 기억 사용을 강제하지는 못합니다. 사용자 재설명 감소 효과는 별도 검증 대상입니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **Separation of Concerns:** "기억은 단순한 로그가 아니라 압축된 의미다"라는 철학을 시스템으로 구현했습니다. **MongoDB**를 수정 가능한 영속·권위 저장소(State of Truth), **ChromaDB**를 Mongo에서 재구축 가능한 파생 Vector Cache로 분리했습니다. 현재 update/delete handler 이후 완전한 cache 정합성에는 명시적 reindex/rebuild가 필요합니다.

</details>

## 연구 아카이브

### Logo Segmentation Workbench

[GitHub](https://github.com/entangelk/logo_image)

warp·anchor·segmentation·후처리를 나눠 실패를 비교하는 CV 워크벤치입니다. OCR/contour와 Grounding DINO·SAM을 조합하고 sharpness/noise를 설정 비교에 사용합니다. 후처리로 누락 전경을 복구하거나 상용 수준의 추출을 보장하는 것은 아닙니다. 실제 업무 데이터셋의 수작업 감소는 미검증입니다.

### Harness IR · 혼재 결과

[GitHub](https://github.com/entangelk/Harness_ir)

**가설 → 결과 → 판단:** provider-neutral IR이 구조화 추출을 개선하는지 baseline과 비교했습니다. 어려운 distractor에서는 명확한 우위가 없었습니다. lowering만의 개선 주장 대신 self-verification을 후속 가설로 남겼으며, 후속 loop는 현재 구현 범위 밖입니다.


<details>
<summary>기술 구조와 기존 검증 기록</summary>

* **단일 반증 가능 가설:** 가장 작게 실행 가능한 슬라이스(`role_ir.yaml -> lowering -> single backend call -> assurance`)를 만들어, 공유된 공정한 평가 흐름 안에서 단 하나의 주장을 검증했습니다. provider-neutral Role IR이 하드코딩 baseline 프롬프트를 이기는가? 더 큰 플랫폼 thesis는 `docs/`에 분리해 두어, 코드가 실제로 증명한 범위를 과장하지 않으면서도 이 실험이 검증하려던 방향과 함께 읽힐 수 있게 했습니다.
* **Provider-Neutral Lowering + Assurance:** Role IR이 백엔드별 artifact로 lowering되도록 설계했습니다(OpenAI `json_schema`; Groq와 Google GenAI/Gemma는 prompt + JSON extraction + schema validation; OpenRouter generic 경로). 현재 PoC assurance는 schema와 evidence span을 검증합니다. 이미 지원하는 provider 경로의 모델은 `backends.yaml`로 추가할 수 있지만, 새로운 provider 계열은 adapter와 registry 코드가 필요합니다.
* **정직한 혼재 결과:** contract eval-8 fair-mode 실행에서 일부 모델은 IR이 gold/근접 parity에 도달했지만, 하드 distractor 셋에서는 깔끔한 IR 우위가 없었습니다. `renewal`/`penalty` false positive가 IR·baseline 양쪽 공통의 실패 패턴이 되었고, 유리한 회차만 골라내지 않고 이 결과를 그대로 보고했습니다.
* **실패가 가리킨 방향:** inconclusive한 벤치마크가 진짜 레버를 재정의했습니다. 다음 단계의 가치는 lowering 단계 자체가 아니라 self-verification loop, critic role, convergence logic에 있으며, 이는 현재 범위에서 명시적으로 제외했습니다. role compiler 역시 완전한 semantic compiler가 아니라 결정론적 draft generator 수준에 머물렀습니다.

</details>

### 제약 탐색 연구 시리즈

- **[HW-WFC](https://github.com/entangelk/hw-wfc):** 가상 벤치마크에서 Exact DP 최적값과 일치했습니다. 측정 GPU timing과 평균 상관 ρ=+0.52는 방향성의 관찰이며 프로덕션 우위를 입증하지 않습니다. 하드웨어 cost model 교정이 남은 경계로 연구를 마무리했습니다.
- **[Circle-WFC](https://github.com/entangelk/circle-wfc):** 단순 맵의 초기 결과와 달리 복잡한 topology에서 실패했습니다. 단독 pathfinder 목표를 중단했고, A*/JPS 앞의 corridor 후보 생성은 미검증 후속 가설입니다.
- **[T-WFC](https://github.com/entangelk/T-WFC):** 5개 이산값으로 toy MLP를 학습하는 구성을 실험했습니다. 선형 데이터에서 baseline과 일치했지만 tested XOR/Spiral 구성의 성능과 탐색 비용이 악화했습니다. 모든 이산 학습의 근본적 불가능성을 증명한 결과는 아닙니다.

### Q-PSA · 종료

[GitHub](https://github.com/entangelk/Q-PSA_Pr)

WFC에서 영감을 받았지만 collapse/propagation을 구현한 WFC 알고리즘은 아닌 perturbation 실험입니다. Qwen2.5-0.5B Q4_K_M에서 낮은 중요도로 선택한 레이어 제거 시 PPL 3.65배, Layer Ablation은 1.05배였습니다. 점수 산출 155분 vs 7초(약 1,300배)로 종료했습니다. 국소 민감도를 pruning 중요도의 대체 지표로 쓰는 가설이 이 실험에서 실패했습니다.
