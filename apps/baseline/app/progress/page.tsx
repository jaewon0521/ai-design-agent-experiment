import Link from "next/link";
import { TaskStatusBadge } from "@/components/Badges";
import { ProgressBar } from "@/components/ProgressBar";
import {
  TODAY,
  getMemberName,
  members,
  taskStatusLabel,
  tasks,
} from "@/lib/data";
import { formatDate } from "@/lib/format";

export default function ProgressPage() {
  const sorted = [...tasks].sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (a.status !== "done" && b.status === "done") return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });

  const byStatus = Object.entries(taskStatusLabel).map(([status, label]) => ({
    status,
    label,
    count: tasks.filter((task) => task.status === status).length,
  }));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">업무 진행 상황</h2>
        <p className="mt-1 text-sm text-gray-600">
          팀원별 업무와 진행률을 확인합니다.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {byStatus.map((item) => (
          <div
            key={item.status}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold">{item.count}건</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-semibold">팀원별 진행률</h3>
        <ul className="space-y-4">
          {members.map((member) => {
            const memberTasks = tasks.filter((task) => task.memberId === member.id);
            const average =
              memberTasks.length === 0
                ? 0
                : Math.round(
                    memberTasks.reduce((sum, task) => sum + task.progress, 0) /
                      memberTasks.length,
                  );

            return (
              <li key={member.id}>
                <div className="mb-1 flex items-center justify-between">
                  <Link
                    href={`/members/${member.id}`}
                    className="font-medium text-blue-700 underline"
                  >
                    {member.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {memberTasks.length}건
                  </span>
                </div>
                <ProgressBar value={average} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">업무</th>
              <th className="px-4 py-3 font-medium">담당</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">진행률</th>
              <th className="px-4 py-3 font-medium">마감</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((task) => (
              <tr key={task.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium">{task.title}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/members/${task.memberId}`}
                    className="text-blue-700 underline"
                  >
                    {getMemberName(task.memberId)}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <TaskStatusBadge status={task.status} />
                </td>
                <td className="px-4 py-3 min-w-40">
                  <ProgressBar value={task.progress} />
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatDate(task.dueDate)}
                  {task.dueDate === TODAY && task.status !== "done"
                    ? " · 오늘"
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
