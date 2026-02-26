"use client";

import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiArrowRight, FiTag, FiTruck } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage(): JSX.Element {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const total = useCartStore((state) => state.total);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
              Your <span className="font-semibold text-bloom-rose">Cart</span>
            </h1>
            <p className="mt-2 text-base text-bloom-ink/60">
              {itemCount > 0 
                ? `You have ${itemCount} item${itemCount > 1 ? 's' : ''} in your cart` 
                : 'Review and adjust your selected bouquets'}
            </p>
          </div>
          
          {items.length > 0 && (
            <Link 
              href="/shop" 
              className="group flex items-center gap-2 rounded-full border border-bloom-rose/30 bg-white/80 px-6 py-2.5 text-sm font-medium text-bloom-ink shadow-sm transition-all hover:border-bloom-rose hover:bg-white hover:shadow-md"
            >
              Continue Shopping
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <section className="rounded-3xl border border-bloom-rose/20 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-full bg-bloom-rose/10 p-6">
                <FiShoppingCart className="h-12 w-12 text-bloom-rose/40" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-bloom-ink">Your cart is empty</h2>
              <p className="mt-2 text-bloom-ink/60">
                Looks like you haven&apos;t added any flowers to your cart yet.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-rose px-8 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                >
                  Browse Flowers
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center rounded-full border border-bloom-rose/30 bg-white/80 px-8 py-3 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
                >
                  View Categories
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            {/* Cart Items Section */}
            <section className="space-y-4">
              {/* Items Header */}
              <div className="hidden items-center justify-between rounded-xl bg-white/60 px-4 py-3 text-xs font-medium uppercase tracking-wider text-bloom-ink/50 backdrop-blur-sm sm:flex">
                <span className="flex-1">Product</span>
                <span className="w-32 text-center">Quantity</span>
                <span className="w-24 text-right">Total</span>
                <span className="w-12" />
              </div>

              {/* Cart Items */}
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="group relative overflow-hidden rounded-2xl border border-bloom-rose/20 bg-white p-4 shadow-sm transition-all hover:border-bloom-rose/40 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Product Info */}
                    <div className="flex flex-1 items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-bloom-blush shadow-md sm:h-24 sm:w-24">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill 
                          sizes="(max-width: 640px) 80px, 96px" 
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-bloom-ink sm:text-lg">
                          {item.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded-full bg-bloom-rose/10 px-2.5 py-0.5 text-xs font-medium text-bloom-rose">
                            {formatCurrency(item.unitPrice)} each
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:w-32 sm:justify-center">
                      <div className="flex items-center gap-1 rounded-xl border border-bloom-rose/20 bg-bloom-rose/5 p-1">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.productId)}
                          className="rounded-lg p-2 text-bloom-ink/60 transition-all hover:bg-bloom-rose/10 hover:text-bloom-rose disabled:opacity-50"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium text-bloom-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.productId)}
                          className="rounded-lg p-2 text-bloom-ink/60 transition-all hover:bg-bloom-rose/10 hover:text-bloom-rose"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex items-center justify-between sm:w-24 sm:justify-end">
                      <span className="text-sm text-bloom-ink/60 sm:hidden">Total:</span>
                      <span className="text-base font-semibold text-bloom-ink">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="absolute right-2 top-2 rounded-full p-2 text-bloom-ink/30 transition-all hover:bg-bloom-rose/10 hover:text-bloom-rose sm:relative sm:right-0 sm:top-0 sm:w-12"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}

              {/* Shopping Tips */}
              <div className="mt-6 rounded-xl bg-gradient-to-r from-bloom-rose/5 to-transparent p-4">
                <div className="flex items-start gap-3">
                  <FiTag className="h-5 w-5 text-bloom-rose/60" />
                  <div>
                    <p className="text-sm font-medium text-bloom-ink">Shopping Tips</p>
                    <p className="text-xs text-bloom-ink/60">
                      Add more items to qualify for free shipping! (Min. purchase Rp500.000)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Summary Section */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl border border-bloom-rose/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-bloom-ink">Order Summary</h2>
                
                <div className="mt-6 space-y-4">
                  {/* Summary Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-bloom-ink/70">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-bloom-ink/70">
                      <span>Shipping</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Free
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-bloom-ink/70">
                      <span>Tax estimate</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-bloom-rose/20 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-bloom-ink">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-bloom-rose">
                          {formatCurrency(total)}
                        </span>
                        <p className="text-xs text-bloom-ink/40">Including all taxes</p>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-3 text-sm text-bloom-ink outline-none transition-all placeholder:text-bloom-ink/30 focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20"
                      disabled
                    />
                    <button
                      type="button"
                      className="rounded-xl border border-bloom-rose/30 bg-white/80 px-6 py-3 text-sm font-medium text-bloom-ink/50 transition-all"
                      disabled
                    >
                      Apply
                    </button>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-rose-400 px-6 py-4 text-base font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:shadow-xl hover:brightness-110"
                  >
                    Proceed to Checkout
                    <FiArrowRight className="h-5 w-5" />
                  </Link>

                  {/* Payment Methods */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-bloom-ink/40">
                    <FiTruck className="h-4 w-4" />
                    <span>Free shipping on orders over Rp500.000</span>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-4 flex items-center justify-center gap-3 text-bloom-ink/30">
                    <span className="text-xs">🔒 Secure checkout</span>
                    <span className="h-1 w-1 rounded-full bg-bloom-rose/30" />
                    <span className="text-xs">💳 Multiple payments</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
