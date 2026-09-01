# 팀장판 — philosophy and decisions

## Philosophy

오늘 막힌 사람과 다가온 1:1이, 요약 숫자보다 먼저 보여야 한다.

- P1 관심 우선: 막힘·오늘 일정·오늘 1:1을 맨 앞에 둔다. 희생: 스파크라인·장식 차트.
- P2 기록 우선: 이름과 보이는 번호(TM/WK/MT)로 찾는다. 희생: 아바타 히어로·아이콘 타일 그리드.
- P3 선으로 구분: 종이에 가로 룰. 희생: 그림자 카드 키트·큰 라운드.

## Derive

| ID | Decision | Rationale |
|---|---|---|
| D-P1-1 | Surface = hairline-rule bands | Ops density (visual contract §5e). |
| D-P1-2 | Accent ≤5%, attention + one primary | P1 signal, G23. |
| D-P2-1 | Left-max product rail + table grammar | C32 product, P-PR-43, P-DB-05. |
| D-P2-2 | Pretendard only; display = weight 800 | Korean §5a; no Latin display fallback. |
| D-P3-1 | Radius 4px on controls; 0 on plates | One genre, not widget kit. |
| D-P3-2 | Motion 150/200/250ms, ease-out/in | omd-feel cheat-sheet. |
| D-P3-3 | OKLCH warm paper, cool ink, one blue | G7 G22; not purple gradient. |

## Layout grammar

- `/` 좌측 관심 목록 + 우측 오늘 일정/1:1 (wide column add).
- `/members` 필터 칩 + 표.
- `/members/[id]` 마스터에서 온 드릴다운 (P-DB-06).
- `/schedule` `/progress` `/meetings` 정의 라인 + 표/리스트.
