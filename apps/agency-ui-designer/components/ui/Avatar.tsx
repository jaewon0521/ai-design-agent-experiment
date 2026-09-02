import { cn } from "@/lib/cn";

const palettes = [
  "bg-brand-subtle text-brand",
  "bg-success-subtle text-success",
  "bg-warning-subtle text-warning",
  "bg-info-subtle text-info",
  "bg-danger-subtle text-danger",
  "bg-away-subtle text-away",
];

export function Avatar({
  name,
  initials,
  size = "md",
}: {
  name: string;
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const index = name.length % palettes.length;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        palettes[index],
        size === "sm" && "h-8 w-8 text-xs",
        size === "md" && "h-10 w-10 text-sm",
        size === "lg" && "h-14 w-14 text-base",
      )}
    >
      {initials}
    </span>
  );
}
