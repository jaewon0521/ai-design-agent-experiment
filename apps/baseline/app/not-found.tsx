import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="mt-2 text-sm text-gray-600">
        요청한 팀원 또는 페이지가 없습니다.
      </p>
      <p className="mt-4">
        <Link href="/" className="text-sm text-blue-700 underline">
          팀 현황으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
