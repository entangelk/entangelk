# 다음 작업 체크리스트

기준일: 2026-10-01. 현재 포트폴리오 본문 개편과 사용자 답변 반영은 완료했다. 아래는 후속 작업이며 현재 소개를 마무리하기 위한 필수 추가 질문은 없다.

[핸드오프](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/HANDOFF.md) · [확인 기록](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/owner-confirmations.md) · [개편 계획](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/portfolio-revision-plan.md)

## 사용자가 확인하거나 함께 진행할 일

- [x] **Writer README 작업:** 2026-10-02 Writer 저장소 `e64e884`에서 README 상단을 사용자 흐름으로 바꾸고, 직접 집필 중 바꾼 분석 화면·검토 흐름 9건을 작업 로그·결정 브리프와 연결했다. 사용자 요청으로 커밋만 했고 push는 Writer 저장소의 진행 중 작업과 함께 사용자가 한다. 남은 일: `docs/portfolio.md`의 2026-08-25 수치와 ‘dogfood 착수 선언 단계’ 문구 갱신(선택).
- [ ] **회사에서 README 수정:** 아래 CO-01~CO-05를 회사 저장소에 적용한다. 집에서는 사내 저장소를 다시 열 필요 없이 이 포트폴리오의 근거 요약으로 문안부터 작성할 수 있다. 실제 사내 파일 수정·검토는 회사에서 진행한다.
- [ ] **PDF 최종 확인:** 아래 PDF-01에서 HTML 원본을 수정·재생성한 뒤, 사용자에게 보이는 프로젝트 상태·기여도·성과와 페이지 넘침·이미지를 확인한다. 편집·출력 작업은 에이전트와 이어갈 수 있고 원본을 다시 찾거나 사내 PDF를 올릴 필요는 없다.
- [ ] **경력기술서 동기화:** PDF와 본문이 정리되면 CV-01을 진행한다. 영상 85%·RAG 90%와 실제 적용 성과가 포트폴리오·경력기술서에서 일치하는지 확인한다.

위 체크는 새 인터뷰·평가셋·벤치마크를 의무로 요구하는 목록이 아니다. 추가 검증은 제품 개발의 후속 선택이며 현재 포트폴리오 제출의 선행 조건으로 만들지 않는다.

선택적인 보강은 두 가지다. 아직 대표 소개에 넣지 않은 사내 세부 집계를 추가 공개하려면 OWN-01에서 범위를 정하고, 과거 특정 CMS/API 재사용 사례를 강조하고 싶으면 OPS-03을 보강한다. 지금 답변할 필요는 없다. 인건비·원화 금액·내부 레퍼런스 구현·검수자의 개인 기준은 다시 요구하지 않는다.

## 프로젝트별 README 후속 작업

현재 **프로필 README 두 언어는 수정 완료**다. 아래 프로젝트 자체의 README는 이번 세션에서 수정하지 않았다. ‘권고’는 확인된 포트폴리오 내용에 맞춰 소개를 정리할 필요가 있다는 뜻이며, 원본 문서 전체를 다시 감사했다는 뜻은 아니다.

| ID / 우선순위 | 프로젝트 / 접근 | README에서 정리할 내용 | 완료 기준 |
| --- | --- | --- | --- |
| WR-01 / 우선 | [AI Writer](https://github.com/entangelk/ai_writte_system) · 집에서도 진행 | 집필 문제→기억 원문 검토·승인·검색→직접 dogfood→불편 발견·화면 개선. 기술 구조·테스트 수는 상세 근거로 배치 | 직접 사용과 외부 사용자 검증을 구별하고, 분석 표시·검토 흐름 개선 사례를 Git 이력으로 연결. 한영 파일이 있다면 함께 맞춤 |
| CO-01 / 우선 | 장편 AI 영상 · 사내 저장소, 회사에서 적용 | B2B 광고 개발 목적, 서비스 기획·아키텍처·백엔드와 팀 관리, 프로젝트 기여도 85%. 레퍼런스의 현재 구현과 모델별 결과 품질을 구분 | TFT 전체 3명·개발 실무 2명을 구분. 직접 테스트 중심의 개발 단계 표시. 커스텀 노드 활용 이상 내부 방식은 공개 문안에 쓰지 않음 |
| CO-02 / 우선 | 에셋 생성·검수 · 사내 저장소, 회사에서 적용 | 연간 라이선스를 AI 제작으로 대체, 전체 서비스 반영·라이선스 종료. 제작자 피드백→대량 재생성·메타데이터 DB 반영·카테고리 부족 현황 | 생성 API 비용은 연간 라이선스의 약 40%, API 비용 기준 회수 약 0.4년. 인건비·금액 비공개. 생성 인덱스를 최종 배포 수로 단정하지 않음 |
| CO-03 / 우선 | NLP · 사내 저장소, 회사에서 적용 | v비즈링·v프로필 제작대행사 사용자, 자동제작 전체 담당, 자연어 카테고리 선택→이미지 배분, 콘텐츠 담당자의 내부 사용 평가 | 전체 4,121개 약 125초와 증분 10개 약 2초의 작업량을 병기. 61.5배/155배 속도 개선 표현 제거. 내부 만족 평가를 정량 정확도·도그푸드 합격으로 바꾸지 않음 |
| CO-04 / 우선 | 사내 자동화 · 사내 저장소, 회사에서 적용 | 4개 서비스 월간보고 담당자의 수집·분석·제작 흐름, 2일→반나절 미만의 실제 작업 비교 | 월 10시간으로 임의 환산하지 않음. 플랫폼 전체 DB 없음·운영 부담 0 표현 제거. 특정 CMS/API 재사용과 플랫폼 저장소·스케줄러 범위를 구분 |
| CO-05 / 우선 | RAG 통합 프로젝트 + 검증 Core · 사내 저장소, 회사에서 적용 | 초기 AI 서비스 기본 기능 MVP, 기여도 90%, 직접 테스트·개발 단계. Core는 다른 서비스의 후보를 검증하는 기술 기반 | 두 저장소의 역할·최종 저장/채택 책임을 맞춤. 같은 기여도·성과를 두 제품으로 중복 집계하지 않음. 실제 고객 사용·정확도 보장으로 확대하지 않음 |
| PO-01 / 선택 | [Assessment](https://github.com/entangelk/assessment_poc) | 과제 설계의 불일치 검사, CLI는 호출 방식, 합성 예제 검증 범위. 기존 구현 외 추가 진행 없음 | 보조 PoC의 상태와 live SDK 미구현 범위를 명확히 하고, 포트폴리오 대표 사례처럼 확대하지 않음 |
| PO-02 / 선택 | [Agent Memory](https://github.com/entangelk/agent-memory-system-public) | Writer의 기술 기반이라는 관계, 저장·검색·캐시 재구축 범위 | 세션 기억 문제의 보편적 단정과 효과 보장을 피함. 기술 구조 설명은 보존 |
| RD-01 / 낮음 | [Logo Workbench](https://github.com/entangelk/logo_image), [Harness IR](https://github.com/entangelk/Harness_ir) | 연구 질문→실험 범위→혼재/실패 결과→남긴 판단 | 제품 성과로 과장하지 않고 기존 결과·실패 기록 보존. 원본 README 확인 후 필요한 문구만 수정 |
| RD-02 / 낮음 | [HW-WFC](https://github.com/entangelk/hw-wfc), [Circle-WFC](https://github.com/entangelk/circle-wfc), [T-WFC](https://github.com/entangelk/T-WFC), [Q-PSA](https://github.com/entangelk/Q-PSA_Pr) | 실험에서 확인한 범위와 보류/종료 판단 | 미구현 후속 가설을 결과로 쓰지 않음. Q-PSA는 WFC에서 영감을 받은 별도 perturbation 실험으로 구분. 필요 여부를 확인한 뒤 수정 |

사내 저장소의 공개 GitHub 주소는 확인하지 않았으므로 링크를 만들지 않았다. 경로 목록이나 비공개 remote 대신 [비식별 근거 요약](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/company-evidence-snapshot.md)으로 연결한다.

인력 분석은 이번 자료에서 별도 프로젝트 README를 확인하지 않았다. 새 저장소를 만들기보다 경력기술서와 포트폴리오의 분석→채용 반영→비용·소통률 결과를 맞추면 된다.

## Writer 작업의 바로 쓸 근거

- 사용자 확인: 직접 집필하며 dogfood 진행 중, 분석 표시 불편을 수정 중.
- 로컬 이력 확인: 2026-09-30 `97e110c`의 검토 그룹·후보 편집 표시, `600803f`의 승인 전 그룹 인물명 수정.
- [2026-09-02 검토 UX 보강 기록](https://github.com/entangelk/ai_writte_system/blob/main/docs/verifications/2026-09-02/dogfood_review_ux_fix.md).

후속 작업에서는 현재 Git 상태와 실제 변경 내용을 확인해 사례를 작성한다. 이력의 변경 사실만으로 사용 시간 절감이나 외부 작가 수요를 입증하지 않는다. 위 이력은 읽었지만 프로젝트 자체 파일은 수정하지 않았다.

## PDF-01 · CV-01: 원본과 갱신 순서

원본은 [경력기술서 저장소](https://github.com/entangelk/job_activate)에 있다. 2026-10-01 로컬 원본과 인계 지침을 읽어 아래 연결을 확인했으며 파일은 수정하지 않았다.

| 산출물 | 편집할 원본 | 갱신 내용 |
| --- | --- | --- |
| 경력기술서 PDF | [경력기술서.html](https://github.com/entangelk/job_activate/blob/main/경력기술서.html) | 실제 적용 성과, 자동화 2일→반나절 미만, 영상 레퍼런스 현재 상태·기여도 85%, RAG MVP·기여도 90%, Assessment 비중 |
| AI Writer 포트폴리오 PDF | [AI_Writer_포트폴리오.html](https://github.com/entangelk/job_activate/blob/main/AI_Writer_포트폴리오.html) | 집필 경험·기억 검토·검색 흐름과 dogfood 개선 사례를 먼저, 기술/검증 기록은 보조 근거로. 최신 상태와 설명 일치 |
| 인쇄·인계 지침 | [경력기술서 HANDOFF](https://github.com/entangelk/job_activate/blob/main/HANDOFF.md) | Tabloid 가로 17×11인치·Chrome PDF 인쇄 지침을 원본 저장소에서 확인하고 유지 |

- [x] Writer README와 이력 사례를 정리한다(Writer `e64e884`, push 대기).
- [ ] 원본 HTML을 최신 포트폴리오 내용에 맞춘다. 원본 저장소의 사용자 변경·미추적 파일을 보존한다.
- [ ] Chrome으로 PDF를 출력하고 페이지 넘침·이미지·링크·기여도·성과를 확인한다.
- [ ] 포트폴리오의 `docs/portfolio`에 있는 두 기존 PDF를 검증한 산출물로 갱신한다.
- [ ] HTML·PDF·프로필 본문의 주장과 수치를 최종 대조하고 두 저장소의 인계 문서를 갱신한다.
- [ ] 해당 변경 범위의 커밋·push를 진행한다. 이번 세션의 push 대상은 포트폴리오 저장소 `origin/main`이며 다른 저장소는 수정·push하지 않았다.

기존 PDF는 현재 본문보다 오래된 상태다. 현행 웹을 단순 인쇄한 파일로 경력기술서 HTML 원본을 대체하지 않는다.
