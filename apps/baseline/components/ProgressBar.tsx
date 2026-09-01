export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-full rounded bg-gray-200">
        <div
          className="h-2 rounded bg-blue-600"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-sm text-gray-600">
        {clamped}%
      </span>
    </div>
  );
}
