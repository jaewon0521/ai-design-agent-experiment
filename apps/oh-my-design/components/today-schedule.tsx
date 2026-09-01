"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterRadios } from "@/components/filter-radios";
import {
  eventFilters,
  memberById,
  todayEvents,
  type EventKind,
} from "@/lib/team";

export function TodaySchedule() {
  const [kind, setKind] = useState<(typeof eventFilters)[number]>("전체");
  const events = todayEvents();
  const visible = useMemo(
    () => events.filter((event) => kind === "전체" || event.kind === kind),
    [events, kind],
  );

  return (
    <>
      <FilterRadios
        legend="일정 종류"
        name="event-kind"
        value={kind}
        options={eventFilters}
        onChange={setKind}
      />
      <p className="status-live" role="status">
        {kind === "전체"
          ? `오늘 일정 ${events.length}건`
          : `${kind} ${visible.length}건 · 오늘 전체 ${events.length}건`}
      </p>
      {visible.length === 0 ? (
        <div className="empty section-air" data-state="empty">
          <h2>이 종류의 오늘 일정이 없습니다</h2>
          <p>다른 종류를 고르거나 전체 오늘 일정을 다시 보세요.</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              data-cta="local"
              disabled={kind === "전체"}
              onClick={() => setKind("전체")}
            >
              필터 지우기
            </button>
          </div>
        </div>
      ) : (
        <ol className="stack section-air" data-state="ready">
          {visible.map((event) => {
            const person = event.memberId ? memberById(event.memberId) : undefined;
            return (
              <li className="event" key={event.id}>
                <time dateTime={`2026-09-01T${event.time}`}>
                  {event.time}
                </time>
                <div>
                  <p className="kicker">
                    {event.id} · {event.kind as EventKind}
                  </p>
                  <p className="event-title">{event.title}</p>
                  {person ? (
                    <p>
                      <Link className="row-link" href={`/members/${person.id}`}>
                        {person.name} 업무 상태 보기
                      </Link>
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
