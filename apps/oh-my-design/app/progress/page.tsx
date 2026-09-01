import type { Metadata } from "next";
import { WorkProgress } from "@/components/work-progress";
import { SAMPLE_TODAY_LABEL, teamOverview, workItems } from "@/lib/team";

export const metadata: Metadata = {
  title: "업무 진행 상황",
};

export default function ProgressPage() {
  const overview = teamOverview();
  return (
    <main id="main" className="main" tabIndex={-1}>
      <p className="kicker">진행</p>
      <h1 id="page-title" tabIndex={-1}>
        업무 진행 상황
      </h1>
      <p className="lede">
        {SAMPLE_TODAY_LABEL} 샘플 업무 {workItems.length}건입니다. 진행률은
        담당자가 남긴 완료 비율이며, 열린 업무 평균은 {overview.averagePercent}
        %입니다.
      </p>
      <div className="section-air">
        <WorkProgress />
      </div>
    </main>
  );
}
