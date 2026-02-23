"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiGrid, FiHeart, FiAward } from "react-icons/fi";

export function HeroSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-bloom-rose/30 bg-gradient-to-br from-white via-bloom-blush to-bloom-cream/70 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 mx-2 sm:mx-4 lg:mx-6 shadow-xl sm:shadow-2xl">
      
      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5 sm:opacity-10 lg:opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-bloom-blush/40 sm:from-white/90 sm:via-white/70 lg:from-white/80" />
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute right-4 top-4 h-16 w-16 rounded-full bg-gradient-to-br from-bloom-rose/20 to-bloom-rose/5 blur-xl sm:block hidden md:right-8 md:top-8 md:h-20 md:w-20 lg:h-24 lg:w-24"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-8 right-8 h-20 w-20 rounded-full bg-gradient-to-tl from-bloom-leaf/20 to-bloom-leaf/5 blur-xl md:block hidden lg:bottom-12 lg:right-20 lg:h-28 lg:w-28"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto lg:mx-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 md:mb-5 lg:mb-6 border border-bloom-rose/20 mx-auto lg:mx-0 w-fit"
        >
          <FiHeart className="text-bloom-rose text-xs sm:text-sm animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-bloom-ink/70">
            <span className="hidden xs:inline">Fresh Flowers • </span>
            <span>Same Day Delivery</span>
          </span>
        </motion.div>

        {/* Title */}
        <div className="text-center lg:text-left">
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-bloom-rose mb-1 sm:mb-2">
            Bloom Collection 2024
          </p>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-bloom-ink">
            <span className="block">Elegant Flowers</span>
            <span className="block bg-gradient-to-r from-bloom-rose to-bloom-ink bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-1 sm:mt-2">
              For Every Moment
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-xs sm:text-sm md:text-base lg:text-lg text-bloom-ink/70 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-4 lg:px-0">
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
          className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-3 mt-3 sm:mt-4 md:mt-5 lg:mt-6"
        >
          {[
            { icon: FiAward, text: "Premium Quality" },
            { icon: FiHeart, text: "Eco-Friendly" },
            { icon: FiGrid, text: "100+ Arrangements" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/60 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border border-bloom-rose/10"
            >
              <feature.icon className="text-bloom-rose text-[10px] sm:text-xs md:text-sm" />
              <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-bloom-ink/70 whitespace-nowrap">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons - Tata letak yang diperbaiki */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-3 mt-5 sm:mt-6 md:mt-7 lg:mt-8"
        >
          {/* Container untuk buttons dengan width yang konsisten */}
          <div className="w-full max-w-xs sm:max-w-md flex flex-col sm:flex-row justify-center gap-3">
            {/* Button 1 - Shop Now */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:flex-1"
            >
              <Link
                href="/shop"
                className="group inline-flex w-full justify-center items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-ink px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all duration-300 hover:shadow-xl"
              >
                Shop Now 
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-sm sm:text-base" />
              </Link>
            </motion.div>

            {/* Button 2 - View Collection */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:flex-1"
            >
              <Link
                href="/shop"
                className="group inline-flex w-full justify-center items-center gap-2 rounded-full border-2 border-bloom-rose/30 bg-white/80 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-bloom-ink transition-all duration-300 hover:border-bloom-rose/60 hover:bg-white"
              >
                View Collection 
                <FiGrid className="transition-transform duration-300 group-hover:rotate-90 text-sm sm:text-base" />
              </Link>
            </motion.div>
          </div>

          {/* Optional: Additional action untuk layar besar */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[10px] sm:text-xs text-bloom-ink/40 mt-2 text-center lg:text-left"
          >
            Free shipping on orders over $50
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-6 sm:mt-7 md:mt-8 lg:mt-10"
        >
          <div className="text-center lg:text-left">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-bloom-ink">10k+</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-bloom-ink/50">Happy Customers</p>
          </div>
          <div className="w-px h-4 sm:h-5 md:h-6 lg:h-8 bg-bloom-rose/20" />
          
          <div className="text-center lg:text-left">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-bloom-ink">4.9</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-bloom-ink/50">Customer Rating</p>
          </div>
          <div className="w-px h-4 sm:h-5 md:h-6 lg:h-8 bg-bloom-rose/20" />
          
          <div className="text-center lg:text-left">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-bloom-ink">100+</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-bloom-ink/50">Unique Designs</p>
          </div>
        </motion.div>

        {/* Mobile decorative element */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-bloom-rose/10 blur-xl lg:hidden"
        />
      </motion.div>
    </section>
  );
}