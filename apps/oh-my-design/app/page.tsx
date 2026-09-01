import type { Metadata } from "next";
import Link from "next/link";
import { StatusMark } from "@/components/status";
import {
  SAMPLE_TODAY_LABEL,
  blockedMembers,
  meetingsOn,
  SAMPLE_TODAY,
  memberById,
  teamOverview,
  todayEvents,
} from "@/lib/team";

export const metadata: Metadata = {
  title: "팀 전체 현황",
};

export default function HomePage() {
  const overview = teamOverview();
  const blocked = blockedMembers();
  const events = todayEvents().slice(0, 4);
  const meetings = meetingsOn(SAMPLE_TODAY);

  return (
    <main id="main" className="main" tabIndex={-1}>
      <p className="kicker">팀장 화면</p>
      <h1 id="page-title" tabIndex={-1}>
        팀 전체 현황
      </h1>
      <p className="lede">
        {SAMPLE_TODAY_LABEL} 기준으로, 누가 막혀 있고 오늘 무엇이 있는지만 먼저
        봅니다. 숫자는 아래 팀원·업무 기록에서 계산했습니다.
      </p>
      <div className="actions">
        <Link className="btn" href="/members" data-cta="primary">
          팀원 목록 보기
        </Link>
        <Link className="btn" href="/schedule" data-cta="local">
          오늘의 일정 보기
        </Link>
      </div>

      <section className="section-air" aria-labelledby="kpi-heading">
        <h2 id="kpi-heading">한눈에 보는 수</h2>
        <p className="lede">
          근무 인원 = 휴가 아닌 팀원. 열린 업무 = 완료가 아닌 업무. 평균
          진행률 = 열린 업무 진행률의 산술 평균.
        </p>
        <dl className="kpi-grid">
          <div className="kpi">
            <dt>팀원</dt>
            <dd>{overview.memberCount}</dd>
            <p>명 · 근무 {overview.workingCount}명</p>
          </div>
          <div className="kpi">
            <dt>막힘</dt>
            <dd>{overview.blockedCount}</dd>
            <p>명 · 대기 {overview.waitingCount}명</p>
          </div>
          <div className="kpi">
            <dt>오늘 일정</dt>
            <dd>{overview.todayEventCount}</dd>
            <p>건 · 오늘 1:1 {overview.todayMeetingCount}건</p>
          </div>
          <div className="kpi">
            <dt>열린 업무 평균</dt>
            <dd>{overview.averagePercent}%</dd>
            <p>열린 업무 {overview.openWorkCount}건</p>
          </div>
        </dl>
      </section>

      <div className="split section-air">
        <section aria-labelledby="blocked-heading">
          <h2 id="blocked-heading">지금 막힌 사람</h2>
          {blocked.length === 0 ? (
            <div className="empty" data-state="empty">
              <p>막힘 상태인 팀원이 없습니다.</p>
            </div>
          ) : (
            <ul className="stack">
              {blocked.map((member) => (
                <li key={member.id}>
                  <p className="kicker">
                    {member.id} · {member.role}
                  </p>
                  <p>
                    <Link className="row-link" href={`/members/${member.id}`}>
                      {member.name}
                    </Link>
                  </p>
                  <StatusMark value={member.duty} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="today-heading">
          <h2 id="today-heading">오늘 앞에 있는 일</h2>
          <ol>
            {events.map((event) => (
              <li className="event" key={event.id}>
                <time dateTime={`${SAMPLE_TODAY}T${event.time}`}>{event.time}</time>
                <div>
                  <p className="kicker">
                    {event.kind}
                    {event.memberId && memberById(event.memberId)
                      ? ` · ${memberById(event.memberId)?.name}`
                      : ""}
                  </p>
                  <p>{event.title}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="lede">
            오늘 1:1 {meetings.length}건 —{" "}
            {meetings
              .map((meeting) => memberById(meeting.memberId)?.name)
              .filter(Boolean)
              .join(", ")}
          </p>
          <div className="actions">
            <Link className="btn" href="/meetings" data-cta="local">
              1:1 미팅 일정 보기
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
