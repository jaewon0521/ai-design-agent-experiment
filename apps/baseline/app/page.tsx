import Link from "next/link";
import { WorkStatusBadge } from "@/components/Badges";
import { ProgressBar } from "@/components/ProgressBar";
import {
  TODAY,
  getMemberName,
  getTeamOverview,
  getTodayOneOnOnes,
  getTodaySchedule,
  members,
  tasks,
} from "@/lib/data";
import { formatTimeRange } from "@/lib/format";

export default function HomePage() {
  const overview = getTeamOverview();
  const todaySchedule = getTodaySchedule();
  const todayMeetings = getTodayOneOnOnes();
  const activeTasks = tasks
    .filter((task) => task.status !== "done")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">팀 전체 현황</h2>
        <p className="mt-1 text-sm text-gray-600">
          오늘 팀원 상태, 일정, 진행 중인 업무를 한 화면에서 확인합니다.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard label="팀원" value={`${overview.memberCount}명`} />
        <OverviewCard
          label="근무 중 / 회의 중"
          value={`${overview.statusCounts.working} / ${overview.statusCounts.meeting}`}
        />
        <OverviewCard
          label="차단됨 / 휴가"
          value={`${overview.statusCounts.blocked} / ${overview.statusCounts.leave}`}
        />
        <OverviewCard
          label="평균 진행률"
          value={`${overview.averageProgress}%`}
        />
        <OverviewCard
          label="진행 중 업무"
          value={`${overview.activeTaskCount}건`}
        />
        <OverviewCard label="오늘 마감" value={`${overview.dueToday}건`} />
        <OverviewCard
          label="오늘 일정"
          value={`${overview.todayEventCount}건`}
        />
        <OverviewCard
          label="오늘 1:1"
          value={`${overview.todayOneOnOneCount}건`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">팀원 목록 · 업무 상태</h3>
            <Link href="/members" className="text-sm text-blue-700 underline">
              전체 보기
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {members.map((member) => (
              <li key={member.id} className="py-2">
                <Link
                  href={`/members/${member.id}`}
                  className="flex items-start justify-between gap-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">
                      {member.name}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        {member.role}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">{member.currentWork}</p>
                  </div>
                  <WorkStatusBadge status={member.status} />
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">오늘의 일정</h3>
            <Link href="/schedule" className="text-sm text-blue-700 underline">
              전체 보기
            </Link>
          </div>
          {todaySchedule.length === 0 ? (
            <p className="text-sm text-gray-500">오늘 등록된 일정이 없습니다.</p>
          ) : (
            <ul className="space-y-3">
              {todaySchedule.map((item) => (
                <li key={item.id}>
                  <p className="text-sm text-gray-500">
                    {formatTimeRange(item.start, item.end)} · {item.location}
                  </p>
                  <p className="font-medium">{item.title}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">업무 진행 상황</h3>
            <Link href="/progress" className="text-sm text-blue-700 underline">
              전체 보기
            </Link>
          </div>
          <ul className="space-y-4">
            {activeTasks.slice(0, 6).map((task) => (
              <li key={task.id}>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{task.title}</p>
                  <span className="text-xs text-gray-500">
                    {getMemberName(task.memberId)}
                    {task.dueDate === TODAY ? " · 오늘 마감" : ""}
                  </span>
                </div>
                <ProgressBar value={task.progress} />
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">1:1 미팅 일정</h3>
            <Link href="/meetings" className="text-sm text-blue-700 underline">
              전체 보기
            </Link>
          </div>
          {todayMeetings.length === 0 ? (
            <p className="text-sm text-gray-500">오늘 예정된 1:1 미팅이 없습니다.</p>
          ) : (
            <ul className="space-y-3">
              {todayMeetings.map((meeting) => (
                <li key={meeting.id}>
                  <p className="text-sm text-gray-500">
                    {formatTimeRange(meeting.start, meeting.end)}
                  </p>
                  <p className="font-medium">{getMemberName(meeting.memberId)}</p>
                  <p className="text-sm text-gray-600">{meeting.topic}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </div>
  );
}

function OverviewCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
