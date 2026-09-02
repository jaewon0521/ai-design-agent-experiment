import { MemberList } from "@/components/MemberList";
import { StatusFilter } from "@/components/StatusFilter";
import { PageHeader } from "@/components/ui/PageHeader";
import { workStatusLabel } from "@/lib/data";
import { getMembersByStatus } from "@/lib/selectors";
import type { WorkStatus } from "@/lib/types";

function isWorkStatus(value: string | undefined): value is WorkStatus {
  return (
    value === "in_progress" ||
    value === "blocked" ||
    value === "review" ||
    value === "done" ||
    value === "away"
  );
}

export default async function MembersPage({
  searchParams,
}: PageProps<"/members">) {
  const params = await searchParams;
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const status: WorkStatus | "all" = isWorkStatus(rawStatus) ? rawStatus : "all";
  const filtered = getMembersByStatus(status);

  return (
    <div>
      <PageHeader
        title="팀원 목록"
        description="팀원별 역할, 현재 업무, 진행 상태를 확인합니다."
      />
      <StatusFilter current={status} />
      <p className="mt-4 mb-4 text-sm text-ink-subtle">
        {status === "all"
          ? `전체 ${filtered.length}명`
          : `${workStatusLabel[status]} ${filtered.length}명`}
      </p>
      <MemberList members={filtered} />
    </div>
  );
}
