"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterRadios } from "@/components/filter-radios";
import {
  SAMPLE_TODAY,
  memberById,
  thisWeekMeetings,
} from "@/lib/team";

const whenFilters = ["이번 주", "오늘"] as const;

function dateLabel(date: string) {
  if (date === SAMPLE_TODAY) return "오늘";
  if (date === "2026-09-02") return "9월 2일 수";
  if (date === "2026-09-03") return "9월 3일 목";
  if (date === "2026-09-04") return "9월 4일 금";
  return date;
}

export function MeetingList() {
  const [when, setWhen] = useState<(typeof whenFilters)[number]>("이번 주");
  const week = thisWeekMeetings();
  const visible = useMemo(
    () =>
      when === "오늘" ? week.filter((meeting) => meeting.date === SAMPLE_TODAY) : week,
    [when, week],
  );

  return (
    <>
      <FilterRadios
        legend="기간"
        name="meeting-when"
        value={when}
        options={whenFilters}
        onChange={setWhen}
      />
      <p className="status-live" role="status">
        {when === "오늘"
          ? `오늘 1:1 ${visible.length}건 · 이번 주 ${week.length}건`
          : `이번 주 1:1 ${visible.length}건`}
      </p>
      {visible.length === 0 ? (
        <div className="empty section-air" data-state="empty">
          <h2>이 기간의 1:1이 없습니다</h2>
          <p>이번 주 전체 일정을 보면 남은 대화를 확인할 수 있습니다.</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              data-cta="local"
              disabled={when === "이번 주"}
              onClick={() => setWhen("이번 주")}
            >
              이번 주 보기
            </button>
          </div>
        </div>
      ) : (
        <div className="table-wrap section-air" data-state="ready">
          <table>
            <caption className="sr-only">1:1 미팅 번호, 시각, 상대, 주제</caption>
            <thead>
              <tr>
                <th>번호</th>
                <th>때</th>
                <th>상대</th>
                <th>주제</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((meeting) => {
                const person = memberById(meeting.memberId);
                return (
                  <tr key={meeting.id}>
                    <td className="num">{meeting.id}</td>
                    <td>
                      {dateLabel(meeting.date)} {meeting.time}
                    </td>
                    <td>
                      {person ? (
                        <Link className="row-link" href={`/members/${person.id}`}>
                          {person.name}
                        </Link>
                      ) : (
                        meeting.memberId
                      )}
                    </td>
                    <td>{meeting.topic}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
