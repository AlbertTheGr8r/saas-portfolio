import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import { ReactNode } from 'react'
import Link from 'next/link'

interface EditorialLayoutProps {
  title: string
  date: string
  updated?: string
  excerpt?: string
  coverImage?: string
  coverImageAlt?: string
  coverImageCredit?: string
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
  coverImage,
  coverImageAlt,
  coverImageCredit,
  tags,
  url,
  children,
  footer,
}: EditorialLayoutProps) {
  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-4xl px-5 py-12 md:py-20">
        {/* HERO - Left aligned with brutalist scale */}
        <header className="mb-16">
          <div className="text-sm text-muted-foreground mb-4">
            <time dateTime={date}>
              {format(parseISO(date), 'MMMM d, yyyy')}
            </time>
            {updated && (
              <>
                {' · Updated '}
                <time dateTime={updated}>
                  {format(parseISO(updated), 'MMMM d, yyyy')}
                </time>
              </>
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

          {coverImage && (
            <figure className="mt-8">
              <img
                src={coverImage}
                alt={coverImageAlt || title}
                className="w-full rounded-base border-2 border-border object-cover shadow-shadow dark:border-darkBorder dark:shadow-darkShadow"
                loading="lazy"
                decoding="async"
              />
              {coverImageCredit && (
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  {coverImageCredit}
                </figcaption>
              )}
            </figure>
          )}
        </header>

        {/* HARD DIVIDER */}
        <div className="border-t-4 border-border dark:border-main mb-16" />

        {/* CONTENT - Full width reading */}
        <div className="max-w-3xl">
          {children}
        </div>

        {/* SECTION DIVIDER */}
        <div className="border-t-4 border-border dark:border-main my-20" />

        {/* FOOTER META */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
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

        <p className="mt-8 max-w-3xl text-xs text-muted-foreground">
          © Albert Francis P. Florin, all rights reserved. Short quotation under 90
          words with credit and link welcome. See <Link href="/terms" className="underline">terms</Link> for reuse.
        </p>

        {/* HARD FINAL DIVIDER */}
        <div className="border-t-4 border-border dark:border-main my-16" />

        {/* FOOTER NAVIGATION */}
        {footer && (
          <div className="max-w-3xl">
            {footer}
          </div>
        )}
      </div>
    </article>
  )
}
