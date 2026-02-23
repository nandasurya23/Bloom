"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { 
  FiCheckCircle, 
  FiClock, 
  FiPackage, 
  FiTruck, 
  FiArrowRight,
  FiShoppingBag,
  FiCreditCard,
  FiMapPin,
  FiMessageCircle
} from "react-icons/fi";

type InfoStep = {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
  details?: string[];
};

const ORDER_STEPS: InfoStep[] = [
  {
    title: "Choose Bouquet",
    description: "Browse curated collections and pick your favorite arrangement.",
    icon: <FiPackage />,
    color: "text-bloom-rose",
    bgColor: "bg-bloom-rose/10",
    details: ["100+ arrangements", "Filter by occasion", "Price range available"]
  },
  {
    title: "Place Order",
    description: "Add to cart, fill checkout details, and confirm the simulation payment.",
    icon: <FiCheckCircle />,
    color: "text-bloom-leaf",
    bgColor: "bg-bloom-leaf/10",
    details: ["Secure checkout", "Multiple payments", "Order summary"]
  },
  {
    title: "Fast Delivery",
    description: "Your bouquet is prepared with care and sent to your selected address.",
    icon: <FiTruck />,
    color: "text-bloom-rose",
    bgColor: "bg-bloom-rose/10",
    details: ["Same day delivery", "Track order", "Free shipping $50+"]
  },
  {
    title: "Support Ready",
    description: "Need updates? Our team is ready through email and WhatsApp.",
    icon: <FiClock />,
    color: "text-bloom-leaf",
    bgColor: "bg-bloom-leaf/10",
    details: ["24/7 support", "Live tracking", "Order updates"]
  }
];

export function InfoSection(): JSX.Element {
  return (
    <section className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23f5d0c5%22%20fill-opacity=%220.1%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-bloom-rose/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bloom-leaf/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-2 rounded-full border border-bloom-rose/20 mb-4"
          >
            <FiShoppingBag className="text-bloom-rose" />
            <span className="text-sm font-medium text-bloom-ink/70">Simple 4-Step Process</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-bloom-ink mb-4"
          >
            How to{' '}
            <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
              Order
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-bloom-ink/60 max-w-2xl mx-auto"
          >
            Get your favorite flowers delivered in four simple steps
          </motion.p>
        </motion.div>

        {/* Steps Grid - Modern Layout */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-bloom-rose/30 via-bloom-leaf/30 to-bloom-rose/30 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {ORDER_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Desktop Timeline Dot */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-bloom-rose hidden lg:block z-10" />
                
                {/* Step Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-bloom-rose/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`text-3xl ${step.color}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-bloom-ink mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-bloom-ink/70 mb-4">
                    {step.description}
                  </p>

                  {/* Detail List */}
                  <ul className="space-y-2">
                    {step.details?.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-2 text-xs text-bloom-ink/60"
                      >
                        <div className={`w-1 h-1 rounded-full ${step.color === "text-bloom-rose" ? "bg-bloom-rose" : "bg-bloom-leaf"}`} />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Progress Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bloom-rose to-bloom-leaf rounded-b-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid - Added Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: FiShoppingBag, text: "Free shipping over $50", color: "rose" },
            { icon: FiCreditCard, text: "Secure payments", color: "leaf" },
            { icon: FiMapPin, text: "Track your order", color: "rose" },
            { icon: FiMessageCircle, text: "24/7 customer support", color: "leaf" }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-bloom-rose/10"
            >
              <feature.icon className={`text-${feature.color === "rose" ? "bloom-rose" : "bloom-leaf"} text-xl flex-shrink-0`} />
              <span className="text-xs sm:text-sm text-bloom-ink/70">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-bloom-rose/10 via-white to-bloom-leaf/10 border border-bloom-rose/20 p-8"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf flex items-center justify-center text-white text-xl border-4 border-white">
                  <FiPackage />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bloom-leaf to-bloom-rose flex items-center justify-center text-white text-xl border-4 border-white">
                  <FiTruck />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-bloom-ink">Ready to order?</h4>
                <p className="text-sm text-bloom-ink/60">Choose your favorite bouquet now</p>
              </div>
            </div>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-bloom-rose/30"
            >
              Start Shopping
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}