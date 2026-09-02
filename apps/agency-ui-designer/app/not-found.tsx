import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <div>
      <PageHeader
        title="페이지를 찾을 수 없습니다"
        description="요청한 화면이 없거나 팀원 정보가 없습니다."
      />
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 font-medium text-brand-ink hover:bg-brand-hover"
      >
        팀 현황으로 돌아가기
      </Link>
    </div>
  );
}
