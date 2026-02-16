'use client'

import { useEffect, useState } from 'react'

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting (in view)
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    // Observe all heading elements
    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headingIds])

  return activeId
}
