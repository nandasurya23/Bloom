import type { JSX } from "react";

import Link from "next/link";
import { FiHeart, FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-bloom-rose/50 bg-bloom-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-bloom-ink">
          Bloom
        </Link>
        <nav className="flex items-center gap-3 text-sm text-bloom-ink/80">
          <Link href="/shop" className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-white/70 hover:text-bloom-ink">
            <FiShoppingBag /> Shop
          </Link>
          <Link href="/wishlist" className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-white/70 hover:text-bloom-ink">
            <FiHeart /> Wishlist
          </Link>
          <Link href="/cart" className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-white/70 hover:text-bloom-ink">
            <FiShoppingCart /> Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
