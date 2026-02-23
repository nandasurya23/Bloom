"use client";

import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, 
  FiMessageCircle, 
  FiUser, 
  FiSend, 
  FiCheckCircle,
  FiClock,
  FiHeadphones,
  FiArrowRight
} from "react-icons/fi";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_CONTACT_FORM: ContactFormState = {
  name: "",
  email: "",
  message: ""
};

export function ContactSection(): JSX.Element {
  const [form, setForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<keyof ContactFormState | null>(null);

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_CONTACT_FORM);
    
    // Auto hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="relative mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-bloom-rose/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-bloom-leaf/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose/10 to-bloom-leaf/10 px-4 py-1.5 border border-bloom-rose/20 mb-4"
          >
            <FiHeadphones className="text-bloom-rose text-sm" />
            <span className="text-xs font-medium text-bloom-ink/70">Get In Touch</span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bloom-ink"
          >
            Contact{' '}
            <span className="bg-gradient-to-r from-bloom-rose to-bloom-leaf bg-clip-text text-transparent">
              Us
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Description Card */}
            <div className="rounded-2xl bg-gradient-to-br from-white to-bloom-cream/30 border border-bloom-rose/20 p-6 sm:p-8 shadow-lg">
              <p className="text-base sm:text-lg text-bloom-ink/80 leading-relaxed">
                Need a custom arrangement or urgent same-day bouquet? Reach out and our team will assist.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-bloom-rose/20">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-bloom-rose/10 p-2">
                    <FiClock className="text-bloom-rose" />
                  </div>
                  <div>
                    <p className="text-xs text-bloom-ink/50">Response Time</p>
                    <p className="text-sm font-medium text-bloom-ink">&lt; 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-bloom-leaf/10 p-2">
                    <FiHeadphones className="text-bloom-leaf" />
                  </div>
                  <div>
                    <p className="text-xs text-bloom-ink/50">Support</p>
                    <p className="text-sm font-medium text-bloom-ink">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <motion.a
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:hello@bloomflowershop.com"
                className="group relative rounded-xl bg-white border border-bloom-rose/20 p-5 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-bloom-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="rounded-full bg-bloom-rose/10 p-3 w-fit mb-3">
                    <FiMail className="text-bloom-rose text-xl" />
                  </div>
                  <p className="text-xs text-bloom-ink/50 mb-1">Email Us</p>
                  <p className="text-sm font-medium text-bloom-ink break-all">
                    hello@bloomflowershop.com
                  </p>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-5 right-5"
                  >
                    <FiArrowRight className="text-bloom-rose opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </motion.a>

              {/* WhatsApp Card */}
              <motion.a
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/628123456789"
                className="group relative rounded-xl bg-white border border-bloom-leaf/20 p-5 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-bloom-leaf/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="rounded-full bg-bloom-leaf/10 p-3 w-fit mb-3">
                    <FiMessageCircle className="text-bloom-leaf text-xl" />
                  </div>
                  <p className="text-xs text-bloom-ink/50 mb-1">WhatsApp</p>
                  <p className="text-sm font-medium text-bloom-ink">+62 812-3456-789</p>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-5 right-5"
                  >
                    <FiArrowRight className="text-bloom-leaf opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </motion.a>
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 text-sm text-bloom-ink/60 bg-white/50 rounded-xl p-4 border border-bloom-rose/10"
            >
              <FiCheckCircle className="text-bloom-leaf flex-shrink-0" />
              <span>All messages are replied within 2 hours during business hours</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-bloom-rose/20 p-6 sm:p-8 shadow-xl overflow-hidden">
              {/* Form Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-bloom-rose/5 via-transparent to-bloom-leaf/5" />
              
              <div className="relative">
                <h3 className="text-xl font-semibold text-bloom-ink mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-bloom-ink/60 flex items-center gap-1">
                      <FiUser className="text-bloom-rose" />
                      Your Name
                    </label>
                    <motion.div
                      animate={focusedField === "name" ? { scale: 1.02 } : { scale: 1 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        value={form.name}
                        onChange={updateField("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-bloom-rose/30 bg-white/50 px-4 py-3 text-sm text-bloom-ink placeholder:text-bloom-ink/30 focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20 transition-all"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-bloom-ink/60 flex items-center gap-1">
                      <FiMail className="text-bloom-rose" />
                      Email Address
                    </label>
                    <motion.div
                      animate={focusedField === "email" ? { scale: 1.02 } : { scale: 1 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-bloom-rose/30 bg-white/50 px-4 py-3 text-sm text-bloom-ink placeholder:text-bloom-ink/30 focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20 transition-all"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-bloom-ink/60 flex items-center gap-1">
                      <FiMessageCircle className="text-bloom-rose" />
                      Your Message
                    </label>
                    <motion.div
                      animate={focusedField === "message" ? { scale: 1.02 } : { scale: 1 }}
                      className="relative"
                    >
                      <textarea
                        value={form.message}
                        onChange={updateField("message")}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full rounded-xl border border-bloom-rose/30 bg-white/50 px-4 py-3 text-sm text-bloom-ink placeholder:text-bloom-ink/30 focus:border-bloom-rose focus:outline-none focus:ring-2 focus:ring-bloom-rose/20 transition-all resize-none"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <button 
                      type="submit" 
                      className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-bloom-rose to-bloom-leaf px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <FiSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                      <motion.div
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-bloom-leaf to-bloom-rose"
                      />
                    </button>
                  </motion.div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-xl bg-gradient-to-r from-bloom-leaf/10 to-bloom-rose/10 border border-bloom-leaf/30 p-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-bloom-leaf/20 p-2">
                              <FiCheckCircle className="text-bloom-leaf text-lg" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-bloom-ink">Message sent successfully!</p>
                              <p className="text-xs text-bloom-ink/60">We will reply within 2 hours.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}