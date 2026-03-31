'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [isVisible, setIsVisible] = useState(!isHomePage)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 py-2 transition-transform duration-300 ease-in-out hidden md:block',
          'bg-main border-b-4 border-border',
          'dark:bg-main dark:border-darkBorder dark:shadow-darkShadow',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="mx-auto w-container max-w-full px-5">
          <div className="flex h-14 items-center justify-between">
            <Link 
              href="/" 
              className="text-xl font-heading text-main-foreground hover:opacity-80 transition-opacity"
            >
              Albert
            </Link>

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

            <div className="flex items-center">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <Button
        size="icon"
        variant="default"
        className={cn(
          'fixed right-5 z-50 top-[env(safe-area-inset-top)] mt-4 transition-transform duration-300 ease-in-out md:hidden',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div 
            className="absolute inset-0 bg-overlay" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div 
            className={cn(
              'absolute right-0 top-0 bottom-0 w-full max-w-sm',
              'bg-main border-l-4 border-border',
              'dark:bg-main dark:border-darkBorder dark:shadow-darkShadow',
              'pt-[env(safe-area-inset-top)]'
            )}
          >
            <div className="flex h-14 items-center justify-between px-5">
              <div className="ml-2 mt-4">
                <ThemeSwitcher />
              </div>
              <Button
                className="mt-4"
                size="icon"
                variant="noShadow"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col items-center gap-4 p-8">
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
                    variant="neutral"
                    className={cn(
                      'w-full max-w-xs px-4 py-3 text-lg font-heading rounded-base transition-all',
                      isActive && 'translate-x-boxShadowX translate-y-boxShadowY shadow-none'
                    )}
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
