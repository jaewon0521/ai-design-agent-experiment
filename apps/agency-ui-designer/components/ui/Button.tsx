import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-60",
        size === "sm" && "px-3 text-sm",
        size === "md" && "px-4 text-base",
        variant === "primary" &&
          "bg-brand text-brand-ink hover:bg-brand-hover",
        variant === "secondary" &&
          "border border-line bg-surface text-ink hover:bg-surface-muted",
        variant === "ghost" && "text-ink-muted hover:bg-surface-muted hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}
