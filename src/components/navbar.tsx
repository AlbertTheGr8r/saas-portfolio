'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  // { href: '/contact', label: 'Contact' },
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
        'fixed top-0 left-0 right-0 z-50 py-2 transition-transform duration-300 ease-in-out',
        'bg-main border-b-4 border-border',
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
            {navLinks.map((link) => {
              const normalizedPath = pathname.replace(/\/$/, '') || '/';
              const normalizedLink = link.href.replace(/\/$/, '') || '/';
              const isActive = normalizedLink === '/' 
                ? normalizedPath === '/' 
                : normalizedPath.startsWith(normalizedLink);

              return (
                <Button
                  key={link.href}
                  asChild
                  variant="reverse"
                  className={cn(
                    'px-4 py-2 ml-2 text-sm font-heading rounded-base transition-all',
                    isActive && 'translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY shadow-shadow'
                  )}
                >
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              );
            })}
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
