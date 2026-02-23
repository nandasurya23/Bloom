"use client";

import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiGrid, FiHeart, FiAward } from "react-icons/fi";

export function HeroSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-bloom-rose/30 bg-gradient-to-br from-white via-bloom-blush to-bloom-cream/70 shadow-xl sm:shadow-2xl">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5 sm:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-bloom-blush/40" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bloom-rose/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-bloom-leaf/20 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 border border-bloom-rose/20 shadow-sm"
              >
                <FiHeart className="text-bloom-rose text-sm animate-pulse" />
                <span className="text-xs font-medium text-bloom-ink/70">
                  Fresh Flowers • Same Day Delivery
                </span>
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bloom-rose">
                  Bloom Collection 2024
                </p>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-bloom-ink">
                  <span className="block">Elegant Flowers</span>
                  <span className="block bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl mt-2">
                    For Every Moment
                  </span>
                </h1>
              </div>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-bloom-ink/70 max-w-xl leading-relaxed">
                Discover curated bouquets with soft palettes, premium stems, and a calm shopping flow tailored for gifting.
              </p>

              {/* Feature Pills */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: FiAward, text: "Premium Quality", color: "rose" },
                  { icon: FiHeart, text: "Eco-Friendly", color: "leaf" },
                  { icon: FiGrid, text: "100+ Arrangements", color: "rose" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className={`
                      flex items-center gap-2 rounded-full px-4 py-2 text-sm
                      ${feature.color === "rose" 
                        ? "bg-bloom-rose/10 text-bloom-rose" 
                        : "bg-bloom-leaf/10 text-bloom-leaf"}
                    `}
                  >
                    <feature.icon className="text-sm" />
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/shop"
                    className="group inline-flex w-full justify-center items-center gap-3 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf px-8 py-4 text-base font-medium text-white shadow-lg shadow-bloom-rose/30 hover:shadow-xl transition-all duration-300"
                  >
                    Shop Now 
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/collections"
                    className="group inline-flex w-full justify-center items-center gap-3 rounded-full border-2 border-bloom-rose/30 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-medium text-bloom-ink hover:border-bloom-rose/60 hover:bg-white transition-all duration-300"
                  >
                    View Collection 
                    <FiGrid className="transition-transform duration-300 group-hover:rotate-90" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 pt-6 border-t border-bloom-rose/20"
              >
                <div>
                  <p className="text-2xl font-bold text-bloom-ink">10k+</p>
                  <p className="text-xs text-bloom-ink/50">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-bloom-rose/20" />
                <div>
                  <p className="text-2xl font-bold text-bloom-ink">4.9</p>
                  <p className="text-xs text-bloom-ink/50">Customer Rating</p>
                </div>
                <div className="w-px h-10 bg-bloom-rose/20" />
                <div>
                  <p className="text-2xl font-bold text-bloom-ink">100+</p>
                  <p className="text-xs text-bloom-ink/50">Unique Designs</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                {/* Main Image */}
                <Image
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80"
                  alt="Beautiful flower bouquet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bloom-rose/30 via-transparent to-bloom-leaf/30" />
                
                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-bloom-rose/10 p-2">
                      <FiHeart className="text-bloom-rose text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-bloom-ink">Handpicked Daily</p>
                      <p className="text-xs text-bloom-ink/50">Fresh from garden</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-bloom-leaf/10 p-2">
                      <FiAward className="text-bloom-leaf text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-bloom-ink">Premium Quality</p>
                      <p className="text-xs text-bloom-ink/50">Guaranteed fresh</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Circles */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-bloom-rose/20 blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-bloom-leaf/20 blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-bloom-rose via-bloom-leaf to-bloom-rose opacity-20" />
    </section>
  );
}
