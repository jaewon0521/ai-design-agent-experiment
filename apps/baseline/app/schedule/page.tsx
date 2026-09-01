import Link from "next/link";
import { ScheduleTypeBadge } from "@/components/Badges";
import {
  TODAY,
  getMemberName,
  getTodaySchedule,
  schedule,
} from "@/lib/data";
import { formatDate, formatTimeRange } from "@/lib/format";

export default function SchedulePage() {
  const todaySchedule = getTodaySchedule();
  const later = schedule
    .filter((item) => item.date > TODAY)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">오늘의 일정</h2>
        <p className="mt-1 text-sm text-gray-600">
          {formatDate(TODAY)} 팀 일정을 확인합니다.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        {todaySchedule.length === 0 ? (
          <p className="text-sm text-gray-500">오늘 등록된 일정이 없습니다.</p>
        ) : (
          <ol className="space-y-4">
            {todaySchedule.map((item) => (
              <li
                key={item.id}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">
                    {formatTimeRange(item.start, item.end)}
                  </p>
                  <ScheduleTypeBadge type={item.type} />
                </div>
                <p className="mt-1 text-lg">{item.title}</p>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="mt-2 text-sm text-gray-700">
                  참석:{" "}
                  {item.memberIds.map((id, index) => (
                    <span key={id}>
                      {index > 0 ? ", " : ""}
                      <Link
                        href={`/members/${id}`}
                        className="text-blue-700 underline"
                      >
                        {getMemberName(id)}
                      </Link>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {later.length > 0 ? (
        <section className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 font-semibold">이후 일정</h3>
          <ul className="space-y-3">
            {later.map((item) => (
              <li key={item.id}>
                <p className="text-sm text-gray-500">
                  {formatDate(item.date)} · {formatTimeRange(item.start, item.end)}
                </p>
                <p className="font-medium">{item.title}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
