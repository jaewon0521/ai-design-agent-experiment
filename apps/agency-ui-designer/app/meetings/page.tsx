import { MeetingList } from "@/components/MeetingList";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { oneOnOnes } from "@/lib/data";
import { getTeamStats } from "@/lib/selectors";

export const metadata = {
  title: "1:1 미팅",
};

export default function MeetingsPage() {
  const stats = getTeamStats();
  const upcoming = oneOnOnes.filter((meeting) => meeting.status === "upcoming");
  const needed = oneOnOnes.filter((meeting) => meeting.status === "needs_scheduling");
  const completed = oneOnOnes.filter((meeting) => meeting.status === "completed");

  return (
    <div>
      <PageHeader
        title="1:1 미팅 일정"
        description={`이번 주기 ${stats.meetingsCovered}명 일정이 잡혀 있고, ${stats.meetingsNeeded}명은 아직 미정입니다.`}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader
            title="일정 필요"
            description="아직 다음 1:1이 없는 팀원입니다."
          />
          <MeetingList meetings={needed} />
        </Card>
        <Card>
          <CardHeader title="예정된 미팅" description="날짜가 확정된 1:1입니다." />
          <MeetingList meetings={upcoming} />
        </Card>
        <Card>
          <CardHeader title="최근 완료" description="이번 주 진행한 1:1입니다." />
          <MeetingList meetings={completed} />
        </Card>
      </div>
    </div>
  );
}
