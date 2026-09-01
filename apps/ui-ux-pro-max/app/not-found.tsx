import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-primary/10 bg-white p-8 shadow-md space-y-4">
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="text-text/80">요청한 팀원 또는 화면이 없습니다.</p>
      <Link
        href="/"
        className="inline-flex rounded-lg bg-cta px-5 py-3 font-semibold text-text transition-opacity duration-200 hover:opacity-90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        팀 전체 현황으로
      </Link>
    </div>
  );
}
