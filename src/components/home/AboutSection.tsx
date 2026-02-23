"use client";

import type { JSX } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  FiHeart,  
  FiStar, 
  FiTruck, 
  FiClock, 
  FiShield,
  FiFeather,
  FiAward,
  FiUsers,
  FiArrowRight
} from "react-icons/fi";

export function AboutSection(): JSX.Element {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    { icon: FiHeart, text: "Thoughtfully Curated", color: "rose", description: "Each arrangement tells a unique story" },
    { icon: FiFeather, text: "Eco-Friendly", color: "leaf", description: "Sustainable practices & packaging" },
    { icon: FiStar, text: "Premium Quality", color: "rose", description: "Only the finest, freshest blooms" },
    { icon: FiTruck, text: "Free Delivery", color: "leaf", description: "On orders over $50" },
    { icon: FiClock, text: "Same Day", color: "rose", description: "Delivery available in city" },
    { icon: FiShield, text: "Guaranteed Fresh", color: "leaf", description: "7-day freshness guarantee" }
  ];

  const stats = [
    { value: "5+", label: "Years Experience", icon: FiAward },
    { value: "10k+", label: "Happy Customers", icon: FiUsers },
    { value: "100+", label: "Unique Designs", icon: FiStar },
    { value: "4.9", label: "Customer Rating", icon: FiHeart }
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "Founder & Head Designer", image: "SJ" },
    { name: "Michael Chen", role: "Master Florist", image: "MC" },
    { name: "Emma Williams", role: "Customer Experience", image: "EW" }
  ];

  return (
    <section ref={sectionRef} className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,208,197,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(180,210,170,0.1)_0%,transparent_50%)]" />
        
        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-bloom-rose/20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full border-2 border-bloom-leaf/20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-2 rounded-full border border-bloom-rose/20 mb-4"
          >
            <FiHeart className="text-bloom-rose" />
            <span className="text-sm font-medium text-bloom-ink/70">Our Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-bloom-ink mb-4"
          >
            About{' '}
            <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
              Bloom
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-bloom-ink/60 max-w-2xl mx-auto"
          >
            Crafting memorable moments through the art of floral design since 2020
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Description Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-bloom-rose/20 p-6 shadow-lg"
              >
                <p className="text-lg leading-relaxed text-bloom-ink/80">
                  Bloom is a modern flower shop experience focused on thoughtful arrangements, elegant visual storytelling, and seamless ordering.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-bloom-rose/5 to-bloom-leaf/5 rounded-2xl border border-bloom-rose/20 p-6 shadow-lg"
              >
                <p className="text-base leading-relaxed text-bloom-ink/70">
                  Every bouquet is curated to feel personal, timeless, and ready for meaningful moments.
                </p>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-bloom-rose/10"
                >
                  <stat.icon className="text-bloom-rose text-xl mx-auto mb-2" />
                  <p className="text-xl font-bold text-bloom-ink">{stat.value}</p>
                  <p className="text-xs text-bloom-ink/50">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Grid - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3 lg:hidden"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-bloom-rose/10"
                >
                  <div className={`p-1.5 rounded-full bg-bloom-${feature.color}/10`}>
                    <feature.icon className={`text-bloom-${feature.color} text-sm`} />
                  </div>
                  <span className="text-xs font-medium text-bloom-ink/70">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/about"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-bloom-rose/30"
              >
                Learn More About Us
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block space-y-6"
          >
            {/* Main Feature Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-white to-bloom-cream/50 border border-bloom-rose/30 p-8 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-5" />
              
              <div className="relative">
                <h3 className="text-2xl font-semibold text-bloom-ink mb-6 flex items-center gap-2">
                  <FiStar className="text-bloom-rose" />
                  Why Choose Bloom?
                </h3>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                      className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-bloom-rose/10"
                    >
                      <div className={`p-2 rounded-lg bg-bloom-${feature.color}/10 w-fit mb-2`}>
                        <feature.icon className={`text-bloom-${feature.color} text-xl`} />
                      </div>
                      <p className="font-medium text-bloom-ink text-sm mb-1">{feature.text}</p>
                      <p className="text-xs text-bloom-ink/50">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-bloom-rose/20 p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-bloom-ink mb-4">Meet Our Team</h4>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf flex items-center justify-center text-white font-bold">
                      {member.image}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-bloom-ink">{member.name}</p>
                      <p className="text-xs text-bloom-ink/50">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-bloom-rose/20"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-bloom-rose/10">
                  <FiTruck className="text-bloom-rose text-sm" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Free Delivery</p>
                  <p className="text-[10px] text-bloom-ink/50">Orders $50+</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-bloom-rose/20"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-bloom-leaf/10">
                  <FiClock className="text-bloom-leaf text-sm" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Same Day</p>
                  <p className="text-[10px] text-bloom-ink/50">Delivery available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-bloom-rose/10 via-white to-bloom-leaf/10 border border-bloom-rose/20 p-6"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5" />
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-leaf flex items-center justify-center text-white border-2 border-white">
                    <FiHeart />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-bloom-ink">Join our community</p>
                <p className="text-xs text-bloom-ink/60">10,000+ happy customers</p>
              </div>
            </div>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-rose to-bloom-leaf text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
            >
              Shop Now
              <FiArrowRight />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}