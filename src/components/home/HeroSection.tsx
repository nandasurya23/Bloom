"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiGrid } from "react-icons/fi";

export function HeroSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-bloom-rose/40 bg-gradient-to-br from-white via-bloom-blush/70 to-bloom-cream px-6 py-16 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative max-w-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bloom-ink/60">Bloom Collection</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-bloom-ink sm:text-5xl lg:text-6xl">
          Elegant Flowers For Every Meaningful Moment
        </h1>
        <p className="mt-5 text-base leading-relaxed text-bloom-ink/75 sm:text-lg">
          Discover curated bouquets with soft palettes, premium stems, and a calm shopping flow tailored for gifting.
        </p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <motion.div whileHover={{ y: -2 }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-bloom-rose/70 bg-white px-5 py-2.5 text-sm font-medium text-bloom-ink shadow-sm"
            >
              Shop Now <FiArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-bloom-rose/60 bg-bloom-cream px-5 py-2.5 text-sm font-medium text-bloom-ink"
            >
              View Collection <FiGrid />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-6 top-10 h-16 w-16 rounded-full bg-bloom-rose/35 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-16 h-20 w-20 rounded-full bg-white/60"
        />
        <motion.div
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-36 top-24 hidden h-10 w-10 rounded-full bg-bloom-leaf/25 sm:block"
        />
      </motion.div>
    </section>
  );
}
