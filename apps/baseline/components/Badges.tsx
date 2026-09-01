import type { TaskStatus, WorkStatus } from "@/lib/types";
import {
  meetingStatusLabel,
  scheduleTypeLabel,
  taskStatusLabel,
  workStatusLabel,
} from "@/lib/data";
import type { MeetingStatus, ScheduleType } from "@/lib/types";

const workStatusClass: Record<WorkStatus, string> = {
  working: "bg-green-100 text-green-800",
  meeting: "bg-blue-100 text-blue-800",
  away: "bg-yellow-100 text-yellow-800",
  leave: "bg-gray-200 text-gray-700",
  blocked: "bg-red-100 text-red-800",
};

const taskStatusClass: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  done: "bg-green-100 text-green-800",
};

const meetingStatusClass: Record<MeetingStatus, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-200 text-gray-700",
};

function Badge({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

export function WorkStatusBadge({ status }: { status: WorkStatus }) {
  return (
    <Badge className={workStatusClass[status]}>{workStatusLabel[status]}</Badge>
  );
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge className={taskStatusClass[status]}>{taskStatusLabel[status]}</Badge>
  );
}

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
  return (
    <Badge className={meetingStatusClass[status]}>
      {meetingStatusLabel[status]}
    </Badge>
  );
}

export function ScheduleTypeBadge({ type }: { type: ScheduleType }) {
  return (
    <Badge className="bg-gray-100 text-gray-700">
      {scheduleTypeLabel[type]}
    </Badge>
  );
}
