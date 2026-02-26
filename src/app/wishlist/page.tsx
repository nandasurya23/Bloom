"use client";

import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";
import { FiHeart, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage(): JSX.Element {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
              Your <span className="font-semibold text-bloom-rose">Wishlist</span>
            </h1>
            <p className="mt-2 text-base text-bloom-ink/60">
              {items.length > 0 
                ? `You have ${items.length} saved item${items.length > 1 ? 's' : ''} in your wishlist`
                : 'Your saved bouquets and floral inspirations'}
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
                <FiHeart className="h-12 w-12 text-bloom-rose/40" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-bloom-ink">Your wishlist is empty</h2>
              <p className="mt-2 text-bloom-ink/60">
                Save your favorite bouquets and they'll appear here for easy access.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-rose px-8 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                >
                  Explore Collection
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center rounded-full border border-bloom-rose/30 bg-white/80 px-8 py-3 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Wishlist Stats */}
            <div className="mb-6 flex items-center justify-between rounded-xl bg-white/60 px-4 py-3 text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2 text-bloom-ink/50">
                <FiHeart className="h-4 w-4 text-bloom-rose" />
                <span>{items.length} items in wishlist</span>
              </div>
              <button
                onClick={() => {
                  if (confirm('Remove all items from wishlist?')) {
                    items.forEach(item => removeItem(item.productId));
                  }
                }}
                className="text-bloom-ink/30 hover:text-bloom-rose transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* Wishlist Grid */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <article 
                  key={item.productId} 
                  className="group relative overflow-hidden rounded-2xl border border-bloom-rose/20 bg-white shadow-sm transition-all hover:border-bloom-rose/40 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-bloom-rose/5 to-bloom-blush">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <Link
                        href={`/product/${item.productId}`}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-white/90 py-2.5 text-sm font-medium text-bloom-ink backdrop-blur-sm transition-all hover:bg-white"
                      >
                        <FiShoppingBag className="h-4 w-4" />
                        View Details
                      </Link>
                    </div>

                    {/* Quick Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 text-bloom-ink/60 shadow-md backdrop-blur-sm transition-all hover:bg-rose-50 hover:text-bloom-rose"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-base font-semibold text-bloom-ink line-clamp-1">
                      {item.name}
                    </h2>
                    
                    {/* Price and Actions */}
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-bloom-ink/40">Starting from</p>
                        <p className="text-lg font-bold text-bloom-rose">
                          {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                      
                      <Link
                        href={`/product/${item.productId}`}
                        className="rounded-full border border-bloom-rose/30 bg-white/80 p-2.5 text-bloom-ink/60 transition-all hover:border-bloom-rose hover:bg-bloom-rose/5 hover:text-bloom-rose"
                      >
                        <FiShoppingBag className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Bottom Actions */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-bloom-rose/20 bg-white/60 p-6 backdrop-blur-sm sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-bloom-rose/10 p-3">
                  <FiHeart className="h-5 w-5 text-bloom-rose" />
                </div>
                <div>
                  <p className="text-sm font-medium text-bloom-ink">Ready to order?</p>
                  <p className="text-xs text-bloom-ink/40">Move items to cart or continue shopping</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 rounded-full bg-bloom-rose px-6 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                >
                  View Cart
                  <FiShoppingBag className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-bloom-rose/30 bg-white/80 px-6 py-3 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
                >
                  Shop More
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}