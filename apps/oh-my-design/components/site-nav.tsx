"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { PRODUCT_NAME } from "@/lib/team";

const links = [
  { href: "/", label: "팀 전체 현황" },
  { href: "/members", label: "팀원 목록" },
  { href: "/schedule", label: "오늘의 일정" },
  { href: "/progress", label: "업무 진행 상황" },
  { href: "/meetings", label: "1:1 미팅 일정" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const open = menuFor === pathname;
  const navId = useId();

  useEffect(() => {
    document.getElementById("page-title")?.focus();
  }, [pathname]);

  return (
    <aside className="rail">
      <div className="rail-top">
        <Link className="wordmark" href="/">
          {PRODUCT_NAME}
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-controls={navId}
          aria-expanded={open}
          onClick={() =>
            setMenuFor((current) => (current === pathname ? null : pathname))
          }
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>
      <nav
        id={navId}
        className="app-nav"
        data-open={open ? "true" : "false"}
        aria-label="주요 화면"
      >
        <ul>
          {links.map((link) => {
            const current =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
