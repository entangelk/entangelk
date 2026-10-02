# 다음 작업 체크리스트

기준일: 2026-10-02. 포트폴리오 본문 개편, Writer README·두 PDF·경력기술서 동기화, 공개 저장소 README 점검까지 마쳤다. 남은 것은 사용자가 직접 할 확인과 선택 작업뿐이다.

[핸드오프](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/HANDOFF.md) · [확인 기록](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/owner-confirmations.md) · [개편 계획](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/portfolio-revision-plan.md)

## 사용자가 할 일

- [ ] **Writer 저장소 push:** `e64e884`(README 사용 흐름·dogfood 개선 이력)와 `9b25d78`(평가자 안내 문서의 dogfood 상태)를 진행 중인 작업과 함께 올린다. push 전에는 GitHub에서 README의 dogfood 절이 보이지 않는다.
- [ ] **Assessment 저장소 push:** `c5b0b7f`(README의 PoC 상태와 사용자·호출 방식 정정)를 확인한 뒤 올린다.
- [ ] **Writer PDF의 QR 확인:** 2쪽 링크 안내의 QR 4개를 휴대폰으로 한 번 스캔한다. PDF 링크 주소는 확인했지만 QR은 실제로 스캔하지 않았다.
- [ ] **경력기술서 요약의 한 문구:** "고객센터 호 폭주 등 운영 위험 자동 감지"는 이번 근거 자료에서 확인하지 않은 기존 문구다. 유지 여부만 정한다.

## 완료한 일 (2026-10-02)

- [x] **WR-01 Writer README:** 사용자 문제와 네 단계 흐름을 앞에 두고, 직접 집필 중 고친 9건을 날짜·불편·원인·변경·근거 링크 표로 정리했다. 직접 사용과 외부 검증을 구분했다. Writer `docs/portfolio.md`의 dogfood 상태 서술도 갱신했다.
- [x] **PDF-01 Writer 포트폴리오:** 시장·문제(가설) → 작가 흐름 → dogfood 이력·사례 → 기술·검증(보조 근거) 순서로 재구성하고, 2쪽에 링크 안내(개인 홈페이지 대표·웹 포트폴리오·GitHub·영어 블로그, PDF 링크와 QR)를 넣었다. 17쪽.
- [x] **PDF-01 경력기술서:** 요약 근거를 실제 적용 성과 중심으로 바꾸고, 영상(B2B 광고·TFT·팀 관리·레퍼런스 일정 수준·실사용 전)·RAG(MVP·실사용 전)·자동화(2일→반나절 미만)·NLP(3사 적용, 작업량 병기)·에셋(라이선스 대체·약 40%·약 0.4년)을 확정 사실로 맞췄다. 18쪽.
- [x] **CV-01 대조와 교체:** 원본 HTML은 [경력기술서 저장소](https://github.com/entangelk/job_activate)에서 수정·발행·push했다. `docs/portfolio`의 두 PDF를 새 발행본으로 교체했다. README·PROJECTS 두 언어와 웹 본문에 옛 주장(월 10시간·속도 배수·22,000+·로딩 5분)이 없고, 기여도·성과·Writer 상태가 PDF와 같음을 확인했다.
- [x] **공개 저장소 README 점검:** Assessment는 보조 PoC 상태와 "AI 에이전트 = 호출 방식, 사용자 = 과제 설계자(가설)"로 고쳤다. Harness IR·HW-WFC·Circle-WFC·T-WFC·Q-PSA는 이미 연구 질문·혼재/실패 결과·보류 판단을 명시하고 있어 수정하지 않았다.

## 하지 않기로 한 일

- **회사 저장소 README(구 CO-01~05):** 비공개 저장소라 포트폴리오와 맞출 필요가 없다는 사용자 결정(2026-10-02). 회사 프로젝트의 공개 서술은 이 포트폴리오와 [비식별 근거 요약](https://github.com/entangelk/entangelk/blob/main/docs/portfolio/company-evidence-snapshot.md)이 정본이다.

## 선택 작업

| ID | 내용 | 메모 |
| --- | --- | --- |
| PO-02 | [Agent Memory 공개 저장소](https://github.com/entangelk/agent-memory-system-public) README에 Writer의 기술 기반이라는 관계 보강 | 로컬에는 다른 원격(`agent-memory-system`)만 있어 이번에 수정하지 않았다. 공개 저장소를 받아 와야 한다 |
| RD-01 | [Logo Workbench](https://github.com/entangelk/logo_image) README 점검 | 로컬 사본이 없어 이번에 확인하지 않았다 |
| OWN-01 | 대표 본문에 아직 쓰지 않은 사내 세부 집계의 공개 범위 | 원할 때만. 답변 필요 |
| OPS-03 | 과거 특정 CMS/API 재사용 흐름 보강 | 원할 때만. 답변 필요 |

추가 인터뷰·평가셋·벤치마크는 제품 개발의 후속 선택이며 포트폴리오 제출의 선행 조건이 아니다. 인건비·원화 금액·내부 레퍼런스 구현·검수자의 개인 기준은 다시 요구하지 않는다.

## 원본과 발행 경로

| 산출물 | 편집 원본 | 공개 사본 |
| --- | --- | --- |
| 경력기술서 PDF | [경력기술서.html](https://github.com/entangelk/job_activate/blob/main/경력기술서.html) | `docs/portfolio/박요한_경력기술서.pdf` |
| AI Writer 포트폴리오 PDF | [AI_Writer_포트폴리오.html](https://github.com/entangelk/job_activate/blob/main/AI_Writer_포트폴리오.html) | `docs/portfolio/박요한_AI_Writer_포트폴리오.pdf` |
| 인쇄·인계 지침 | [경력기술서 HANDOFF](https://github.com/entangelk/job_activate/blob/main/HANDOFF.md) | Tabloid 가로 17×11인치, Chrome PDF |

수정은 원본 HTML에서 하고 PDF를 다시 뽑아 두 곳에 같은 파일을 둔다. 현행 웹을 단순 인쇄한 파일로 원본을 대체하지 않는다. 경력기술서 PDF에는 회사명·서비스명·연락처가 들어 있다. 공개 사본은 사용자가 2026-09-14 직접 올린 파일을 같은 이름으로 교체한 것이며, 웹 페이지에서는 링크하지 않는다.
