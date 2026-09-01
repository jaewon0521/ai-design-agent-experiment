"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterRadios } from "@/components/filter-radios";
import { StatusMark } from "@/components/status";
import {
  dutyFilters,
  initialOf,
  members,
  type DutyStatus,
} from "@/lib/team";

export function MemberDirectory() {
  const [duty, setDuty] = useState<(typeof dutyFilters)[number]>("전체");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim();
    return members.filter((member) => {
      const dutyOk = duty === "전체" || member.duty === duty;
      const textOk =
        needle.length === 0 ||
        member.name.includes(needle) ||
        member.id.toLowerCase().includes(needle.toLowerCase()) ||
        member.role.includes(needle);
      return dutyOk && textOk;
    });
  }, [duty, query]);

  const summary =
    duty === "전체" && query.trim() === ""
      ? `팀원 ${members.length}명`
      : `조건에 맞는 팀원 ${visible.length}명 · 전체 ${members.length}명`;

  return (
    <>
      <div className="stack">
        <FilterRadios
          legend="업무 상태"
          name="duty"
          value={duty}
          options={dutyFilters}
          onChange={setDuty}
        />
        <div className="field">
          <label htmlFor="member-query">이름 또는 번호</label>
          <input
            id="member-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <p className="hint" id="member-query-hint">
            예: 정서윤, TM-101, 프론트
          </p>
        </div>
        <p className="status-live" role="status">
          {summary}
        </p>
      </div>
      {visible.length === 0 ? (
        <div className="empty section-air" data-state="empty">
          <h2>이 조건의 팀원이 없습니다</h2>
          <p>상태 필터나 이름 검색을 넓혀 목록을 다시 확인하세요.</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              data-cta="local"
              disabled={duty === "전체" && query === ""}
              onClick={() => {
                setDuty("전체");
                setQuery("");
              }}
            >
              필터 지우기
            </button>
          </div>
        </div>
      ) : (
        <div className="table-wrap section-air" data-state="ready">
          <table>
            <caption className="sr-only">{summary}</caption>
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>역할</th>
                <th>업무 상태</th>
                <th>보기</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((member) => (
                <tr key={member.id}>
                  <td className="num">{member.id}</td>
                  <td>
                    <span className="initial" aria-hidden="true">
                      {initialOf(member.name)}
                    </span>{" "}
                    {member.name}
                  </td>
                  <td>{member.role}</td>
                  <td>
                    <StatusMark value={member.duty as DutyStatus} />
                  </td>
                  <td>
                    <Link
                      className="row-link"
                      href={`/members/${member.id}`}
                      data-cta="local"
                    >
                      {member.name} 업무 상태 보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
