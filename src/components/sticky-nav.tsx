'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 400px (adjust as needed for hero height)
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        'bg-bg dark:bg-darkBg border-b-2 border-border dark:border-darkBorder',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="mx-auto w-container max-w-full px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-heading transition-transform hover:translate-x-boxShadowX hover:translate-y-boxShadowY"
          >
            Albert
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-base text-foreground hover:text-main-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
