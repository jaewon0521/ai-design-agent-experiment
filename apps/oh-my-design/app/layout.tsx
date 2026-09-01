import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { PRODUCT_NAME } from "@/lib/team";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: PRODUCT_NAME,
    template: `%s — ${PRODUCT_NAME}`,
  },
  description:
    "팀장이 팀원 목록, 업무 상태, 오늘 일정, 진행 상황, 1:1 미팅, 팀 현황을 확인하는 화면",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">
        <div className="shell">
          <a className="skip-link" href="#main">
            본문으로
          </a>
          <SiteNav />
          <div className="frame">
            {children}
            <footer className="colophon">
              {PRODUCT_NAME} · 이 화면의 팀원·일정·진행 숫자는 연결되지 않은 샘플
              기록입니다. 운영 달력은 2026년 9월 1일입니다.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
