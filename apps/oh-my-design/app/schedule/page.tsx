import type { Metadata } from "next";
import { TodaySchedule } from "@/components/today-schedule";
import { SAMPLE_TODAY_LABEL, todayEvents } from "@/lib/team";

export const metadata: Metadata = {
  title: "오늘의 일정",
};

export default function SchedulePage() {
  const count = todayEvents().length;
  return (
    <main id="main" className="main" tabIndex={-1}>
      <p className="kicker">일정</p>
      <h1 id="page-title" tabIndex={-1}>
        오늘의 일정
      </h1>
      <p className="lede">
        {SAMPLE_TODAY_LABEL} 샘플 일정 {count}건입니다. 종류로 걸러 오늘 할 말을
        고릅니다.
      </p>
      <div className="section-air">
        <TodaySchedule />
      </div>
    </main>
  );
}
