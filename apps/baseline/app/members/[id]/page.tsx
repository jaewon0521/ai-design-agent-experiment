import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MeetingStatusBadge,
  TaskStatusBadge,
  WorkStatusBadge,
} from "@/components/Badges";
import { ProgressBar } from "@/components/ProgressBar";
import {
  getMember,
  getTasksByMember,
  getTodaySchedule,
  oneOnOnes,
} from "@/lib/data";
import { formatDate, formatTimeRange } from "@/lib/format";

export default async function MemberDetailPage({
  params,
}: PageProps<"/members/[id]">) {
  const { id } = await params;
  const member = getMember(id);

  if (!member) {
    notFound();
  }

  const memberTasks = getTasksByMember(member.id);
  const memberMeetings = oneOnOnes
    .filter((meeting) => meeting.memberId === member.id)
    .sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`));
  const todayItems = getTodaySchedule().filter((item) =>
    item.memberIds.includes(member.id),
  );

  return (
    <div className="space-y-6">
      <p>
        <Link href="/members" className="text-sm text-blue-700 underline">
          팀원 목록으로
        </Link>
      </p>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-sm text-gray-600">
              {member.role} · {member.email}
            </p>
          </div>
          <WorkStatusBadge status={member.status} />
        </div>
        <p className="mt-4 text-sm">
          <span className="text-gray-500">현재 업무</span>
          <span className="ml-2 font-medium">{member.currentWork}</span>
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">오늘 참여 일정</h3>
        {todayItems.length === 0 ? (
          <p className="text-sm text-gray-500">오늘 참여하는 일정이 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {todayItems.map((item) => (
              <li key={item.id} className="text-sm">
                <span className="text-gray-500">
                  {formatTimeRange(item.start, item.end)}
                </span>
                <span className="ml-2 font-medium">{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">업무 진행 상황</h3>
        {memberTasks.length === 0 ? (
          <p className="text-sm text-gray-500">배정된 업무가 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {memberTasks.map((task) => (
              <li key={task.id}>
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{task.title}</p>
                  <TaskStatusBadge status={task.status} />
                </div>
                <p className="mb-2 text-xs text-gray-500">
                  마감 {formatDate(task.dueDate)}
                </p>
                <ProgressBar value={task.progress} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">1:1 미팅</h3>
        {memberMeetings.length === 0 ? (
          <p className="text-sm text-gray-500">등록된 1:1 미팅이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {memberMeetings.map((meeting) => (
              <li key={meeting.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    {formatDate(meeting.date)} ·{" "}
                    {formatTimeRange(meeting.start, meeting.end)}
                  </p>
                  <p className="font-medium">{meeting.topic}</p>
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
