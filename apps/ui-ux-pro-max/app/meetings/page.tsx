import type { Metadata } from "next";
import Link from "next/link";
import { MeetingBadge } from "@/components/status-badge";
import { PageHeader, SectionCard } from "@/components/ui";
import { getMemberName, meetingStatusLabel, meetings } from "@/lib/data";

export const metadata: Metadata = {
  title: "1:1 미팅 일정",
};

export default function MeetingsPage() {
  const today = meetings.filter((meeting) => meeting.datetime === "오늘");
  const upcoming = meetings.filter(
    (meeting) => meeting.datetime !== "오늘" && meeting.status !== "completed",
  );
  const past = meetings.filter((meeting) => meeting.status === "completed");

  return (
    <>
      <PageHeader
        eyebrow="코칭"
        title="1:1 미팅 일정"
        description="오늘 예정된 면담과 이번 주 나머지 1:1, 최근 완료된 면담을 확인합니다."
      />

      <SectionCard title="오늘">
        {today.length === 0 ? (
          <p className="text-sm text-text/70">오늘 예정된 1:1이 없습니다.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {today.map((meeting) => (
              <li key={meeting.id}>
                <MeetingCard meetingId={meeting.id} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <SectionCard title="예정">
        <ul className="space-y-3">
          {upcoming.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meetingId={meeting.id} />
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="최근 완료">
        <ul className="space-y-3">
          {past.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meetingId={meeting.id} />
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}

function MeetingCard({ meetingId }: { meetingId: string }) {
  const meeting = meetings.find((item) => item.id === meetingId);

  if (!meeting) {
    return null;
  }

  return (
    <article className="rounded-xl border border-primary/10 bg-background p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">
          {meeting.datetime} · {meeting.time}
        </p>
        <MeetingBadge
          status={meeting.status}
          label={meetingStatusLabel[meeting.status]}
        />
      </div>
      <h2 className="text-lg font-semibold">
        <Link
          href={`/members/${meeting.memberId}`}
          className="transition-colors duration-200 hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          {getMemberName(meeting.memberId)}
        </Link>
      </h2>
      <p>{meeting.topic}</p>
      <p className="text-sm text-text/70">{meeting.note}</p>
    </article>
  );
}
