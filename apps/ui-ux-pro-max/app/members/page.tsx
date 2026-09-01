import type { Metadata } from "next";
import Link from "next/link";
import { ChevronIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { Initials, PageHeader } from "@/components/ui";
import { members } from "@/lib/data";

export const metadata: Metadata = {
  title: "팀원 목록",
};

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="구성원"
        title="팀원 목록"
        description="역할, 담당 영역, 현재 업무를 기준으로 스쿼드 인원을 확인합니다."
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {members.map((member) => (
          <li key={member.id}>
            <Link
              href={`/members/${member.id}`}
              className="flex h-full items-start gap-4 rounded-xl border border-primary/10 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Initials name={member.name} />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-text/80">{member.role}</p>
                  </div>
                  <StatusBadge status={member.status} />
                </div>
                <p className="text-sm text-text/70">{member.tenure}</p>
                <p className="text-sm">담당: {member.focus}</p>
              </div>
              <ChevronIcon className="mt-1 text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
