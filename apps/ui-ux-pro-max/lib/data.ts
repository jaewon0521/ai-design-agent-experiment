import type {
  Member,
  MeetingStatus,
  OneOnOne,
  ScheduleItem,
  ScheduleKind,
  Task,
  WorkStatus,
} from "./types";

export const TODAY_LABEL = "2026년 9월 1일 화요일";
export const TEAM_NAME = "프로덕트 스쿼드 A";
export const LEADER_NAME = "강태호";

export const members: Member[] = [
  {
    id: "seoyeon",
    name: "김서연",
    role: "프론트엔드",
    tenure: "3년차 · 결제 도메인 담당",
    focus: "결제 오류 복구 화면",
    status: "in_progress",
    currentTask: "결제 실패 복구 플로우 구현",
    progress: 68,
    tasksCompleted: 5,
    tasksTotal: 8,
  },
  {
    id: "junho",
    name: "박준호",
    role: "백엔드",
    tenure: "5년차 · API 안정성 리드",
    focus: "정산 배치 지연 해소",
    status: "review",
    currentTask: "정산 배치 재시도 정책 리뷰",
    progress: 90,
    tasksCompleted: 7,
    tasksTotal: 8,
  },
  {
    id: "haneul",
    name: "이하늘",
    role: "프로덕트 디자인",
    tenure: "4년차 · 온보딩 경험 담당",
    focus: "신규 입사자 온보딩",
    status: "in_progress",
    currentTask: "온보딩 체크리스트 화면 시안",
    progress: 44,
    tasksCompleted: 3,
    tasksTotal: 7,
  },
  {
    id: "minjae",
    name: "최민재",
    role: "QA",
    tenure: "2년차 · 회귀 테스트 담당",
    focus: "스테이징 배포 검증",
    status: "blocked",
    currentTask: "스테이징 계정 권한 대기",
    progress: 21,
    tasksCompleted: 2,
    tasksTotal: 6,
  },
  {
    id: "yujin",
    name: "정유진",
    role: "프로덕트 매니저",
    tenure: "6년차 · 스쿼드 백로그 오너",
    focus: "3분기 우선순위 확정",
    status: "in_progress",
    currentTask: "이번 주 릴리스 범위 확정",
    progress: 55,
    tasksCompleted: 4,
    tasksTotal: 7,
  },
  {
    id: "jihun",
    name: "한지훈",
    role: "데이터 분석",
    tenure: "3년차 · 리텐션 지표 담당",
    focus: "주간 리텐션 리포트",
    status: "leave",
    currentTask: "연차 · 9월 2일 복귀",
    progress: 0,
    tasksCompleted: 1,
    tasksTotal: 4,
  },
  {
    id: "subin",
    name: "오수빈",
    role: "프론트엔드",
    tenure: "2년차 · 내부 도구 담당",
    focus: "팀 대시보드 접근 권한",
    status: "done",
    currentTask: "권한 요청 화면 배포 완료",
    progress: 100,
    tasksCompleted: 6,
    tasksTotal: 6,
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "결제 실패 복구 플로우 구현",
    memberId: "seoyeon",
    status: "in_progress",
    progress: 68,
    due: "9월 2일",
  },
  {
    id: "t2",
    title: "영수증 재발급 예외 처리",
    memberId: "seoyeon",
    status: "in_progress",
    progress: 40,
    due: "9월 4일",
  },
  {
    id: "t3",
    title: "정산 배치 재시도 정책",
    memberId: "junho",
    status: "review",
    progress: 90,
    due: "오늘",
  },
  {
    id: "t4",
    title: "슬랙 알림 중복 발송 수정",
    memberId: "junho",
    status: "done",
    progress: 100,
    due: "8월 29일",
  },
  {
    id: "t5",
    title: "온보딩 체크리스트 시안",
    memberId: "haneul",
    status: "in_progress",
    progress: 44,
    due: "9월 3일",
  },
  {
    id: "t6",
    title: "빈 상태 일러스트 정리",
    memberId: "haneul",
    status: "review",
    progress: 80,
    due: "9월 2일",
  },
  {
    id: "t7",
    title: "스테이징 회귀 테스트",
    memberId: "minjae",
    status: "blocked",
    progress: 21,
    due: "오늘",
  },
  {
    id: "t8",
    title: "결제 실패 케이스 시나리오",
    memberId: "minjae",
    status: "blocked",
    progress: 10,
    due: "9월 2일",
  },
  {
    id: "t9",
    title: "릴리스 범위 확정",
    memberId: "yujin",
    status: "in_progress",
    progress: 55,
    due: "오늘",
  },
  {
    id: "t10",
    title: "이해관계자 리뷰 메모",
    memberId: "yujin",
    status: "in_progress",
    progress: 30,
    due: "9월 3일",
  },
  {
    id: "t11",
    title: "주간 리텐션 리포트",
    memberId: "jihun",
    status: "leave",
    progress: 0,
    due: "9월 4일",
  },
  {
    id: "t12",
    title: "권한 요청 화면 배포",
    memberId: "subin",
    status: "done",
    progress: 100,
    due: "8월 31일",
  },
];

export const todaySchedule: ScheduleItem[] = [
  {
    id: "s1",
    time: "09:30",
    endTime: "09:45",
    title: "스쿼드 스탠드업",
    kind: "standup",
    location: "3층 허들룸",
    memberIds: ["seoyeon", "junho", "haneul", "minjae", "yujin", "subin"],
  },
  {
    id: "s2",
    time: "10:30",
    endTime: "11:00",
    title: "1:1 · 최민재",
    kind: "one_on_one",
    location: "화상",
    memberIds: ["minjae"],
  },
  {
    id: "s3",
    time: "13:00",
    endTime: "13:40",
    title: "정산 배치 리뷰",
    kind: "review",
    location: "백엔드 채널",
    memberIds: ["junho", "yujin"],
  },
  {
    id: "s4",
    time: "15:00",
    endTime: "15:30",
    title: "1:1 · 김서연",
    kind: "one_on_one",
    location: "2층 미팅룸 B",
    memberIds: ["seoyeon"],
  },
  {
    id: "s5",
    time: "16:30",
    endTime: "17:10",
    title: "릴리스 범위 점검",
    kind: "planning",
    location: "프로덕트 채널",
    memberIds: ["yujin", "haneul", "subin"],
  },
];

export const meetings: OneOnOne[] = [
  {
    id: "m1",
    memberId: "minjae",
    datetime: "오늘",
    time: "10:30",
    topic: "스테이징 권한 병목과 QA 일정 조정",
    status: "scheduled",
    note: "차단 이슈를 오늘 안에 풀 수 있는지 확인",
  },
  {
    id: "m2",
    memberId: "seoyeon",
    datetime: "오늘",
    time: "15:00",
    topic: "결제 복구 플로우 진행과 리뷰 시점",
    status: "scheduled",
    note: "내일 오전까지 리뷰 가능한지 합의",
  },
  {
    id: "m3",
    memberId: "haneul",
    datetime: "9월 2일",
    time: "11:00",
    topic: "온보딩 시안 피드백 범위",
    status: "scheduled",
    note: "빈 상태 카피와 체크리스트 순서",
  },
  {
    id: "m4",
    memberId: "junho",
    datetime: "9월 2일",
    time: "14:00",
    topic: "배치 재시도 정책 배포 기준",
    status: "scheduled",
    note: "리뷰 코멘트 반영 여부 확인",
  },
  {
    id: "m5",
    memberId: "yujin",
    datetime: "9월 3일",
    time: "10:00",
    topic: "3분기 백로그 우선순위",
    status: "scheduled",
    note: "이해관계자 요청 3건 정리",
  },
  {
    id: "m6",
    memberId: "subin",
    datetime: "8월 28일",
    time: "16:00",
    topic: "내부 도구 배포 회고",
    status: "completed",
    note: "권한 화면은 배포 완료, 모니터링만 유지",
  },
  {
    id: "m7",
    memberId: "jihun",
    datetime: "9월 4일",
    time: "13:30",
    topic: "복귀 후 리텐션 리포트 일정",
    status: "rescheduled",
    note: "연차 복귀 다음날로 이동",
  },
];

export const workStatusLabel: Record<WorkStatus, string> = {
  in_progress: "진행 중",
  review: "검토 대기",
  done: "완료",
  blocked: "차단됨",
  leave: "휴가",
};

export const meetingStatusLabel: Record<MeetingStatus, string> = {
  scheduled: "예정",
  completed: "완료",
  rescheduled: "일정 변경",
};

export const scheduleKindLabel: Record<ScheduleKind, string> = {
  standup: "스탠드업",
  review: "리뷰",
  one_on_one: "1:1",
  planning: "기획",
};

export function getMember(id: string) {
  return members.find((member) => member.id === id);
}

export function getMemberName(id: string) {
  return getMember(id)?.name ?? "알 수 없음";
}

export function getMemberTasks(memberId: string) {
  return tasks.filter((task) => task.memberId === memberId);
}

export function getMemberMeetings(memberId: string) {
  return meetings.filter((meeting) => meeting.memberId === memberId);
}

export function getTeamSummary() {
  const working = members.filter((member) => member.status !== "leave");
  const blocked = members.filter((member) => member.status === "blocked");
  const inProgress = members.filter((member) => member.status === "in_progress");
  const review = members.filter((member) => member.status === "review");
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const openTasks = tasks.filter((task) => task.status !== "done" && task.status !== "leave");
  const avgProgress = Math.round(
    working.reduce((sum, member) => sum + member.progress, 0) / working.length,
  );
  const todaysMeetings = meetings.filter((meeting) => meeting.datetime === "오늘");

  return {
    memberCount: members.length,
    workingCount: working.length,
    blockedCount: blocked.length,
    inProgressCount: inProgress.length,
    reviewCount: review.length,
    doneTasks,
    openTaskCount: openTasks.length,
    avgProgress,
    todaysMeetingCount: todaysMeetings.length,
    scheduleCount: todaySchedule.length,
  };
}
