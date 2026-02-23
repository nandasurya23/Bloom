import type { JSX } from "react";

export function AboutSection(): JSX.Element {
  return (
    <section className="mt-14 rounded-3xl border border-bloom-rose/40 bg-white/70 p-8 sm:p-10">
      <h2 className="text-2xl font-semibold text-bloom-ink sm:text-3xl">About Bloom</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bloom-ink/75 sm:text-base">
        Bloom is a modern flower shop experience focused on thoughtful arrangements, elegant visual storytelling,
        and seamless ordering. Every bouquet is curated to feel personal, timeless, and ready for meaningful
        moments.
      </p>
    </section>
  );
}
