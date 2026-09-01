import Link from "next/link";
import { WorkStatusBadge } from "@/components/Badges";
import { members, workStatusLabel } from "@/lib/data";
import type { WorkStatus } from "@/lib/types";

const statusFilters: Array<{ value: string; label: string }> = [
  { value: "all", label: "전체" },
  ...Object.entries(workStatusLabel).map(([value, label]) => ({
    value,
    label,
  })),
];

export default async function MembersPage({
  searchParams,
}: PageProps<"/members">) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "all";
  const filtered =
    status === "all"
      ? members
      : members.filter((member) => member.status === (status as WorkStatus));

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">팀원 목록</h2>
        <p className="mt-1 text-sm text-gray-600">
          팀원과 현재 업무 상태를 확인합니다.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const href =
            filter.value === "all"
              ? "/members"
              : `/members?status=${filter.value}`;
          const active = status === filter.value;
          return (
            <Link
              key={filter.value}
              href={href}
              className={`rounded px-3 py-1.5 text-sm ${
                active
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">역할</th>
              <th className="px-4 py-3 font-medium">업무 상태</th>
              <th className="px-4 py-3 font-medium">현재 업무</th>
              <th className="px-4 py-3 font-medium">이메일</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={5}>
                  해당 상태의 팀원이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/members/${member.id}`}
                      className="font-medium text-blue-700 underline"
                    >
                      {member.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{member.role}</td>
                  <td className="px-4 py-3">
                    <WorkStatusBadge status={member.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-700">{member.currentWork}</td>
                  <td className="px-4 py-3 text-gray-600">{member.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
