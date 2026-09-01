export type WorkStatus =
  | "working"
  | "meeting"
  | "away"
  | "leave"
  | "blocked";

export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type ScheduleType = "standup" | "meeting" | "review" | "one-on-one" | "other";

export type MeetingStatus = "scheduled" | "completed" | "cancelled";

export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: WorkStatus;
  currentWork: string;
};

export type Task = {
  id: string;
  memberId: string;
  title: string;
  progress: number;
  status: TaskStatus;
  dueDate: string;
};

export type ScheduleItem = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  type: ScheduleType;
  memberIds: string[];
  location: string;
};

export type OneOnOne = {
  id: string;
  memberId: string;
  date: string;
  start: string;
  end: string;
  topic: string;
  status: MeetingStatus;
};
