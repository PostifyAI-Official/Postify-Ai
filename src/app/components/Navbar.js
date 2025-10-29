'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-zinc-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg group-hover:bg-emerald-700 transition"></div>
            <span className="text-xl font-bold text-black">Postify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-zinc-600 hover:text-black transition font-medium">
              Home
            </Link>
            <Link href="/about" className="text-zinc-600 hover:text-black transition font-medium">
              About
            </Link>
            <Link href="/pricing" className="text-zinc-600 hover:text-black transition font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-zinc-600 hover:text-black transition font-medium">
              Contact
            </Link>
            <Link href="/faqs" className="text-zinc-600 hover:text-black transition font-medium">
              FAQs
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link href="/dashboard" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-zinc-600 hover:text-black transition font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {!user && (
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                Sign In
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-zinc-100 focus:outline-none transition"
            >
              <svg
                className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            >
              About
            </Link>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            >
              Contact
            </Link>
            <Link
              href="/faqs"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            >
              FAQs
            </Link>
            <div className="pt-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="w-full block px-3 py-2 rounded-md text-center bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="w-full block px-3 py-2 rounded-md text-center bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
