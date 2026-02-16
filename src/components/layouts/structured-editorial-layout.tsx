'use client'

import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import { ReactNode } from 'react'
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
    <nav className="hidden lg:block sticky top-24">
      <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-6 font-heading">
        here.
      </h3>
      <ul className="space-y-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-2 px-3 -mx-3 text-sm transition-none',
                activeId === item.id
                  ? 'bg-main text-main-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
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
        <div className="border-t-4 border-border dark:border-darkBorder mb-16" />

        {/* ASYMMETRIC CONTENT GRID - 9/3 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* MAIN CONTENT - Dominant 9 columns */}
          <div className="lg:col-span-9">
            {children}
          </div>

          {/* TOC RAIL - Subordinate 3 columns */}
          <div className="lg:col-span-3 lg:pt-4">
            <TableOfContents items={tocItems} activeId={activeId} />
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="border-t-4 border-border dark:border-darkBorder my-20" />

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
        <div className="border-t-4 border-border dark:border-darkBorder my-16" />

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
