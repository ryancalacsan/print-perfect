"use client"

import Link from "next/link"
import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <RxHamburgerMenu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            Print Perfect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link href="/business-cards" className="hover:text-primary">
              Business Cards
            </Link>
            <Link href="/postcards" className="hover:text-primary">
              Postcards
            </Link>
            <Link href="/stationery" className="hover:text-primary">
              Stationery
            </Link>
            <Link href="/faq" className="hover:text-primary">
              Help & FAQs
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </header>
  )
}
