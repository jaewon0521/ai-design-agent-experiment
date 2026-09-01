import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-text">{title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-text/80">{description}</p>
      </div>
      {action}
    </header>
  );
}

export function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
    >
      {children}
    </Link>
  );
}

export function Initials({ name }: { name: string }) {
  const initials = name.slice(0, 1);

  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
    >
      {initials}
    </span>
  );
}
