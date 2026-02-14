'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [isVisible, setIsVisible] = useState(!isHomePage)

  useEffect(() => {
    // On homepage, navbar only appears after scrolling past hero
    // On other pages, it's always visible
    if (!isHomePage) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        'bg-main border-b-2 border-border shadow-shadow',
        'dark:bg-main dark:border-darkBorder dark:shadow-darkShadow',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="mx-auto w-container max-w-full px-5">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-heading text-main-foreground hover:opacity-80 transition-opacity"
          >
            Albert
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-heading text-main-foreground rounded-base transition-all',
                  'hover:bg-secondary-background hover:text-foreground',
                  pathname === link.href && 'bg-secondary-background text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
