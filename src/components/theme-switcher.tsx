'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as React from 'react'

import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  if (!mounted) {
    return (
      <Button size="icon" variant="noShadow" disabled>
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-5 w-5" strokeWidth={2.5} />
    }
    return (
      <>
        <Sun className="hidden dark:inline h-5 w-5" strokeWidth={2.5} />
        <Moon className="inline dark:hidden h-5 w-5" strokeWidth={2.5} />
      </>
    )
  }

  return (
    <Button size="icon" variant="default" onClick={cycleTheme}>
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
