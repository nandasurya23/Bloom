"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiPackage, FiTruck, FiArrowRight } from "react-icons/fi";

type InfoStep = {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
};

const ORDER_STEPS: InfoStep[] = [
  {
    title: "Choose Bouquet",
    description: "Browse curated collections and pick your favorite arrangement.",
    icon: <FiPackage />,
    color: "text-bloom-rose",
    bgColor: "bg-bloom-rose/10"
  },
  {
    title: "Place Order",
    description: "Add to cart, fill checkout details, and confirm the simulation payment.",
    icon: <FiCheckCircle />,
    color: "text-bloom-leaf",
    bgColor: "bg-bloom-leaf/10"
  },
  {
    title: "Fast Delivery",
    description: "Your bouquet is prepared with care and sent to your selected address.",
    icon: <FiTruck />,
    color: "text-bloom-rose",
    bgColor: "bg-bloom-rose/10"
  },
  {
    title: "Support Ready",
    description: "Need updates? Our team is ready through email and WhatsApp.",
    icon: <FiClock />,
    color: "text-bloom-leaf",
    bgColor: "bg-bloom-leaf/10"
  }
];

export function InfoSection(): JSX.Element {
  return (
    <section className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-bloom-rose/5 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-bloom-leaf/5 blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center mb-10 sm:mb-12 lg:mb-16"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-1.5 border border-bloom-rose/20 mb-4"
        >
          <FiPackage className="text-bloom-rose text-sm" />
          <span className="text-xs font-medium text-bloom-ink/70">Simple Process</span>
        </motion.div>

        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bloom-ink"
        >
          How To{' '}
          <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
            Order
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-sm sm:text-base text-bloom-ink/60 max-w-2xl mx-auto"
        >
          Four simple steps to bring beautiful flowers to your doorstep
        </motion.p>
      </motion.div>

      {/* Steps Grid */}
      <div className="relative max-w-7xl mx-auto">
        {/* Connecting Lines - Desktop Only */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-bloom-rose/20 via-bloom-leaf/20 to-bloom-rose/20 hidden lg:block" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ORDER_STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white flex items-center justify-center text-sm font-bold shadow-lg z-10">
                {index + 1}
              </div>

              {/* Main Card */}
              <article className="relative rounded-2xl border border-bloom-rose/20 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-bloom-cream/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.bgColor} mb-4`}
                  >
                    <div className={`text-2xl ${step.color} transform group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-bloom-ink mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-bloom-ink/70 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bloom-rose to-bloom-leaf rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: "0%" }}
                  />
                </div>
              </article>

              {/* Arrow Connector - Desktop Only */}
              {index < ORDER_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-20"
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-bloom-rose/30 flex items-center justify-center shadow-md">
                    <FiArrowRight className="text-bloom-rose" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-bloom-rose/5 to-bloom-leaf/5 border border-bloom-rose/20 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-bloom-rose/20 border-2 border-white flex items-center justify-center">
                  <FiTruck className="text-bloom-rose text-sm" />
                </div>
                <div className="w-8 h-8 rounded-full bg-bloom-leaf/20 border-2 border-white flex items-center justify-center">
                  <FiClock className="text-bloom-leaf text-sm" />
                </div>
                <div className="w-8 h-8 rounded-full bg-bloom-rose/20 border-2 border-white flex items-center justify-center">
                  <FiPackage className="text-bloom-rose text-sm" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-bloom-ink">Need help with your order?</p>
                <p className="text-xs text-bloom-ink/60">Our support team is available 24/7</p>
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-lg"
            >
              Contact Support
              <FiArrowRight />
            </motion.a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-bloom-rose/5 blur-2xl hidden lg:block"
        />
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-bloom-leaf/5 blur-2xl hidden lg:block"
        />
      </div>
    </section>
  );
}