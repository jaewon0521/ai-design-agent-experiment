import Link from "next/link";
import { MeetingList } from "@/components/MeetingList";
import { MemberList } from "@/components/MemberList";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { TaskProgressList } from "@/components/TaskProgressList";
import { TeamOverview } from "@/components/TeamOverview";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { CURRENT_USER, members, tasks, TODAY } from "@/lib/data";
import {
  formatDateLabel,
  getTodaySchedule,
  getUpcomingMeetings,
} from "@/lib/selectors";

export default function HomePage() {
  const todayItems = getTodaySchedule();
  const upcomingMeetings = getUpcomingMeetings().slice(0, 3);
  const spotlightTasks = [...tasks]
    .sort((a, b) => {
      if (a.status === "blocked" && b.status !== "blocked") return -1;
      if (b.status === "blocked" && a.status !== "blocked") return 1;
      return a.dueDate.localeCompare(b.dueDate);
    })
    .slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow={formatDateLabel(TODAY)}
        title={`${CURRENT_USER.name} 님, 오늘 팀 상태를 확인하세요`}
        description="팀원 목록, 업무 상태, 오늘 일정, 진행 상황, 1:1 미팅을 한 화면에서 볼 수 있습니다."
      />

      <TeamOverview />

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="팀원별 업무 상태"
            description="현재 작업과 진행률입니다."
            action={
              <Link
                href="/members"
                className="text-sm font-medium text-brand underline-offset-2 hover:underline"
              >
                전체 보기
              </Link>
            }
          />
          <MemberList members={members} compact />
        </Card>

        <Card>
          <CardHeader
            title="오늘의 일정"
            description={`${todayItems.length}건이 예정되어 있습니다.`}
            action={
              <Link
                href="/schedule"
                className="text-sm font-medium text-brand underline-offset-2 hover:underline"
              >
                일정 전체
              </Link>
            }
          />
          <ScheduleTimeline items={todayItems} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="업무 진행 상황"
            description="차단 이슈와 가까운 마감을 먼저 보여 줍니다."
            action={
              <Link
                href="/progress"
                className="text-sm font-medium text-brand underline-offset-2 hover:underline"
              >
                진행 상세
              </Link>
            }
          />
          <TaskProgressList tasks={spotlightTasks} />
        </Card>

        <Card>
          <CardHeader
            title="다가오는 1:1 미팅"
            description="오늘과 이번 주 예정된 면담입니다."
            action={
              <Link
                href="/meetings"
                className="text-sm font-medium text-brand underline-offset-2 hover:underline"
              >
                미팅 전체
              </Link>
            }
          />
          <MeetingList meetings={upcomingMeetings} />
        </Card>
      </div>
    </div>
  );
}
