import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import { MDXContent } from '@/components/mdx-content'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  activeId?: string
}

function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav className="hidden lg:block sticky top-24">
      <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
        On this page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-sm transition-colors',
                activeId === item.id
                  ? 'border-l-4 border-main pl-3 font-medium text-foreground'
                  : 'border-l-4 border-transparent pl-3 text-muted-foreground hover:text-foreground'
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
  activeTocId?: string
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
  activeTocId,
  children,
  footer,
}: StructuredEditorialLayoutProps) {
  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
        {/* HERO */}
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <div className="text-sm text-muted-foreground">
            <time dateTime={date}>
              {format(parseISO(date), 'MMMM d, yyyy')}
            </time>
            {updated && (
              <span> · Updated {format(parseISO(updated), 'MMMM d, yyyy')}</span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-heading md:text-5xl">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {excerpt}
            </p>
          )}
        </header>

        {/* DIVIDER */}
        <div className="border-t-2 border-border dark:border-darkBorder mb-12 max-w-3xl mx-auto" />

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-2xl">
              {children}
            </div>
          </div>

          {/* TOC RAIL */}
          <div className="lg:col-span-4">
            <TableOfContents items={tocItems} activeId={activeTocId} />
          </div>
        </div>

        {/* FOOTER META */}
        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t-2 border-border dark:border-darkBorder">
          {tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
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
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">
              Share
            </h3>
            <ShareButtons url={url} title={title} />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t-2 border-border dark:border-darkBorder my-12 max-w-2xl mx-auto" />

        {/* FOOTER NAVIGATION */}
        {footer && (
          <div className="max-w-2xl mx-auto">
            {footer}
          </div>
        )}
      </div>
    </article>
  )
}
