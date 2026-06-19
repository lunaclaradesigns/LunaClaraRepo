"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-warm-white border-b border-gold/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo variant="light" width={110} height={110} priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-body tracking-wide">

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 text-charcoal hover:text-gold transition-colors py-2">
                Shop
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 w-48 bg-warm-white border border-gold/20 shadow-lg rounded-sm py-2 z-50">
                  <Link href="/collections/individual" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    Individual Items
                  </Link>
                  <Link href="/collections/individual" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    View All
                  </Link>
                </div>
              )}
            </div>

            {/* Gift Boxes dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGiftOpen(true)}
              onMouseLeave={() => setGiftOpen(false)}
            >
              <button className="flex items-center gap-1 text-charcoal hover:text-gold transition-colors py-2">
                Gift Boxes
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {giftOpen && (
                <div className="absolute top-full left-0 w-48 bg-warm-white border border-gold/20 shadow-lg rounded-sm py-2 z-50">
                  <Link href="/collections/medium-box" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    Medium Gift Box
                  </Link>
                  <Link href="/collections/large-box" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    Large Gift Box
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-charcoal hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-charcoal hover:text-gold transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side: Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-charcoal hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-warm-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Slide-in */}
        {menuOpen && (
          <div className="md:hidden absolute top-full right-0 w-72 bg-warm-white border-l border-b border-gold/20 shadow-xl z-50 py-6 px-6 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-soft-gray mb-3 font-body">Shop</p>
            <Link href="/collections/individual" onClick={() => setMenuOpen(false)}
              className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
              Individual Items
            </Link>
            <p className="text-xs uppercase tracking-widest text-soft-gray mt-4 mb-3 font-body">Gift Boxes</p>
            <Link href="/collections/medium-box" onClick={() => setMenuOpen(false)}
              className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
              Medium Gift Box
            </Link>
            <Link href="/collections/large-box" onClick={() => setMenuOpen(false)}
              className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
              Large Gift Box
            </Link>
            <div className="border-t border-gold/20 mt-4 pt-4 flex flex-col gap-1">
              <Link href="/about" onClick={() => setMenuOpen(false)}
                className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
                About
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
                Contact
              </Link>
              <Link href="/jewelry-care" onClick={() => setMenuOpen(false)}
                className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
                Jewelry Care
              </Link>
              <Link href="/shipping-returns" onClick={() => setMenuOpen(false)}
                className="py-2.5 text-base text-charcoal hover:text-gold transition-colors font-body">
                Shipping & Returns
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
