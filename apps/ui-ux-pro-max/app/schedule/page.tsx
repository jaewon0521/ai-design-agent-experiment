import type { Metadata } from "next";
import { PageHeader, SectionCard, TextLink } from "@/components/ui";
import {
  TODAY_LABEL,
  getMemberName,
  scheduleKindLabel,
  todaySchedule,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "오늘의 일정",
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow={TODAY_LABEL}
        title="오늘의 일정"
        description="스탠드업, 리뷰, 1:1, 릴리스 점검을 시간 순으로 확인합니다."
      />

      <SectionCard title="타임라인">
        <ol className="space-y-4">
          {todaySchedule.map((item) => (
            <li key={item.id} className="grid gap-4 sm:grid-cols-[7rem_1fr]">
              <div className="text-sm">
                <p className="font-semibold tabular-nums">{item.time}</p>
                <p className="text-text/70 tabular-nums">{item.endTime} 종료</p>
              </div>
              <article className="rounded-xl border border-primary/10 bg-background p-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <span className="rounded-full bg-cta/30 px-2.5 py-1 text-xs font-semibold">
                    {scheduleKindLabel[item.kind]}
                  </span>
                </div>
                <p className="text-sm text-text/80">{item.location}</p>
                <p className="text-sm">
                  참석:{" "}
                  {item.memberIds.map((id) => getMemberName(id)).join(", ")}
                </p>
                {item.kind === "one_on_one" ? (
                  <TextLink href="/meetings">1:1 미팅 일정 보기</TextLink>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </SectionCard>
    </>
  );
}
