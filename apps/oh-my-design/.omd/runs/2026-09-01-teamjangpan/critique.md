# Critique — 팀장판

## Axes (1–5)

- Philosophy 4: 막힌 사람과 오늘 일정이 숫자보다 앞. 차트 없음.
- Hierarchy 4: 워드마크 → h1 → 관심/표.
- Execution 3: 토큰·포커스·상태 필터는 있음. 컴파일러 DESIGN.md는 없음.
- Specificity 4: 팀장 운영 화면이지 제네릭 SaaS 랜딩이 아님.
- System Fidelity 3: CSS 토큰+D-id. 채택 DESIGN.md 없음.

## Slop-gate sweep (grep)

- G10 `transition: all`: none
- G28 native `<select`: none
- G48 inline hex in tsx: none
- G7 base not `#000/#fff`: OKLCH paper/ink
- G3 icon tiles: not used
- G42 marketing nav: sidebar rail instead
- GS3 state switcher: none
- GS4 implementation vocab: avoided in UI

## Fixes this round

- Chip radios visible (opacity 0 blocked clicks)
- Raw `<head>` font link caused hydration; moved to CSS `@import`
- AppShell no longer wraps page children in a client tree
