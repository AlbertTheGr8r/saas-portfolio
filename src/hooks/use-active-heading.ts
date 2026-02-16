'use client'

import { useEffect, useState } from 'react'

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      () => {
        const elements = headingIds.map((id) => document.getElementById(id))
        const triggerLine = window.innerHeight * 0.25 // 25% down the screen

        // Find the index of the current section
        // We look for the last element that has passed the trigger line
        let currentIdx = -1
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i]
          if (el && el.getBoundingClientRect().top <= triggerLine) {
            currentIdx = i
          }
        }

        // If we found a passed heading, set it
        if (currentIdx !== -1) {
          setActiveId(headingIds[currentIdx])
        } else if (window.scrollY > 100 && headingIds.length > 0) {
          // FALLBACK: If we've scrolled a bit but haven't hit the 
          // trigger for the first heading yet, default to the first one.
          setActiveId(headingIds[0])
        } else {
          // Truly at the top of the page (Hero/Title area)
          setActiveId('')
        }
      },
      {
        // Track the full page height to ensure constant updates
        rootMargin: '0px 0px -10% 0px',
        threshold: [0, 1],
      }
    )

    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headingIds])

  return activeId
}
