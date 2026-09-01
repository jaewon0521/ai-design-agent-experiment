"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarIcon,
  ChartIcon,
  CloseIcon,
  HomeIcon,
  MeetingIcon,
  MenuIcon,
  StatusIcon,
  UsersIcon,
} from "@/components/icons";
import { LEADER_NAME, TEAM_NAME } from "@/lib/data";

const navItems = [
  { href: "/", label: "팀 전체 현황", icon: HomeIcon },
  { href: "/members", label: "팀원 목록", icon: UsersIcon },
  { href: "/status", label: "팀원별 업무 상태", icon: StatusIcon },
  { href: "/schedule", label: "오늘의 일정", icon: CalendarIcon },
  { href: "/progress", label: "업무 진행 상황", icon: ChartIcon },
  { href: "/meetings", label: "1:1 미팅 일정", icon: MeetingIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-full bg-background text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cta focus:px-4 focus:py-2 focus:font-semibold focus:text-text"
      >
        본문으로 건너뛰기
      </a>

      {open ? (
        <button
          type="button"
          aria-label="메뉴 닫기"
          className="fixed inset-0 z-30 bg-text/40 cursor-pointer md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-text text-background transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "max-md:-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta">
              리드허브
            </p>
            <p className="mt-2 text-lg font-semibold">{TEAM_NAME}</p>
            <p className="mt-1 text-sm text-background/70">팀장 {LEADER_NAME}</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-background transition-colors duration-200 hover:bg-white/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta md:hidden"
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="주요 메뉴" className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta ${
                  active
                    ? "bg-cta text-text"
                    : "text-background/85 hover:bg-white/10"
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:pl-72">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-primary/10 bg-background/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-text transition-colors duration-200 hover:bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="메뉴 열기"
          >
            <MenuIcon />
          </button>
          <p className="font-semibold">리드허브</p>
        </header>
        <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px] space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
