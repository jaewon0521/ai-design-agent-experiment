# Data inventory

1. Provided fixtures: none (`data/*.json`, API, ORM 없음).
2. Declared contracts: none.
3. Brief-implied records: 팀원, 업무 상태, 오늘 일정, 진행 상황, 1:1, 팀 현황.

Mode: autonomous. No live backend. Sample records live in `lib/team.ts` and are labeled on-screen as 샘플 기록. Aggregates are computed from those records at runtime.

Operational calendar date frozen as 2026-09-01 to match the experiment clock so “오늘” journeys remain reachable.
