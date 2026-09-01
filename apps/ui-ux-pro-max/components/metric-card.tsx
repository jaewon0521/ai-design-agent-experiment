export function MetricCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "alert" | "accent";
}) {
  const toneClass =
    tone === "alert"
      ? "border-primary bg-primary text-white"
      : tone === "accent"
        ? "border-cta bg-cta text-text"
        : "border-primary/10 bg-white text-text";

  return (
    <article
      className={`rounded-xl border p-6 shadow-md space-y-3 ${toneClass}`}
    >
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-semibold tracking-tight tabular-nums metric-reveal">
        {value}
      </p>
      <p className="text-sm opacity-80">{hint}</p>
    </article>
  );
}
