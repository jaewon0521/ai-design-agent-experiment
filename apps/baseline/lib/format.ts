const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

export function formatTimeRange(start: string, end: string) {
  return `${start}-${end}`;
}
