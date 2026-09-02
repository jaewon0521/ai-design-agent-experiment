import Link from "next/link";
import { workStatusLabel, workStatusOptions } from "@/lib/data";
import { cn } from "@/lib/cn";
import type { WorkStatus } from "@/lib/types";

export function StatusFilter({
  current,
}: {
  current: WorkStatus | "all";
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="업무 상태 필터">
      {workStatusOptions.map((status) => {
        const href = status === "all" ? "/members" : `/members?status=${status}`;
        const selected = current === status;
        const label = status === "all" ? "전체" : workStatusLabel[status];

        return (
          <Link
            key={status}
            href={href}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium",
              selected
                ? "border-brand bg-brand text-brand-ink"
                : "border-line bg-surface text-ink-muted hover:bg-surface-muted hover:text-ink",
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
