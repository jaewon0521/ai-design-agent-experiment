import Link from "next/link";
import { MeetingStatusBadge } from "@/components/Badges";
import {
  TODAY,
  getMemberName,
  getTodayOneOnOnes,
  getUpcomingOneOnOnes,
  oneOnOnes,
} from "@/lib/data";
import { formatDate, formatTimeRange } from "@/lib/format";

export default function MeetingsPage() {
  const todayMeetings = getTodayOneOnOnes();
  const upcoming = getUpcomingOneOnOnes().filter((item) => item.date !== TODAY);
  const past = oneOnOnes
    .filter((item) => item.date < TODAY || item.status === "completed")
    .sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">1:1 미팅 일정</h2>
        <p className="mt-1 text-sm text-gray-600">
          팀원과의 1:1 미팅 일정을 확인합니다.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">오늘</h3>
        {todayMeetings.length === 0 ? (
          <p className="text-sm text-gray-500">오늘 예정된 1:1 미팅이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {todayMeetings.map((meeting) => (
              <li
                key={meeting.id}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">
                    <Link
                      href={`/members/${meeting.memberId}`}
                      className="text-blue-700 underline"
                    >
                      {getMemberName(meeting.memberId)}
                    </Link>
                  </p>
                  <MeetingStatusBadge status={meeting.status} />
                </div>
                <p className="text-sm text-gray-500">
                  {formatTimeRange(meeting.start, meeting.end)}
                </p>
                <p className="mt-1 text-sm text-gray-700">{meeting.topic}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">예정</h3>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-500">예정된 이후 1:1 미팅이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {upcoming.map((meeting) => (
              <li key={meeting.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">
                    <Link
                      href={`/members/${meeting.memberId}`}
                      className="text-blue-700 underline"
                    >
                      {getMemberName(meeting.memberId)}
                    </Link>
                  </p>
                  <MeetingStatusBadge status={meeting.status} />
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(meeting.date)} ·{" "}
                  {formatTimeRange(meeting.start, meeting.end)}
                </p>
                <p className="mt-1 text-sm text-gray-700">{meeting.topic}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">지난 미팅</h3>
        {past.length === 0 ? (
          <p className="text-sm text-gray-500">지난 1:1 미팅이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {past.map((meeting) => (
              <li key={meeting.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{getMemberName(meeting.memberId)}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(meeting.date)} ·{" "}
                    {formatTimeRange(meeting.start, meeting.end)}
                  </p>
                  <p className="text-sm text-gray-700">{meeting.topic}</p>
                </div>
                <MeetingStatusBadge status={meeting.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
