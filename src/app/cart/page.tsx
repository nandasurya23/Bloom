"use client";

import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage(): JSX.Element {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const total = useCartStore((state) => state.total);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-bloom-ink">Your Cart</h1>
      <p className="mt-2 text-sm text-bloom-ink/70">Review and adjust your selected bouquets.</p>

      {items.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-bloom-rose/40 bg-white p-10 text-center">
          <FiShoppingCart className="mx-auto text-3xl text-bloom-ink/50" />
          <p className="mt-4 text-sm text-bloom-ink/70">Your cart is currently empty.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full border border-bloom-rose/60 px-4 py-2 text-sm">
            Continue Shopping
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-3">
            {items.map((item) => (
              <article
                key={item.productId}
                className="rounded-xl border border-bloom-rose/40 bg-white p-4 transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-bloom-blush">
                      <Image src={item.imageUrl} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-bloom-ink">{item.name}</p>
                      <p className="mt-1 text-sm text-bloom-ink/70">{formatCurrency(item.unitPrice)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="rounded-md border border-bloom-rose/60 p-2 text-bloom-ink/70 hover:text-bloom-ink"
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decrementItem(item.productId)}
                    className="rounded-md border border-bloom-rose/60 p-2"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => incrementItem(item.productId)}
                    className="rounded-md border border-bloom-rose/60 p-2"
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-bloom-rose/40 bg-white p-5">
            <h2 className="text-lg font-medium text-bloom-ink">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-bloom-ink/70">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-bloom-rose/60 px-4 py-2 text-sm font-medium"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
