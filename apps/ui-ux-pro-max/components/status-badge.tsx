import { workStatusLabel } from "@/lib/data";
import type { MeetingStatus, WorkStatus } from "@/lib/types";

const workStatusClass: Record<WorkStatus, string> = {
  in_progress: "bg-primary/10 text-primary",
  review: "bg-cta/20 text-text",
  done: "bg-white text-text ring-1 ring-primary/20",
  blocked: "bg-primary text-white",
  leave: "bg-white text-text/70 ring-1 ring-primary/15",
};

const meetingStatusClass: Record<MeetingStatus, string> = {
  scheduled: "bg-cta/20 text-text",
  completed: "bg-white text-text ring-1 ring-primary/20",
  rescheduled: "bg-primary/10 text-primary",
};

export function StatusBadge({ status }: { status: WorkStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${workStatusClass[status]}`}
    >
      {workStatusLabel[status]}
    </span>
  );
}

export function MeetingBadge({
  label,
  status,
}: {
  label: string;
  status: MeetingStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${meetingStatusClass[status]}`}
    >
      {label}
    </span>
  );
}
