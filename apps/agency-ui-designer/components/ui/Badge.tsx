import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone =
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "away"
  | "neutral";

const toneClass: Record<BadgeTone, string> = {
  brand: "bg-brand-subtle text-brand",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  danger: "bg-danger-subtle text-danger",
  info: "bg-info-subtle text-info",
  away: "bg-away-subtle text-away",
  neutral: "bg-surface-muted text-ink-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-medium",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
