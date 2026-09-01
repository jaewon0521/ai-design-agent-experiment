"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MANAGER_NAME, TEAM_NAME, TODAY } from "@/lib/data";
import { formatDate } from "@/lib/format";

const navItems = [
  { href: "/", label: "팀 현황" },
  { href: "/members", label: "팀원 목록" },
  { href: "/schedule", label: "오늘의 일정" },
  { href: "/progress", label: "업무 진행" },
  { href: "/meetings", label: "1:1 미팅" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">팀장용 팀원 관리</p>
            <h1 className="text-lg font-semibold">{TEAM_NAME}</h1>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              팀장 {MANAGER_NAME} · {formatDate(TODAY)}
            </p>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
          <ul className="flex gap-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex rounded px-3 py-1.5 text-sm ${
                      active
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
