import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getTeamStats } from "@/lib/selectors";
import { SPRINT_NAME } from "@/lib/data";

export function TeamOverview() {
  const stats = getTeamStats();

  const items = [
    {
      label: "팀원",
      value: `${stats.memberCount}명`,
      detail: `진행 ${stats.byStatus.in_progress} · 차단 ${stats.byStatus.blocked}`,
      href: "/members",
    },
    {
      label: "오늘 일정",
      value: `${stats.todayCount}건`,
      detail: "스탠드업, 리뷰, 1:1 포함",
      href: "/schedule",
    },
    {
      label: "업무 진행",
      value: `${stats.averageProgress}%`,
      detail: `${SPRINT_NAME} 평균 진행률`,
      href: "/progress",
    },
    {
      label: "1:1 미팅",
      value: `${stats.meetingsCovered}/${stats.memberCount}`,
      detail:
        stats.meetingsNeeded > 0
          ? `${stats.meetingsNeeded}명 일정 필요`
          : "전원 일정 확보",
      href: "/meetings",
    },
  ];

  return (
    <div className="grid gap-4">
      <Card className={stats.attentionNeeded ? "border-warning" : "border-success"}>
        <p className="text-sm font-medium text-ink-subtle">팀 전체 현황</p>
        <p className="mt-1 text-xl font-semibold text-ink">{stats.healthLabel}</p>
        <p className="mt-1 text-sm text-ink-muted">{stats.healthDetail}</p>
      </Card>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="block h-full rounded-xl border border-line bg-surface p-4 shadow-[var(--ds-shadow-sm)] transition-shadow duration-150 hover:shadow-[var(--ds-shadow-md)]"
            >
              <p className="text-sm text-ink-subtle">{item.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-ink">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
