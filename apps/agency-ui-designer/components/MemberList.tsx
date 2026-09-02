import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { WorkStatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Member } from "@/lib/types";

export function MemberList({
  members,
  compact = false,
}: {
  members: Member[];
  compact?: boolean;
}) {
  if (members.length === 0) {
    return (
      <EmptyState
        title="해당하는 팀원이 없습니다"
        description="다른 업무 상태로 다시 확인해 주세요."
      />
    );
  }

  return (
    <ul className="grid gap-3">
      {members.map((member) => (
        <li key={member.id}>
          <Link
            href={`/members/${member.id}`}
            className="block rounded-xl border border-line bg-surface p-4 shadow-[var(--ds-shadow-sm)] transition-shadow duration-150 hover:shadow-[var(--ds-shadow-md)]"
          >
            <div className="flex items-start gap-3">
              <Avatar name={member.name} initials={member.initials} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{member.name}</p>
                  <WorkStatusBadge status={member.workStatus} />
                </div>
                <p className="mt-0.5 text-sm text-ink-subtle">{member.role}</p>
                <p className="mt-2 text-sm text-ink-muted">{member.currentWork}</p>
                {compact ? null : (
                  <div className="mt-3">
                    <ProgressBar
                      value={member.progress}
                      label={`${member.name} 업무 진행`}
                      tone={
                        member.workStatus === "blocked"
                          ? "danger"
                          : member.workStatus === "done"
                            ? "success"
                            : "brand"
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
