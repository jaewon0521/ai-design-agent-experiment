import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "리드허브",
    template: "%s · 리드허브",
  },
  description: "팀장이 팀원 상태, 일정, 진행 상황, 1:1 미팅을 확인하는 팀 관리 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className={`${plusJakarta.className} min-h-full`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
