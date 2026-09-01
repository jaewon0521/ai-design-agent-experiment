import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressMeter, StatusMark } from "@/components/status";
import {
  members,
  meetingsOn,
  SAMPLE_TODAY,
  memberById,
  workForMember,
} from "@/lib/team";

type MemberPageProps = PageProps<"/members/[id]">;

export function generateStaticParams() {
  return members.map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = memberById(id);
  return {
    title: member ? `${member.name} 업무 상태` : "없는 팀원",
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const member = memberById(id);
  if (!member) notFound();

  const work = workForMember(member.id);
  const todayMeetings = meetingsOn(SAMPLE_TODAY).filter(
    (meeting) => meeting.memberId === member.id,
  );

  return (
    <main id="main" className="main" tabIndex={-1}>
      <nav aria-label="위치">
        <ol className="crumb">
          <li>
            <Link href="/members">팀원 목록</Link>
          </li>
          <li aria-current="page">{member.name}</li>
        </ol>
      </nav>
      <p className="kicker">
        {member.id} · {member.role}
      </p>
      <h1 id="page-title" tabIndex={-1}>
        {member.name} 업무 상태
      </h1>
      <p className="lede">
        이 사람에게 붙어 있는 샘플 업무 {work.length}건입니다. 팀 상태는{" "}
        {member.duty}
        입니다.
      </p>
      <StatusMark value={member.duty} />

      {todayMeetings.length > 0 ? (
        <p className="lede">
          오늘 1:1 {todayMeetings.map((meeting) => meeting.time).join(", ")} ·{" "}
          {todayMeetings.map((meeting) => meeting.topic).join(" / ")}
        </p>
      ) : (
        <p className="lede">오늘 잡힌 1:1은 없습니다.</p>
      )}

      {work.length === 0 ? (
        <div className="empty section-air" data-state="empty">
          <h2>연결된 업무가 없습니다</h2>
          <p>다른 팀원의 진행 상황을 보려면 목록으로 돌아가세요.</p>
        </div>
      ) : (
        <div className="table-wrap section-air" data-state="ready">
          <table>
            <caption className="sr-only">{member.name}의 업무와 진행률</caption>
            <thead>
              <tr>
                <th>번호</th>
                <th>업무</th>
                <th>상태</th>
                <th>기한</th>
                <th className="num">진행률</th>
              </tr>
            </thead>
            <tbody>
              {work.map((item) => (
                <tr key={item.id}>
                  <td className="num">{item.id}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="actions">
        <Link className="btn" href="/progress" data-cta="local">
          업무 진행 상황 보기
        </Link>
        <Link className="btn" href="/members" data-cta="local">
          팀원 목록으로
        </Link>
      </div>
    </main>
  );
}
