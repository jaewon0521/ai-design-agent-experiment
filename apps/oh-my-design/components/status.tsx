import type { DutyStatus, WorkStatus } from "@/lib/team";

const dutyTone: Record<DutyStatus | WorkStatus, string> = {
  "진행 중": "active",
  대기: "wait",
  막힘: "blocked",
  휴가: "leave",
  완료: "done",
};

export function StatusMark({
  value,
}: {
  value: DutyStatus | WorkStatus;
}) {
  return (
    <span className="mark" data-tone={dutyTone[value]}>
      <i aria-hidden="true" />
      {value}
    </span>
  );
}

export function ProgressMeter({
  value,
  label,
  blocked = false,
}: {
  value: number;
  label: string;
  blocked?: boolean;
}) {
  return (
    <div className="meter" data-tone={blocked ? "blocked" : undefined}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="meter-track">
          <div className="meter-fill" style={{ width: `${value}%` }} />
        </div>
      </div>
      <span className="num">{value}%</span>
    </div>
  );
}
