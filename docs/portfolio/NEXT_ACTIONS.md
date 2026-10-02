# 다음 작업 체크리스트

기준일: 2026-10-02. 포트폴리오 본문 개편, Writer README·두 PDF·경력기술서 동기화, 공개 저장소 README 보강, OWN-01·OPS-03 반영까지 마쳤다. 남은 것은 개인 홈페이지 저장소의 PDF 커밋·배포(사용자)와 주기적 갱신뿐이다.

[핸드오프](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/HANDOFF.md) · [확인 기록](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/owner-confirmations.md) · [개편 계획](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/portfolio-revision-plan.md)

## 사용자가 할 일

- [ ] **개인 홈페이지 저장소:** `portpolio_main/frontend/static/file`의 새 PDF 두 개를 진행 중인 작업과 함께 커밋·배포한다.

- [x] **Writer 저장소 push:** 사용자가 `e64e884`·`9b25d78`를 push했다(2026-10-02 원격 확인).

## 완료한 일 (2026-10-02)

- [x] **WR-01 Writer README:** 사용자 문제와 네 단계 흐름을 앞에 두고, 직접 집필 중 고친 9건을 날짜·불편·원인·변경·근거 링크 표로 정리했다. 직접 사용과 외부 검증을 구분했다. Writer `docs/portfolio.md`의 dogfood 상태 서술도 갱신했다.
- [x] **PDF-01 Writer 포트폴리오:** 시장·문제(가설) → 작가 흐름 → dogfood 이력·사례 → 기술·검증(보조 근거) 순서로 재구성하고, 2쪽에 링크 안내(개인 홈페이지 대표·웹 포트폴리오·GitHub·영어 블로그, PDF 링크와 QR)를 넣었다. 17쪽.
- [x] **PDF-01 경력기술서:** 요약 근거를 실제 적용 성과 중심으로 바꾸고, 영상(B2B 광고·TFT·팀 관리·레퍼런스 일정 수준·실사용 전)·RAG(MVP·실사용 전)·자동화(2일→반나절 미만)·NLP(3사 적용, 작업량 병기)·에셋(라이선스 대체·약 40%·약 0.4년)을 확정 사실로 맞췄다. 18쪽.
- [x] **CV-01 대조와 교체:** 원본 HTML은 [경력기술서 저장소](https://github.com/entangelk/job_activate)에서 수정·발행·push했다. `docs/portfolio`의 두 PDF를 새 발행본으로 교체했다. README·PROJECTS 두 언어와 웹 본문에 옛 주장(월 10시간·속도 배수·22,000+·로딩 5분)이 없고, 기여도·성과·Writer 상태가 PDF와 같음을 확인했다.
- [x] **QR·공개 범위 확인:** 사용자가 Writer PDF의 QR 4개 동작을 확인했다. 경력기술서 PDF(회사명·서비스명·연락처 포함)는 공개하기로 사용자가 결정했다.
- [x] **공개 저장소 README 점검:** Assessment는 보조 PoC 상태와 "AI 에이전트 = 호출 방식, 사용자 = 과제 설계자(가설)"로 고쳤다. Harness IR·HW-WFC·Circle-WFC·T-WFC·Q-PSA는 이미 연구 질문·혼재/실패 결과·보류 판단을 명시하고 있어 수정하지 않았다. Agent Memory 공개 저장소에는 수정·삭제 뒤 캐시 재구축 필요·클라이언트 사용 강제 불가 한계와 Writer로 이어진 관계를, Logo Workbench에는 연구 질문→시도→결과→판단 요약을 두 언어로 추가했다. Assessment(`c5b0b7f`)·Agent Memory(`0ee5d38`)·Logo(`38e1c8b`)는 push했다.

- [x] **OWN-01·OPS-03 반영:** 에셋 16,052개 공개, NLP 2026년 3월 적용, 월간보고 2025년 3월부터 매월(약 76건, 처음부터 4개 서비스였다는 가정), CMS/API 재사용 범위·위험 알림·네트워크 유틸리티(3개 팀 6명), 영상 검토 피드백 사례를 README·PROJECTS 두 언어·웹·경력기술서에 반영했다. 경력기술서 요약의 "운영 위험 자동 감지" 문구는 확인된 내용으로 바꿨다.

## 하지 않기로 한 일

- **회사 저장소 README(구 CO-01~05):** 비공개 저장소라 포트폴리오와 맞출 필요가 없다는 사용자 결정(2026-10-02). 회사 프로젝트의 공개 서술은 이 포트폴리오와 [비식별 근거 요약](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/company-evidence-snapshot.md)이 정본이다.

## 공개 범위 결정 (2026-10-02)

서비스명(v비즈링·v프로필 등)은 공개 본문에 써도 된다. 회사명은 공개 본문(README·PROJECTS·웹)에 쓰지 않는다. 경력기술서 PDF는 회사명·연락처를 포함한 채 공개한다.

## 주기적 갱신

- 경력기술서 타임라인 기준 월(`NOW`)을 매달 올리고 PDF를 세 곳에 다시 배포한다. 다음은 2026-11(재직 1년 10개월, 총 3년 9개월).
- Writer는 계속 움직이는 저장소다. dogfood 개선이 쌓이거나 큰 마일스톤이 생기면 Writer README 표 → Writer PDF dogfood 쪽 → 포트폴리오 본문 순으로 갱신한다.
- 월간보고 건수(약 76건)는 처음부터 4개 서비스였다는 가정의 계산이다. 다르면 고친다.

## 선택 작업

| ID | 내용 | 메모 |
| --- | --- | --- |

추가 인터뷰·평가셋·벤치마크는 제품 개발의 후속 선택이며 포트폴리오 제출의 선행 조건이 아니다. 인건비·원화 금액·내부 레퍼런스 구현·검수자의 개인 기준은 다시 요구하지 않는다.

## 원본과 발행 경로

| 산출물 | 편집 원본 | 공개 사본 |
| --- | --- | --- |
| 경력기술서 PDF | [경력기술서.html](https://github.com/entangelk/job_activate/blob/main/경력기술서.html) | `docs/portfolio/박요한_경력기술서.pdf` |
| AI Writer 포트폴리오 PDF | [AI_Writer_포트폴리오.html](https://github.com/entangelk/job_activate/blob/main/AI_Writer_포트폴리오.html) | `docs/portfolio/박요한_AI_Writer_포트폴리오.pdf` |
| 인쇄·인계 지침 | [경력기술서 HANDOFF](https://github.com/entangelk/job_activate/blob/main/HANDOFF.md) | Tabloid 가로 17×11인치, Chrome PDF |

수정은 원본 HTML에서 하고 PDF를 다시 뽑아 두 곳에 같은 파일을 둔다. 현행 웹을 단순 인쇄한 파일로 원본을 대체하지 않는다. 경력기술서 PDF에는 회사명·서비스명·연락처가 들어 있으며, 공개는 사용자 결정이다(2026-10-02). 웹 페이지 본문은 계속 회사명·서비스명 없이 일반화한다. PDF 사본은 개인 홈페이지 저장소 `portpolio_main/frontend/static/file`에도 있으므로 세 곳을 함께 바꾼다.
