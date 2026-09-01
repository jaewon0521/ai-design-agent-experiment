import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeetingBadge, StatusBadge } from "@/components/status-badge";
import { ProgressBar } from "@/components/progress-bar";
import { Initials, PageHeader, SectionCard, TextLink } from "@/components/ui";
import {
  getMember,
  getMemberMeetings,
  getMemberTasks,
  members,
  meetingStatusLabel,
  todaySchedule,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "팀원 업무 상태",
};

export function generateStaticParams() {
  return members.map((member) => ({ id: member.id }));
}

export default async function MemberDetailPage({
  params,
}: PageProps<"/members/[id]">) {
  const { id } = await params;
  const member = getMember(id);

  if (!member) {
    notFound();
  }

  const memberTasks = getMemberTasks(member.id);
  const memberMeetings = getMemberMeetings(member.id);
  const todayItems = todaySchedule.filter((item) =>
    item.memberIds.includes(member.id),
  );

  return (
    <>
      <PageHeader
        eyebrow={member.role}
        title={member.name}
        description={`${member.tenure}. 현재 초점은 ${member.focus}입니다.`}
        action={<TextLink href="/members">목록으로</TextLink>}
      />

      <section className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white p-6 shadow-md sm:flex-row sm:items-center">
        <Initials name={member.name} />
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold">{member.currentTask}</h2>
            <StatusBadge status={member.status} />
          </div>
          <ProgressBar label="개인 진행률" value={member.progress} />
          <p className="text-sm text-text/80">
            완료 {member.tasksCompleted} / 전체 {member.tasksTotal}
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="담당 업무">
          {memberTasks.length === 0 ? (
            <p className="text-sm text-text/70">연결된 업무가 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {memberTasks.map((task) => (
                <li key={task.id} className="rounded-lg bg-background p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{task.title}</p>
                    <StatusBadge status={task.status} />
                  </div>
                  <ProgressBar label="진행률" value={task.progress} />
                  <p className="text-sm text-text/70">마감 {task.due}</p>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="오늘 관련 일정">
            {todayItems.length === 0 ? (
              <p className="text-sm text-text/70">오늘 배정된 일정이 없습니다.</p>
            ) : (
              <ul className="space-y-3">
                {todayItems.map((item) => (
                  <li key={item.id} className="rounded-lg bg-background p-3">
                    <p className="text-sm font-semibold tabular-nums">
                      {item.time}–{item.endTime}
                    </p>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-text/70">{item.location}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="1:1 미팅">
            <ul className="space-y-3">
              {memberMeetings.map((meeting) => (
                <li key={meeting.id} className="rounded-lg bg-background p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">
                      {meeting.datetime} {meeting.time}
                    </p>
                    <MeetingBadge
                      status={meeting.status}
                      label={meetingStatusLabel[meeting.status]}
                    />
                  </div>
                  <p className="font-medium">{meeting.topic}</p>
                  <p className="text-sm text-text/70">{meeting.note}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
