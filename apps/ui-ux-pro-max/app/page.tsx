import Link from "next/link";
import { AlertIcon, BadgeIcon, CheckIcon } from "@/components/icons";
import { MetricCard } from "@/components/metric-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusBadge } from "@/components/status-badge";
import { Initials, PageHeader, SectionCard, TextLink } from "@/components/ui";
import {
  TODAY_LABEL,
  getMemberName,
  getTeamSummary,
  meetings,
  members,
  tasks,
  todaySchedule,
  workStatusLabel,
} from "@/lib/data";

export default function OverviewPage() {
  const summary = getTeamSummary();
  const blockedMembers = members.filter((member) => member.status === "blocked");
  const todaysMeetings = meetings.filter((meeting) => meeting.datetime === "오늘");
  const openTasks = tasks.filter(
    (task) => task.status !== "done" && task.status !== "leave",
  );

  return (
    <>
      <PageHeader
        eyebrow={TODAY_LABEL}
        title="팀 전체 현황"
        description="프로덕트 스쿼드 A의 인원, 진행률, 오늘 일정, 1:1 미팅을 한 화면에서 확인합니다."
        action={
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-text shadow-sm ring-1 ring-primary/10">
            <BadgeIcon className="h-4 w-4 text-primary" />
            {summary.blockedCount > 0 ? "차단 이슈 있음" : "운영 안정"}
          </p>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="근무 중 인원"
          value={`${summary.workingCount}/${summary.memberCount}`}
          hint="휴가 1명 제외"
        />
        <MetricCard
          label="평균 진행률"
          value={`${summary.avgProgress}%`}
          hint={`열린 업무 ${summary.openTaskCount}건`}
        />
        <MetricCard
          label="오늘 일정"
          value={`${summary.scheduleCount}건`}
          hint={`1:1 ${summary.todaysMeetingCount}건 포함`}
          tone="accent"
        />
        <MetricCard
          label="차단된 팀원"
          value={`${summary.blockedCount}명`}
          hint="권한 대기가 진행을 막고 있음"
          tone={summary.blockedCount > 0 ? "alert" : "default"}
        />
      </section>

      {blockedMembers.length > 0 ? (
        <section className="flex items-start gap-3 rounded-xl border border-primary bg-white p-4 shadow-md">
          <AlertIcon className="mt-0.5 text-primary" />
          <div className="space-y-1">
            <p className="font-semibold">확인이 필요한 업무</p>
            <p className="text-sm text-text/80">
              {blockedMembers.map((member) => member.name).join(", ")} 업무가
              차단되어 있습니다. 오늘 1:1에서 권한과 일정을 맞춥니다.
            </p>
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="팀원별 업무 상태" action={<TextLink href="/status">전체 보기</TextLink>}>
          <ul className="divide-y divide-primary/10">
            {members.map((member) => (
              <li key={member.id}>
                <Link
                  href={`/members/${member.id}`}
                  className="flex items-center gap-3 py-3 transition-colors duration-200 hover:bg-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <Initials name={member.name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{member.name}</p>
                    <p className="truncate text-sm text-text/70">{member.currentTask}</p>
                  </div>
                  <StatusBadge status={member.status} />
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="오늘의 일정" action={<TextLink href="/schedule">일정 보기</TextLink>}>
          <ol className="space-y-3">
            {todaySchedule.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-lg border border-primary/10 bg-background p-3"
              >
                <p className="w-16 shrink-0 text-sm font-semibold tabular-nums">
                  {item.time}
                </p>
                <div className="min-w-0">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-text/70">{item.location}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="업무 진행 상황"
          action={<TextLink href="/progress">진행 상세</TextLink>}
        >
          <ProgressBar label="스쿼드 평균 진행률" value={summary.avgProgress} />
          <ul className="space-y-3">
            {openTasks.slice(0, 4).map((task) => (
              <li key={task.id} className="rounded-lg bg-background p-3">
                <ProgressBar
                  label={`${task.title} · ${getMemberName(task.memberId)}`}
                  value={task.progress}
                />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="오늘 1:1 미팅" action={<TextLink href="/meetings">미팅 전체</TextLink>}>
          <ul className="space-y-3">
            {todaysMeetings.map((meeting) => (
              <li
                key={meeting.id}
                className="rounded-lg border border-primary/10 bg-background p-4 space-y-1"
              >
                <p className="text-sm font-semibold tabular-nums">{meeting.time}</p>
                <p className="font-medium">{getMemberName(meeting.memberId)}</p>
                <p className="text-sm text-text/80">{meeting.topic}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="상태 분포">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(
            [
              ["in_progress", summary.inProgressCount],
              ["review", summary.reviewCount],
              ["blocked", summary.blockedCount],
              ["done", members.filter((member) => member.status === "done").length],
              ["leave", members.filter((member) => member.status === "leave").length],
            ] as const
          ).map(([status, count]) => (
            <li
              key={status}
              className="rounded-lg bg-background p-4 text-center space-y-2"
            >
              <p className="text-2xl font-semibold tabular-nums">{count}</p>
              <p className="text-sm text-text/80">{workStatusLabel[status]}</p>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-2 text-sm text-text/70">
          <CheckIcon className="h-4 w-4 text-primary" />
          완료 업무 {summary.doneTasks}건 · 검토 대기 {summary.reviewCount}명
        </p>
      </SectionCard>
    </>
  );
}
