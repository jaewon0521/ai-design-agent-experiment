import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  as?: "section" | "article" | "div";
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Component = "section",
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--ds-radius)] border border-line bg-surface p-5 shadow-[var(--ds-shadow-sm)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-ink-subtle">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
