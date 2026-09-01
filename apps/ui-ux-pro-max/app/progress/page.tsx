import type { Metadata } from "next";
import Link from "next/link";
import { ProgressBar } from "@/components/progress-bar";
import { StatusBadge } from "@/components/status-badge";
import { PageHeader, SectionCard } from "@/components/ui";
import { getMemberName, getTeamSummary, members, tasks } from "@/lib/data";

export const metadata: Metadata = {
  title: "업무 진행 상황",
};

export default function ProgressPage() {
  const summary = getTeamSummary();
  const sortedTasks = [...tasks].sort((a, b) => a.progress - b.progress);

  return (
    <>
      <PageHeader
        eyebrow="진행률"
        title="업무 진행 상황"
        description="사람별 진행률과 업무 단위 진척을 함께 확인해 병목을 찾습니다."
      />

      <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-md">
        <ProgressBar label="스쿼드 평균 진행률" value={summary.avgProgress} />
        <p className="mt-3 text-sm text-text/80">
          열린 업무 {summary.openTaskCount}건 · 완료 {summary.doneTasks}건
        </p>
      </section>

      <SectionCard title="팀원별 진행률">
        <ul className="space-y-4">
          {members.map((member) => (
            <li key={member.id}>
              <Link
                href={`/members/${member.id}`}
                className="block rounded-lg bg-background p-4 transition-shadow duration-200 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-semibold">
                    {member.name}
                    <span className="ml-2 text-sm font-medium text-text/70">
                      {member.role}
                    </span>
                  </p>
                  <StatusBadge status={member.status} />
                </div>
                <ProgressBar label={member.currentTask} value={member.progress} />
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="업무 단위 진척">
        <ul className="space-y-3">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="rounded-lg border border-primary/10 bg-background p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{task.title}</p>
                <StatusBadge status={task.status} />
              </div>
              <ProgressBar
                label={`${getMemberName(task.memberId)} · 마감 ${task.due}`}
                value={task.progress}
              />
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
