export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-4">
      <div className="h-8 w-48 animate-pulse rounded-md bg-line" />
      <div className="h-5 w-80 animate-pulse rounded-md bg-line" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-xl bg-line" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl bg-line" />
        <div className="h-64 animate-pulse rounded-xl bg-line" />
      </div>
      <span className="sr-only">화면을 불러오는 중입니다.</span>
    </div>
  );
}
