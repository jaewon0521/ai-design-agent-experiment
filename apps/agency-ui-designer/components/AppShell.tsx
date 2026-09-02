import type { ReactNode } from "react";
import { AppNav } from "@/components/AppNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink"
      >
        본문으로 건너뛰기
      </a>
      <AppNav />
      <div className="min-w-0">
        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
