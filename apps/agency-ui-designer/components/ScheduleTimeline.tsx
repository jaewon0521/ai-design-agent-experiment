import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { members, scheduleKindLabel } from "@/lib/data";
import type { ScheduleItem } from "@/lib/types";

export function ScheduleTimeline({ items }: { items: ScheduleItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="오늘 등록된 일정이 없습니다"
        description="새로운 회의나 1:1이 생기면 이곳에 표시됩니다."
      />
    );
  }

  return (
    <ol className="grid gap-3">
      {items.map((item) => {
        const people = members.filter((member) =>
          item.memberIds.includes(member.id),
        );
        return (
          <li
            key={item.id}
            className="grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
          >
            <p className="font-mono text-sm font-medium text-brand">
              <time dateTime={`${item.date}T${item.startTime}`}>
                {item.startTime}
              </time>
              <span className="text-ink-subtle">–{item.endTime}</span>
            </p>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-ink">{item.title}</h3>
                <Badge tone="brand">{scheduleKindLabel[item.kind]}</Badge>
              </div>
              <p className="mt-1 text-sm text-ink-subtle">{item.location}</p>
              {item.note ? (
                <p className="mt-2 text-sm text-ink-muted">{item.note}</p>
              ) : null}
              {people.length > 0 ? (
                <p className="mt-2 text-sm text-ink-subtle">
                  참석:{" "}
                  {people.map((person, index) => (
                    <span key={person.id}>
                      {index > 0 ? ", " : null}
                      <Link
                        className="font-medium text-brand underline-offset-2 hover:underline"
                        href={`/members/${person.id}`}
                      >
                        {person.name}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : (
                <p className="mt-2 text-sm text-ink-subtle">개인 일정</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
