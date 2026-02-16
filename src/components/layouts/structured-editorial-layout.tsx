'use client'

import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useActiveHeading } from '@/hooks/use-active-heading'

interface TOCItem {
  id: string
  text: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  activeId: string
}

function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav className="hidden lg:block sticky top-48 w-full max-w-[160px]">
      {/* The Label: Shifted left to break the alignment slightly */}
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-mono mb-4 -ml-4">
        [ Content ]
      </h3>

      <ul className="relative space-y-0 border-l border-black dark:border-white/20">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="group">
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-2 pl-4 text-[11px] uppercase transition-none relative",
                  isActive
                    ? "text-foreground font-black scale-105 origin-left" 
                    : "text-muted-foreground/60 hover:text-foreground"
                )}
              >
                {/* The Active "Ink" Strike */}
                {isActive && (
                  <div className="absolute left-[-2px] top-0 bottom-0 w-[4px] bg-main shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                )}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

interface StructuredEditorialLayoutProps {
  title: string
  date: string
  updated?: string
  excerpt?: string
  tags: string[]
  url: string
  tocItems: TOCItem[]
  children: ReactNode
  footer?: ReactNode
}

export function StructuredEditorialLayout({
  title,
  date,
  updated,
  excerpt,
  tags,
  url,
  tocItems,
  children,
  footer,
}: StructuredEditorialLayoutProps) {
  const activeId = useActiveHeading(tocItems.map((item) => item.id))

  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-20">
        {/* HERO - Left aligned with tension */}
        <header className="mb-16 max-w-4xl">
          <div className="text-sm text-muted-foreground mb-4">
            <time dateTime={date}>
              {format(parseISO(date), 'MMMM d, yyyy')}
            </time>
            {updated && (
              <span> · Updated {format(parseISO(updated), 'MMMM d, yyyy')}</span>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading leading-tight">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {excerpt}
            </p>
          )}
        </header>

        {/* HARD DIVIDER */}
        <div className="border-t-4 border-border dark:border-main mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            {children}
          </div>

          {/* TOC RAIL */}
          <div className="lg:col-span-3 lg:pt-4">
            <TableOfContents items={tocItems} activeId={activeId} />
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="border-t-4 border-border dark:border-main my-20" />

        {/* FOOTER META - Full width with asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tags.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
                  Share
                </h3>
                <ShareButtons url={url} title={title} />
              </div>
            </div>
          </div>
        </div>

        {/* HARD FINAL DIVIDER */}
        <div className="border-t-4 border-border dark:border-main my-16" />

        {/* FOOTER NAVIGATION */}
        {footer && (
          <div className="max-w-4xl">
            {footer}
          </div>
        )}
      </div>
    </article>
  )
}
