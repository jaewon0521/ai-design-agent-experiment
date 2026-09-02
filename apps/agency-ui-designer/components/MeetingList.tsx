import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { meetingStatusLabel } from "@/lib/data";
import { formatShortDate, getMember } from "@/lib/selectors";
import type { MeetingStatus, OneOnOne } from "@/lib/types";

const tone: Record<MeetingStatus, "info" | "success" | "warning"> = {
  upcoming: "info",
  completed: "success",
  needs_scheduling: "warning",
};

export function MeetingList({ meetings }: { meetings: OneOnOne[] }) {
  if (meetings.length === 0) {
    return (
      <EmptyState
        title="표시할 1:1 미팅이 없습니다"
        description="해당 상태의 미팅이 생기면 목록에 나타납니다."
      />
    );
  }

  return (
    <ul className="grid gap-3">
      {meetings.map((meeting) => {
        const member = getMember(meeting.memberId);
        if (!member) {
          return null;
        }

        return (
          <li
            key={meeting.id}
            className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <Avatar name={member.name} initials={member.initials} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/members/${member.id}`}
                    className="font-medium text-ink underline-offset-2 hover:underline"
                  >
                    {member.name}
                  </Link>
                  <Badge tone={tone[meeting.status]}>
                    {meetingStatusLabel[meeting.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{meeting.topic}</p>
                <p className="mt-1 text-sm text-ink-subtle">{member.role}</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted sm:text-right">
              {meeting.date && meeting.startTime ? (
                <>
                  {formatShortDate(meeting.date)} {meeting.startTime}
                  {meeting.endTime ? `–${meeting.endTime}` : ""}
                </>
              ) : (
                <>
                  일정 미정
                  {meeting.lastMetOn
                    ? ` · 최근 ${formatShortDate(meeting.lastMetOn)}`
                    : null}
                </>
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
