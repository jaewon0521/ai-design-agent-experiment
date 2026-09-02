export type WorkStatus =
  | "in_progress"
  | "blocked"
  | "review"
  | "done"
  | "away";

export type TaskStatus = "todo" | "in_progress" | "blocked" | "review" | "done";

export type ScheduleKind = "standup" | "meeting" | "review" | "focus" | "one_on_one";

export type MeetingStatus = "upcoming" | "completed" | "needs_scheduling";

export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  workStatus: WorkStatus;
  currentWork: string;
  focusNote: string;
  progress: number;
  initials: string;
};

export type Task = {
  id: string;
  title: string;
  memberId: string;
  status: TaskStatus;
  progress: number;
  dueDate: string;
  area: string;
};

export type ScheduleItem = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  kind: ScheduleKind;
  location: string;
  memberIds: string[];
  note?: string;
};

export type OneOnOne = {
  id: string;
  memberId: string;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  topic: string;
  status: MeetingStatus;
  lastMetOn?: string;
};
