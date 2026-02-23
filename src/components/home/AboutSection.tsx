"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { FiHeart,  FiStar, FiTruck, FiClock, FiShield } from "react-icons/fi";

export function AboutSection(): JSX.Element {
  const features = [
    { icon: FiHeart, text: "Thoughtfully Curated", color: "text-bloom-rose" },
    { icon: FiStar, text: "Eco-Friendly", color: "text-bloom-leaf" },
    { icon: FiStar, text: "Premium Quality", color: "text-bloom-rose" },
    { icon: FiTruck, text: "Free Delivery", color: "text-bloom-leaf" },
    { icon: FiClock, text: "Same Day", color: "text-bloom-rose" },
    { icon: FiShield, text: "Guaranteed Fresh", color: "text-bloom-leaf" }
  ];

  return (
    <section className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-bloom-rose/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-bloom-leaf/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-bloom-rose/5 to-bloom-leaf/5 blur-3xl" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-10 h-20 w-20 rounded-full bg-bloom-rose/10 blur-xl hidden lg:block"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 bottom-10 h-24 w-24 rounded-full bg-bloom-leaf/10 blur-xl hidden lg:block"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-1.5 border border-bloom-rose/20"
            >
              <FiHeart className="text-bloom-rose text-sm" />
              <span className="text-xs font-medium text-bloom-ink/70">Our Story</span>
            </motion.div>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bloom-ink"
            >
              About{' '}
              <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
                Bloom
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-base sm:text-lg leading-relaxed text-bloom-ink/80">
                Bloom is a modern flower shop experience focused on thoughtful arrangements, elegant visual storytelling,
                and seamless ordering.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-bloom-ink/70">
                Every bouquet is curated to feel personal, timeless, and ready for meaningful moments.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div>
                <p className="text-2xl font-bold text-bloom-ink">5+</p>
                <p className="text-xs text-bloom-ink/50">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-bloom-rose/20" />
              <div>
                <p className="text-2xl font-bold text-bloom-ink">10k+</p>
                <p className="text-xs text-bloom-ink/50">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-bloom-rose/20" />
              <div>
                <p className="text-2xl font-bold text-bloom-ink">100+</p>
                <p className="text-xs text-bloom-ink/50">Unique Designs</p>
              </div>
            </motion.div>

            {/* Features Grid - Mobile/Tablet */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 lg:hidden"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-xl bg-white/60 backdrop-blur-sm border border-bloom-rose/10 p-3"
                >
                  <feature.icon className={`${feature.color} text-lg`} />
                  <span className="text-xs font-medium text-bloom-ink/70">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf px-6 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30"
              >
                Learn More About Us
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-white to-bloom-cream/50 border border-bloom-rose/30 p-8 shadow-xl overflow-hidden">
              {/* Inner Decorative Elements */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-5" />
              
              <div className="relative">
                <h3 className="text-xl font-semibold text-bloom-ink mb-6">Why Choose Bloom?</h3>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 rounded-xl bg-white/80 backdrop-blur-sm border border-bloom-rose/10 p-4"
                    >
                      <div className={`rounded-full p-2 ${feature.color === "text-bloom-rose" ? "bg-bloom-rose/10" : "bg-bloom-leaf/10"}`}>
                        <feature.icon className={feature.color} />
                      </div>
                      <span className="text-sm font-medium text-bloom-ink">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-6 rounded-2xl bg-white/50 border border-bloom-rose/10"
                >
                  <p className="text-sm italic text-bloom-ink/70">
                    "Every flower tells a story, and we're here to help you tell yours."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf" />
                    <div>
                      <p className="text-xs font-medium text-bloom-ink">Sarah Johnson</p>
                      <p className="text-[10px] text-bloom-ink/50">Founder, Bloom</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white border border-bloom-rose/20 p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <FiTruck className="text-bloom-rose text-xl" />
                <div>
                  <p className="text-xs font-semibold text-bloom-ink">Free Delivery</p>
                  <p className="text-[10px] text-bloom-ink/50">On orders over $50</p>
                </div>
              </div>
            </motion.div>

            {/* Another Floating Card */}
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 rounded-2xl bg-white border border-bloom-rose/20 p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <FiClock className="text-bloom-leaf text-xl" />
                <div>
                  <p className="text-xs font-semibold text-bloom-ink">Same Day</p>
                  <p className="text-[10px] text-bloom-ink/50">Delivery available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}