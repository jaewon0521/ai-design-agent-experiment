import { PageHeader } from "@/components/ui/PageHeader";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { TODAY } from "@/lib/data";
import { formatDateLabel, getTodaySchedule } from "@/lib/selectors";

export const metadata = {
  title: "오늘의 일정",
};

export default function SchedulePage() {
  const items = getTodaySchedule();

  return (
    <div>
      <PageHeader
        eyebrow={formatDateLabel(TODAY)}
        title="오늘의 일정"
        description="팀장 기준 오늘 회의, 리뷰, 1:1, 집중 시간을 시간순으로 보여 줍니다."
      />
      <ScheduleTimeline items={items} />
    </div>
  );
}
