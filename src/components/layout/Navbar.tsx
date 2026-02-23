"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingBag, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bloom-rose/20 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link 
          href="/" 
          className="group text-xl sm:text-2xl font-bold tracking-tight text-bloom-ink relative"
        >
          <span className="bg-gradient-to-r from-bloom-rose to-bloom-ink bg-clip-text text-transparent">
            Bloom
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-bloom-rose to-bloom-ink transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/shop" icon={FiShoppingBag} text="Shop" />
          <NavLink href="/wishlist" icon={FiHeart} text="Wishlist" />
          <NavLink href="/cart" icon={FiShoppingCart} text="Cart" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-bloom-rose/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX className="text-2xl text-bloom-ink" />
          ) : (
            <FiMenu className="text-2xl text-bloom-ink" />
          )}
        </button>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-bloom-rose/20 bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col p-4 space-y-2"
            >
              <MobileNavLink href="/shop" icon={FiShoppingBag} text="Shop" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/wishlist" icon={FiHeart} text="Wishlist" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/cart" icon={FiShoppingCart} text="Cart" onClick={() => setIsMenuOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Desktop Nav Link Component
function NavLink({ href, icon: Icon, text }: { href: string; icon: any; text: string }) {
  return (
    <Link 
      href={href} 
      className="group relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 text-sm font-medium text-bloom-ink/80 transition-all duration-300 hover:bg-bloom-rose/10 hover:text-bloom-rose"
    >
      <Icon className="text-base lg:text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
      <span className="hidden sm:inline">{text}</span>
      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-bloom-rose to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
    </Link>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, icon: Icon, text, onClick }: { href: string; icon: any; text: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-bloom-ink/80 hover:bg-bloom-rose/10 hover:text-bloom-rose transition-colors"
    >
      <Icon className="text-xl" />
      <span className="font-medium">{text}</span>
    </Link>
  );
}