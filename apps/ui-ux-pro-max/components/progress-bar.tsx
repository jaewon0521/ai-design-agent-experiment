export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-text">{label}</span>
        <span className="tabular-nums text-text/80">{clamped}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-primary/10"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out motion-reduce:transition-none"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
