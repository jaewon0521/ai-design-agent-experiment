"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterRadios } from "@/components/filter-radios";
import { ProgressMeter, StatusMark } from "@/components/status";
import {
  memberById,
  workFilters,
  workItems,
} from "@/lib/team";

export function WorkProgress() {
  const [status, setStatus] = useState<(typeof workFilters)[number]>("전체");
  const visible = useMemo(
    () => workItems.filter((item) => status === "전체" || item.status === status),
    [status],
  );

  return (
    <>
      <FilterRadios
        legend="진행 상태"
        name="work-status"
        value={status}
        options={workFilters}
        onChange={setStatus}
      />
      <p className="status-live" role="status">
        {status === "전체"
          ? `업무 ${workItems.length}건`
          : `${status} ${visible.length}건 · 전체 ${workItems.length}건`}
      </p>
      {visible.length === 0 ? (
        <div className="empty section-air" data-state="empty">
          <h2>이 상태의 업무가 없습니다</h2>
          <p>다른 진행 상태를 고르면 목록이 다시 채워집니다.</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              data-cta="local"
              disabled={status === "전체"}
              onClick={() => setStatus("전체")}
            >
              필터 지우기
            </button>
          </div>
        </div>
      ) : (
        <div className="table-wrap section-air" data-state="ready">
          <table>
            <caption className="sr-only">
              담당자, 업무, 진행률. 진행률은 담당자가 남긴 완료 비율입니다.
            </caption>
            <thead>
              <tr>
                <th>번호</th>
                <th>담당</th>
                <th>업무</th>
                <th>상태</th>
                <th>기한</th>
                <th className="num">진행률</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => {
                const owner = memberById(item.memberId);
                return (
                  <tr key={item.id}>
                    <td className="num">{item.id}</td>
                    <td>
                      {owner ? (
                        <Link className="row-link" href={`/members/${owner.id}`}>
                          {owner.name}
                        </Link>
                      ) : (
                        item.memberId
                      )}
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <StatusMark value={item.status} />
                    </td>
                    <td>{item.dueLabel}</td>
                    <td className="num">
                      <ProgressMeter
                        value={item.percent}
                        label={`${item.title} ${item.percent}퍼센트`}
                        blocked={item.status === "막힘"}
                      />
                    </td>
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
