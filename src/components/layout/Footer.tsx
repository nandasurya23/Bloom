import type { JSX } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

export function Footer(): JSX.Element {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-bloom-rose/30 bg-gradient-to-b from-white to-bloom-cream/30">
      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-bloom-rose to-bloom-ink bg-clip-text text-transparent">
              Bloom
            </h3>
            <p className="text-xs sm:text-sm text-bloom-ink/70 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Crafting elegant floral arrangements for life&apos;s special moments since 2020.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
              <SocialIcon href="#" icon={FiInstagram} />
              <SocialIcon href="#" icon={FiFacebook} />
              <SocialIcon href="#" icon={FiTwitter} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-bloom-ink/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Shop', 'Wishlist', 'Cart'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-xs sm:text-sm text-bloom-ink/60 hover:text-bloom-rose transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-bloom-ink/80">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-bloom-ink/60">
                <FiMapPin className="flex-shrink-0 text-bloom-rose" />
                <span className="max-w-[200px]">123 Flower Street, Garden City</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-bloom-ink/60">
                <FiPhone className="flex-shrink-0 text-bloom-rose" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-bloom-ink/60">
                <FiMail className="flex-shrink-0 text-bloom-rose" />
                <span className="truncate">hello@bloom.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-bloom-ink/80">
              Open Hours
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-bloom-ink/60">
                <FiClock className="flex-shrink-0 text-bloom-rose" />
                <div className="flex flex-col">
                  <span>Mon-Fri: 9am-7pm</span>
                  <span>Sat-Sun: 10am-5pm</span>
                </div>
              </li>
            </ul>
            <div className="flex justify-center sm:justify-start pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-bloom-rose/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs text-bloom-rose">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bloom-rose opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bloom-rose"></span>
                </span>
                <span className="hidden xs:inline">Open Today until 7PM</span>
                <span className="xs:hidden">Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Responsive */}
        <div className="mt-8 sm:mt-12 border-t border-bloom-rose/20 pt-6 sm:pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-semibold text-bloom-ink/80">Subscribe to our newsletter</h4>
              <p className="text-xs sm:text-sm text-bloom-ink/60">Get 10% off your first order!</p>
            </div>
            <div className="flex w-full sm:w-auto flex-col xs:flex-row gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full xs:w-64 rounded-full border border-bloom-rose/30 bg-white/50 px-4 py-2 text-sm text-bloom-ink placeholder:text-bloom-ink/40 focus:border-bloom-rose focus:outline-none"
              />
              <button className="w-full xs:w-auto rounded-full bg-gradient-to-r from-bloom-rose to-bloom-ink px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar - Responsive */}
      <div className="border-t border-bloom-rose/20 bg-white/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-between text-xs text-bloom-ink/50">
            <p>© 2024 Bloom Flower Shop</p>
            <p className="flex items-center gap-1">
              Crafted with <span className="text-bloom-rose animate-pulse">❤</span> 
              <span className="hidden xs:inline"> for elegant gifting</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Icon Component
function SocialIcon({ href, icon: Icon }: { href: string; icon: IconType }) {
  return (
    <Link 
      href={href} 
      className="text-bloom-ink/50 hover:text-bloom-rose transition-all duration-300 hover:-translate-y-1"
    >
      <Icon className="text-lg sm:text-xl" />
    </Link>
  );
}
