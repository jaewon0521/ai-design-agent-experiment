import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MeetingList } from "@/components/MeetingList";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { WorkStatusBadge } from "@/components/StatusBadge";
import { TaskProgressList } from "@/components/TaskProgressList";
import { members } from "@/lib/data";
import {
  getMember,
  getMemberMeetings,
  getMemberTasks,
  getTodaySchedule,
} from "@/lib/selectors";

export function generateStaticParams() {
  return members.map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/members/[id]">) {
  const { id } = await params;
  const member = getMember(id);
  return {
    title: member ? member.name : "팀원을 찾을 수 없음",
  };
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
  const meetings = getMemberMeetings(member.id);
  const todayItems = getTodaySchedule().filter((item) =>
    item.memberIds.includes(member.id),
  );

  return (
    <div>
      <p className="mb-4">
        <Link
          href="/members"
          className="text-sm font-medium text-brand underline-offset-2 hover:underline"
        >
          팀원 목록으로
        </Link>
      </p>
      <PageHeader
        title={member.name}
        description={member.role}
        actions={
          <div className="flex items-center gap-3">
            <Avatar name={member.name} initials={member.initials} size="lg" />
          </div>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <WorkStatusBadge status={member.workStatus} />
          <p className="text-sm text-ink-subtle">{member.email}</p>
        </div>
        <p className="mt-4 text-base text-ink">{member.currentWork}</p>
        <p className="mt-2 text-sm text-ink-muted">{member.focusNote}</p>
        <div className="mt-4 max-w-md">
          <ProgressBar value={member.progress} label="개인 업무 진행률" />
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="담당 업무" description="이 팀원의 진행 중인 작업입니다." />
          <TaskProgressList tasks={memberTasks} />
        </Card>
        <div className="grid gap-6">
          <Card>
            <CardHeader title="오늘 관련 일정" />
            <ScheduleTimeline items={todayItems} />
          </Card>
          <Card>
            <CardHeader title="1:1 미팅" />
            <MeetingList meetings={meetings} />
          </Card>
        </div>
      </div>
    </div>
  );
}
