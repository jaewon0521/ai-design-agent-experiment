import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { Initials, PageHeader } from "@/components/ui";
import { members, workStatusLabel } from "@/lib/data";
import type { WorkStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "팀원별 업무 상태",
};

const columns: WorkStatus[] = [
  "blocked",
  "in_progress",
  "review",
  "done",
  "leave",
];

export default function StatusPage() {
  return (
    <>
      <PageHeader
        eyebrow="상태 보드"
        title="팀원별 업무 상태"
        description="지금 누가 진행 중이고, 누가 검토·차단·휴가 상태인지 한눈에 봅니다."
      />

      <div className="grid gap-4 xl:grid-cols-5 md:grid-cols-2">
        {columns.map((status) => {
          const columnMembers = members.filter((member) => member.status === status);

          return (
            <section
              key={status}
              className="rounded-xl border border-primary/10 bg-white p-4 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{workStatusLabel[status]}</h2>
                <span className="tabular-nums text-sm text-text/70">
                  {columnMembers.length}
                </span>
              </div>
              {columnMembers.length === 0 ? (
                <p className="text-sm text-text/60">해당 인원 없음</p>
              ) : (
                <ul className="space-y-3">
                  {columnMembers.map((member) => (
                    <li key={member.id}>
                      <Link
                        href={`/members/${member.id}`}
                        className="block rounded-lg bg-background p-3 transition-shadow duration-200 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div className="flex items-center gap-2">
                          <Initials name={member.name} />
                          <div className="min-w-0">
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-xs text-text/70">{member.role}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm">{member.currentTask}</p>
                        <div className="mt-2">
                          <StatusBadge status={member.status} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
