import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import { MDXContent } from '@/components/mdx-content'
import { ReactNode } from 'react'

interface EditorialLayoutProps {
  title: string
  date: string
  updated?: string
  excerpt?: string
  tags: string[]
  url: string
  children: ReactNode
  footer?: ReactNode
}

export function EditorialLayout({
  title,
  date,
  updated,
  excerpt,
  tags,
  url,
  children,
  footer,
}: EditorialLayoutProps) {
  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
        {/* HERO */}
        <header className="text-center mb-12">
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
        <div className="border-t-2 border-border dark:border-darkBorder mb-12" />

        {/* CONTENT */}
        <div className="max-w-2xl mx-auto">
          {children}
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
        <div className="border-t-2 border-border dark:border-darkBorder my-12" />

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
