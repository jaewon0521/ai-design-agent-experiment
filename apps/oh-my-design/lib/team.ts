export const SAMPLE_TODAY = "2026-09-01";
export const SAMPLE_TODAY_LABEL = "2026년 9월 1일 화요일";
export const PRODUCT_NAME = "팀장판";

export type DutyStatus = "진행 중" | "대기" | "막힘" | "휴가";
export type WorkStatus = "진행 중" | "대기" | "막힘" | "완료";
export type EventKind = "팀" | "업무" | "1:1" | "외부";

export type Member = {
  id: string;
  name: string;
  role: string;
  duty: DutyStatus;
};

export type WorkItem = {
  id: string;
  memberId: string;
  title: string;
  status: WorkStatus;
  percent: number;
  dueLabel: string;
};

export type DayEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  kind: EventKind;
  memberId?: string;
};

export type OneOnOne = {
  id: string;
  date: string;
  time: string;
  memberId: string;
  topic: string;
};

export const members: Member[] = [
  { id: "TM-101", name: "정서윤", role: "제품 디자인", duty: "막힘" },
  { id: "TM-102", name: "한지민", role: "웹 프론트", duty: "진행 중" },
  { id: "TM-103", name: "오세훈", role: "서버", duty: "진행 중" },
  { id: "TM-104", name: "문가은", role: "데이터", duty: "대기" },
  { id: "TM-105", name: "배성현", role: "모바일", duty: "진행 중" },
  { id: "TM-106", name: "윤다혜", role: "품질", duty: "휴가" },
  { id: "TM-107", name: "조민재", role: "웹 프론트", duty: "막힘" },
  { id: "TM-108", name: "신예린", role: "기획", duty: "진행 중" },
];

export const workItems: WorkItem[] = [
  {
    id: "WK-210",
    memberId: "TM-101",
    title: "온보딩 화면 검수 메모 반영",
    status: "막힘",
    percent: 62,
    dueLabel: "오늘",
  },
  {
    id: "WK-211",
    memberId: "TM-101",
    title: "권한 안내 문구 다시 쓰기",
    status: "진행 중",
    percent: 40,
    dueLabel: "9월 3일",
  },
  {
    id: "WK-220",
    memberId: "TM-102",
    title: "팀원 표 키보드 탐색",
    status: "진행 중",
    percent: 71,
    dueLabel: "9월 2일",
  },
  {
    id: "WK-221",
    memberId: "TM-102",
    title: "빈 목록 안내 문장",
    status: "완료",
    percent: 100,
    dueLabel: "8월 29일",
  },
  {
    id: "WK-230",
    memberId: "TM-103",
    title: "주간 현황 집계 쿼리",
    status: "진행 중",
    percent: 55,
    dueLabel: "9월 4일",
  },
  {
    id: "WK-240",
    memberId: "TM-104",
    title: "진행률 정의 문서",
    status: "대기",
    percent: 0,
    dueLabel: "9월 5일",
  },
  {
    id: "WK-250",
    memberId: "TM-105",
    title: "알림 수신 설정 점검",
    status: "진행 중",
    percent: 33,
    dueLabel: "9월 3일",
  },
  {
    id: "WK-260",
    memberId: "TM-106",
    title: "회귀 시나리오 초안",
    status: "대기",
    percent: 12,
    dueLabel: "휴가 복귀 후",
  },
  {
    id: "WK-270",
    memberId: "TM-107",
    title: "일정 충돌 표시",
    status: "막힘",
    percent: 48,
    dueLabel: "오늘",
  },
  {
    id: "WK-271",
    memberId: "TM-107",
    title: "1:1 목록 정렬",
    status: "진행 중",
    percent: 20,
    dueLabel: "9월 2일",
  },
  {
    id: "WK-280",
    memberId: "TM-108",
    title: "이번 주 목표 문장 확정",
    status: "진행 중",
    percent: 80,
    dueLabel: "오늘",
  },
  {
    id: "WK-281",
    memberId: "TM-108",
    title: "다음 주 스프린트 초안",
    status: "대기",
    percent: 8,
    dueLabel: "9월 4일",
  },
];

export const dayEvents: DayEvent[] = [
  {
    id: "EV-01",
    date: "2026-09-01",
    time: "09:30",
    title: "주간 스탠드업",
    kind: "팀",
  },
  {
    id: "EV-02",
    date: "2026-09-01",
    time: "11:00",
    title: "정서윤 1:1",
    kind: "1:1",
    memberId: "TM-101",
  },
  {
    id: "EV-03",
    date: "2026-09-01",
    time: "13:30",
    title: "온보딩 막힘 점검",
    kind: "업무",
    memberId: "TM-101",
  },
  {
    id: "EV-04",
    date: "2026-09-01",
    time: "15:00",
    title: "조민재 일정 충돌 리뷰",
    kind: "업무",
    memberId: "TM-107",
  },
  {
    id: "EV-05",
    date: "2026-09-01",
    time: "16:20",
    title: "신예린 1:1",
    kind: "1:1",
    memberId: "TM-108",
  },
  {
    id: "EV-06",
    date: "2026-09-01",
    time: "17:40",
    title: "리더십 싱크",
    kind: "외부",
  },
  {
    id: "EV-07",
    date: "2026-09-02",
    time: "10:00",
    title: "한지민 1:1",
    kind: "1:1",
    memberId: "TM-102",
  },
];

export const oneOnOnes: OneOnOne[] = [
  {
    id: "MT-11",
    date: "2026-09-01",
    time: "11:00",
    memberId: "TM-101",
    topic: "온보딩 검수가 어디서 멈추는지",
  },
  {
    id: "MT-12",
    date: "2026-09-01",
    time: "16:20",
    memberId: "TM-108",
    topic: "이번 주 목표 문장",
  },
  {
    id: "MT-13",
    date: "2026-09-02",
    time: "10:00",
    memberId: "TM-102",
    topic: "표 키보드 탐색 남은 일",
  },
  {
    id: "MT-14",
    date: "2026-09-03",
    time: "14:30",
    memberId: "TM-105",
    topic: "알림 수신 설정",
  },
  {
    id: "MT-15",
    date: "2026-09-04",
    time: "09:40",
    memberId: "TM-103",
    topic: "집계 쿼리 범위",
  },
  {
    id: "MT-16",
    date: "2026-09-04",
    time: "15:10",
    memberId: "TM-107",
    topic: "일정 충돌 표시 막힘",
  },
];

export const dutyFilters: Array<"전체" | DutyStatus> = [
  "전체",
  "진행 중",
  "대기",
  "막힘",
  "휴가",
];

export const workFilters: Array<"전체" | WorkStatus> = [
  "전체",
  "진행 중",
  "대기",
  "막힘",
  "완료",
];

export const eventFilters: Array<"전체" | EventKind> = [
  "전체",
  "팀",
  "업무",
  "1:1",
  "외부",
];

export function memberById(id: string) {
  return members.find((member) => member.id === id);
}

export function workForMember(id: string) {
  return workItems.filter((item) => item.memberId === id);
}

export function todayEvents() {
  return dayEvents
    .filter((event) => event.date === SAMPLE_TODAY)
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function meetingsOn(date: string) {
  return oneOnOnes
    .filter((meeting) => meeting.date === date)
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function thisWeekMeetings() {
  return oneOnOnes
    .filter((meeting) => meeting.date >= "2026-09-01" && meeting.date <= "2026-09-04")
    .slice()
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}

export type TeamOverview = {
  memberCount: number;
  workingCount: number;
  blockedCount: number;
  waitingCount: number;
  leaveCount: number;
  todayEventCount: number;
  todayMeetingCount: number;
  openWorkCount: number;
  averagePercent: number;
};

export function teamOverview(): TeamOverview {
  const working = members.filter((member) => member.duty !== "휴가");
  const openWork = workItems.filter((item) => item.status !== "완료");
  const percentSum = openWork.reduce((sum, item) => sum + item.percent, 0);
  return {
    memberCount: members.length,
    workingCount: working.length,
    blockedCount: members.filter((member) => member.duty === "막힘").length,
    waitingCount: members.filter((member) => member.duty === "대기").length,
    leaveCount: members.filter((member) => member.duty === "휴가").length,
    todayEventCount: todayEvents().length,
    todayMeetingCount: meetingsOn(SAMPLE_TODAY).length,
    openWorkCount: openWork.length,
    averagePercent:
      openWork.length === 0 ? 0 : Math.round(percentSum / openWork.length),
  };
}

export function blockedMembers() {
  return members.filter((member) => member.duty === "막힘");
}

export function initialOf(name: string) {
  return name.slice(0, 1);
}
