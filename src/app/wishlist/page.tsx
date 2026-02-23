"use client";

import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage(): JSX.Element {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-bloom-ink">Wishlist</h1>
      <p className="mt-2 text-sm text-bloom-ink/70">Your saved bouquets and floral inspirations.</p>

      {items.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-bloom-rose/40 bg-white p-10 text-center">
          <FiHeart className="mx-auto text-3xl text-bloom-ink/50" />
          <p className="mt-4 text-sm text-bloom-ink/70">No saved flowers yet.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full border border-bloom-rose/60 px-4 py-2 text-sm">
            Explore Collection
          </Link>
        </section>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.productId} className="rounded-xl border border-bloom-rose/40 bg-white p-4 transition hover:shadow-sm">
              <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-bloom-blush">
                <Image src={item.imageUrl} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <h2 className="font-medium text-bloom-ink">{item.name}</h2>
              <p className="mt-2 text-sm text-bloom-ink/70">{formatCurrency(item.unitPrice)}</p>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
              >
                <FiTrash2 /> Remove
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
