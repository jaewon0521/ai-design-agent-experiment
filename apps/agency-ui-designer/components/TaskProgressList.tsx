import Link from "next/link";
import { TaskStatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatShortDate, getMember, isOverdue } from "@/lib/selectors";
import type { Task } from "@/lib/types";

export function TaskProgressList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="표시할 업무가 없습니다"
        description="선택한 조건에 맞는 업무가 없습니다."
      />
    );
  }

  return (
    <ul className="grid gap-3">
      {tasks.map((task) => {
        const member = getMember(task.memberId);
        const overdue = isOverdue(task.dueDate, task.status);

        return (
          <li
            key={task.id}
            className="rounded-xl border border-line bg-surface p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium text-ink">{task.title}</p>
                <p className="mt-1 text-sm text-ink-subtle">
                  {task.area}
                  {member ? (
                    <>
                      {" · "}
                      <Link
                        href={`/members/${member.id}`}
                        className="font-medium text-brand underline-offset-2 hover:underline"
                      >
                        {member.name}
                      </Link>
                    </>
                  ) : null}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <TaskStatusBadge status={task.status} />
                <span
                  className={
                    overdue
                      ? "text-sm font-medium text-danger"
                      : "text-sm text-ink-subtle"
                  }
                >
                  {overdue ? "기한 지남 " : "마감 "}
                  {formatShortDate(task.dueDate)}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={task.progress}
                label={`${task.title} 진행률`}
                tone={
                  overdue || task.status === "blocked"
                    ? "danger"
                    : task.status === "done"
                      ? "success"
                      : "brand"
                }
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
