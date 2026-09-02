import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  label,
  tone = "brand",
}: {
  value: number;
  label: string;
  tone?: "brand" | "success" | "warning" | "danger";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : tone === "danger"
          ? "bg-danger"
          : "bg-brand";

  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono text-ink">{clamped}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={label}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", fill)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
