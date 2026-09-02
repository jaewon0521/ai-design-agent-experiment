"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  IconCalendar,
  IconClose,
  IconMeeting,
  IconMenu,
  IconOverview,
  IconPeople,
  IconProgress,
} from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CURRENT_USER, TEAM_NAME } from "@/lib/data";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "팀 현황", icon: IconOverview },
  { href: "/members", label: "팀원", icon: IconPeople },
  { href: "/schedule", label: "오늘의 일정", icon: IconCalendar },
  { href: "/progress", label: "업무 진행", icon: IconProgress },
  { href: "/meetings", label: "1:1 미팅", icon: IconMeeting },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-surface lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
        <div>
          <p className="text-base font-semibold text-ink">리드룸</p>
          <p className="text-sm text-ink-subtle">{TEAM_NAME} 팀장 워크스페이스</p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line"
          aria-expanded={open}
          aria-controls="app-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose /> : <IconMenu />}
          <span className="sr-only">메뉴 {open ? "닫기" : "열기"}</span>
        </button>
      </div>

      <div
        id="app-nav"
        className={cn(
          "lg:flex lg:h-full lg:w-64 lg:flex-col",
          open ? "block" : "hidden lg:flex",
        )}
      >
        <div className="hidden border-b border-line px-5 py-6 lg:block">
          <p className="text-lg font-semibold tracking-tight text-ink">리드룸</p>
          <p className="mt-1 text-sm text-ink-subtle">
            {TEAM_NAME} 팀장 워크스페이스
          </p>
        </div>

        <nav aria-label="주요 메뉴" className="flex-1 px-3 py-3">
          <ul className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                      active
                        ? "bg-brand-subtle text-brand"
                        : "text-ink-muted hover:bg-surface-muted hover:text-ink",
                    )}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-4">
          <div>
            <p className="text-sm font-medium text-ink">{CURRENT_USER.name}</p>
            <p className="text-xs text-ink-subtle">{CURRENT_USER.role}</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
