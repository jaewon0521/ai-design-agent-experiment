import type {
  Member,
  MeetingStatus,
  OneOnOne,
  ScheduleItem,
  ScheduleType,
  Task,
  TaskStatus,
  WorkStatus,
} from "./types";

export const TODAY = "2026-09-01";
export const TEAM_NAME = "프로덕트팀";
export const MANAGER_NAME = "김지훈";

export const members: Member[] = [
  {
    id: "m1",
    name: "이민서",
    role: "프론트엔드",
    email: "minseo.lee@example.com",
    status: "working",
    currentWork: "로그인 화면 개편",
  },
  {
    id: "m2",
    name: "박준혁",
    role: "백엔드",
    email: "junhyuk.park@example.com",
    status: "meeting",
    currentWork: "주문 API 성능 개선",
  },
  {
    id: "m3",
    name: "최수아",
    role: "프로덕트 디자인",
    email: "sua.choi@example.com",
    status: "working",
    currentWork: "온보딩 화면 시안",
  },
  {
    id: "m4",
    name: "정하은",
    role: "QA",
    email: "haeun.jung@example.com",
    status: "working",
    currentWork: "결제 흐름 회귀 테스트",
  },
  {
    id: "m5",
    name: "한도윤",
    role: "프론트엔드",
    email: "doyoon.han@example.com",
    status: "leave",
    currentWork: "연차",
  },
  {
    id: "m6",
    name: "오세린",
    role: "백엔드",
    email: "serin.oh@example.com",
    status: "blocked",
    currentWork: "결제사 연동 대기",
  },
  {
    id: "m7",
    name: "윤태호",
    role: "데이터",
    email: "taeho.yoon@example.com",
    status: "away",
    currentWork: "주간 리포트 쿼리",
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    memberId: "m1",
    title: "로그인 화면 개편",
    progress: 70,
    status: "in-progress",
    dueDate: "2026-09-03",
  },
  {
    id: "t2",
    memberId: "m1",
    title: "공통 버튼 상태 정리",
    progress: 100,
    status: "done",
    dueDate: "2026-08-28",
  },
  {
    id: "t3",
    memberId: "m2",
    title: "주문 API 응답 시간 개선",
    progress: 55,
    status: "in-progress",
    dueDate: "2026-09-04",
  },
  {
    id: "t4",
    memberId: "m2",
    title: "재고 조회 캐시 적용",
    progress: 20,
    status: "todo",
    dueDate: "2026-09-08",
  },
  {
    id: "t5",
    memberId: "m3",
    title: "온보딩 화면 시안",
    progress: 80,
    status: "review",
    dueDate: "2026-09-02",
  },
  {
    id: "t6",
    memberId: "m3",
    title: "설정 화면 와이어프레임",
    progress: 15,
    status: "todo",
    dueDate: "2026-09-09",
  },
  {
    id: "t7",
    memberId: "m4",
    title: "결제 흐름 회귀 테스트",
    progress: 40,
    status: "in-progress",
    dueDate: "2026-09-02",
  },
  {
    id: "t8",
    memberId: "m4",
    title: "회원가입 케이스 정리",
    progress: 100,
    status: "done",
    dueDate: "2026-08-29",
  },
  {
    id: "t9",
    memberId: "m5",
    title: "마이페이지 반응형 수정",
    progress: 30,
    status: "todo",
    dueDate: "2026-09-07",
  },
  {
    id: "t10",
    memberId: "m6",
    title: "결제사 웹훅 연동",
    progress: 45,
    status: "in-progress",
    dueDate: "2026-09-03",
  },
  {
    id: "t11",
    memberId: "m6",
    title: "실패 알림 재시도",
    progress: 0,
    status: "todo",
    dueDate: "2026-09-10",
  },
  {
    id: "t12",
    memberId: "m7",
    title: "주간 리포트 쿼리",
    progress: 65,
    status: "in-progress",
    dueDate: "2026-09-01",
  },
  {
    id: "t13",
    memberId: "m7",
    title: "이탈 지표 대시보드",
    progress: 10,
    status: "todo",
    dueDate: "2026-09-11",
  },
];

export const schedule: ScheduleItem[] = [
  {
    id: "s1",
    title: "팀 스탠드업",
    date: TODAY,
    start: "09:30",
    end: "09:50",
    type: "standup",
    memberIds: ["m1", "m2", "m3", "m4", "m6", "m7"],
    location: "회의실 A",
  },
  {
    id: "s2",
    title: "1:1 미팅 · 이민서",
    date: TODAY,
    start: "11:00",
    end: "11:30",
    type: "one-on-one",
    memberIds: ["m1"],
    location: "화상 회의",
  },
  {
    id: "s3",
    title: "온보딩 시안 리뷰",
    date: TODAY,
    start: "13:00",
    end: "13:40",
    type: "review",
    memberIds: ["m1", "m3", "m4"],
    location: "회의실 B",
  },
  {
    id: "s4",
    title: "1:1 미팅 · 오세린",
    date: TODAY,
    start: "15:00",
    end: "15:30",
    type: "one-on-one",
    memberIds: ["m6"],
    location: "화상 회의",
  },
  {
    id: "s5",
    title: "결제 연동 점검",
    date: TODAY,
    start: "16:30",
    end: "17:10",
    type: "meeting",
    memberIds: ["m2", "m4", "m6"],
    location: "회의실 A",
  },
  {
    id: "s6",
    title: "스프린트 계획",
    date: "2026-09-02",
    start: "10:00",
    end: "11:00",
    type: "meeting",
    memberIds: ["m1", "m2", "m3", "m4", "m6", "m7"],
    location: "회의실 A",
  },
];

export const oneOnOnes: OneOnOne[] = [
  {
    id: "o1",
    memberId: "m1",
    date: TODAY,
    start: "11:00",
    end: "11:30",
    topic: "로그인 개편 진행과 다음 우선순위",
    status: "scheduled",
  },
  {
    id: "o2",
    memberId: "m6",
    date: TODAY,
    start: "15:00",
    end: "15:30",
    topic: "결제사 연동 지연 원인과 대응",
    status: "scheduled",
  },
  {
    id: "o3",
    memberId: "m3",
    date: "2026-09-02",
    start: "14:00",
    end: "14:30",
    topic: "온보딩 시안 피드백",
    status: "scheduled",
  },
  {
    id: "o4",
    memberId: "m2",
    date: "2026-09-03",
    start: "10:30",
    end: "11:00",
    topic: "API 성능 목표와 일정",
    status: "scheduled",
  },
  {
    id: "o5",
    memberId: "m7",
    date: "2026-09-04",
    start: "16:00",
    end: "16:30",
    topic: "주간 리포트 범위 확인",
    status: "scheduled",
  },
  {
    id: "o6",
    memberId: "m4",
    date: "2026-08-28",
    start: "11:00",
    end: "11:30",
    topic: "테스트 일정 조율",
    status: "completed",
  },
  {
    id: "o7",
    memberId: "m5",
    date: "2026-09-08",
    start: "13:30",
    end: "14:00",
    topic: "휴가 복귀 후 업무 인수인계",
    status: "scheduled",
  },
];

export const workStatusLabel: Record<WorkStatus, string> = {
  working: "근무 중",
  meeting: "회의 중",
  away: "자리 비움",
  leave: "휴가",
  blocked: "차단됨",
};

export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: "대기",
  "in-progress": "진행 중",
  review: "리뷰",
  done: "완료",
};

export const scheduleTypeLabel: Record<ScheduleType, string> = {
  standup: "스탠드업",
  meeting: "회의",
  review: "리뷰",
  "one-on-one": "1:1",
  other: "기타",
};

export const meetingStatusLabel: Record<MeetingStatus, string> = {
  scheduled: "예정",
  completed: "완료",
  cancelled: "취소",
};

export function getMember(id: string) {
  return members.find((member) => member.id === id);
}

export function getMemberName(id: string) {
  return getMember(id)?.name ?? "알 수 없음";
}

export function getTasksByMember(memberId: string) {
  return tasks.filter((task) => task.memberId === memberId);
}

export function getTodaySchedule() {
  return schedule
    .filter((item) => item.date === TODAY)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getUpcomingOneOnOnes() {
  return oneOnOnes
    .filter((item) => item.status === "scheduled" && item.date >= TODAY)
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
}

export function getTodayOneOnOnes() {
  return oneOnOnes
    .filter((item) => item.date === TODAY)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getTeamOverview() {
  const statusCounts = members.reduce(
    (acc, member) => {
      acc[member.status] += 1;
      return acc;
    },
    {
      working: 0,
      meeting: 0,
      away: 0,
      leave: 0,
      blocked: 0,
    } as Record<WorkStatus, number>,
  );

  const activeTasks = tasks.filter((task) => task.status !== "done");
  const averageProgress = Math.round(
    tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length,
  );
  const dueToday = tasks.filter(
    (task) => task.dueDate === TODAY && task.status !== "done",
  ).length;
  const blockedMembers = members.filter((member) => member.status === "blocked")
    .length;

  return {
    memberCount: members.length,
    statusCounts,
    activeTaskCount: activeTasks.length,
    doneTaskCount: tasks.filter((task) => task.status === "done").length,
    averageProgress,
    dueToday,
    blockedMembers,
    todayEventCount: getTodaySchedule().length,
    todayOneOnOneCount: getTodayOneOnOnes().length,
    upcomingOneOnOneCount: getUpcomingOneOnOnes().length,
  };
}
