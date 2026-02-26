import type { JSX, ReactNode } from "react";

type AuthFormCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthFormCard({ title, subtitle, children }: AuthFormCardProps): JSX.Element {
  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-bloom-rose/40 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-bloom-ink">{title}</h1>
      <p className="mt-1 text-sm text-bloom-ink/70">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
