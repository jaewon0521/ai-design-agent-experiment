export type WorkStatus = "in_progress" | "review" | "done" | "blocked" | "leave";

export type MeetingStatus = "scheduled" | "completed" | "rescheduled";

export type ScheduleKind = "standup" | "review" | "one_on_one" | "planning";

export type Member = {
  id: string;
  name: string;
  role: string;
  tenure: string;
  focus: string;
  status: WorkStatus;
  currentTask: string;
  progress: number;
  tasksCompleted: number;
  tasksTotal: number;
};

export type Task = {
  id: string;
  title: string;
  memberId: string;
  status: WorkStatus;
  progress: number;
  due: string;
};

export type ScheduleItem = {
  id: string;
  time: string;
  endTime: string;
  title: string;
  kind: ScheduleKind;
  location: string;
  memberIds: string[];
};

export type OneOnOne = {
  id: string;
  memberId: string;
  datetime: string;
  time: string;
  topic: string;
  status: MeetingStatus;
  note: string;
};
