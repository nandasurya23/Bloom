import type { JSX } from "react";

export function Footer(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-bloom-rose/50 bg-white/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-bloom-ink/70">
        Bloom Flower Shop. Crafted for elegant gifting.
      </div>
    </footer>
  );
}
