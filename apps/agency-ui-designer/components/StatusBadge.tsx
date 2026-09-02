import type { TaskStatus, WorkStatus } from "@/lib/types";
import { taskStatusLabel, workStatusLabel } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

const workTone = {
  in_progress: "info",
  blocked: "danger",
  review: "warning",
  done: "success",
  away: "away",
} as const;

const taskTone = {
  todo: "neutral",
  in_progress: "info",
  blocked: "danger",
  review: "warning",
  done: "success",
} as const;

export function WorkStatusBadge({ status }: { status: WorkStatus }) {
  return <Badge tone={workTone[status]}>{workStatusLabel[status]}</Badge>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <Badge tone={taskTone[status]}>{taskStatusLabel[status]}</Badge>;
}
