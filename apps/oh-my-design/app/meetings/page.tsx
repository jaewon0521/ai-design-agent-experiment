import type { Metadata } from "next";
import { MeetingList } from "@/components/meeting-list";
import { SAMPLE_TODAY_LABEL, thisWeekMeetings } from "@/lib/team";

export const metadata: Metadata = {
  title: "1:1 미팅 일정",
};

export default function MeetingsPage() {
  const count = thisWeekMeetings().length;
  return (
    <main id="main" className="main" tabIndex={-1}>
      <p className="kicker">1:1</p>
      <h1 id="page-title" tabIndex={-1}>
        1:1 미팅 일정
      </h1>
      <p className="lede">
        {SAMPLE_TODAY_LABEL}이 포함된 이번 주 샘플 1:1 {count}건입니다. 오늘만
        보면 당장 앉을 대화를 고릅니다.
      </p>
      <div className="section-air">
        <MeetingList />
      </div>
    </main>
  );
}
