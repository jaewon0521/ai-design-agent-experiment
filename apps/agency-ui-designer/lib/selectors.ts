import { members, oneOnOnes, schedule, tasks, TODAY } from "./data";
import type { Member, OneOnOne, Task, WorkStatus } from "./types";

export function getMember(id: string): Member | undefined {
  return members.find((member) => member.id === id);
}

export function getMemberTasks(memberId: string): Task[] {
  return tasks.filter((task) => task.memberId === memberId);
}

export function getMemberMeetings(memberId: string): OneOnOne[] {
  return oneOnOnes.filter((meeting) => meeting.memberId === memberId);
}

export function getMembersByStatus(status?: string): Member[] {
  if (!status || status === "all") {
    return members;
  }

  return members.filter((member) => member.workStatus === status);
}

export function getTodaySchedule() {
  return [...schedule]
    .filter((item) => item.date === TODAY)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getUpcomingMeetings() {
  return oneOnOnes
    .filter((meeting) => meeting.status === "upcoming")
    .sort((a, b) => {
      const dateA = `${a.date ?? ""} ${a.startTime ?? ""}`;
      const dateB = `${b.date ?? ""} ${b.startTime ?? ""}`;
      return dateA.localeCompare(dateB);
    });
}

export function getTeamStats() {
  const byStatus = members.reduce(
    (acc, member) => {
      acc[member.workStatus] += 1;
      return acc;
    },
    {
      in_progress: 0,
      blocked: 0,
      review: 0,
      done: 0,
      away: 0,
    } as Record<WorkStatus, number>,
  );

  const taskTotal = tasks.length;
  const taskDone = tasks.filter((task) => task.status === "done").length;
  const taskBlocked = tasks.filter((task) => task.status === "blocked").length;
  const averageProgress = Math.round(
    members.reduce((sum, member) => sum + member.progress, 0) / members.length,
  );
  const meetingsCovered = oneOnOnes.filter(
    (meeting) => meeting.status !== "needs_scheduling",
  ).length;
  const meetingsNeeded = oneOnOnes.filter(
    (meeting) => meeting.status === "needs_scheduling",
  ).length;
  const todayCount = getTodaySchedule().length;
  const attentionNeeded = byStatus.blocked > 0 || meetingsNeeded > 0;

  return {
    memberCount: members.length,
    byStatus,
    taskTotal,
    taskDone,
    taskBlocked,
    averageProgress,
    meetingsCovered,
    meetingsNeeded,
    todayCount,
    attentionNeeded,
    healthLabel: attentionNeeded ? "주의가 필요합니다" : "대체로 안정적입니다",
    healthDetail: attentionNeeded
      ? "차단된 업무와 미정인 1:1이 있어 확인이 필요합니다."
      : "차단 이슈 없이 스프린트가 진행되고 있습니다.",
  };
}

export function formatDateLabel(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(
    "ko-KR",
    { weekday: "long", timeZone: "UTC" },
  );
  return `${year}년 ${month}월 ${day}일 ${weekday}`;
}

export function formatShortDate(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)}/${Number(day)}`;
}

export function isOverdue(dueDate: string, status: Task["status"]): boolean {
  return status !== "done" && dueDate < TODAY;
}
