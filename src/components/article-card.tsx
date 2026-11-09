import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'

interface ArticleCardProps {
  title: string
  excerpt?: string
  url: string
  date: string
  tags: string[]
  readingTime: number
  coverImage?: string
  coverImageAlt?: string
  coverImageCredit?: string
}

export function ArticleCard({
  title,
  excerpt,
  url,
  date,
  tags,
  readingTime,
  coverImage,
  coverImageAlt,
  coverImageCredit,
}: ArticleCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-base border-2 border-border bg-secondary-background shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:shadow-darkShadow">
      {coverImage && (
        <div className="aspect-video w-full overflow-hidden border-b-2 border-border dark:border-darkBorder">
          <img
            src={coverImage}
            alt={coverImageAlt || title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {coverImage && coverImageCredit && (
        <p className="px-6 pt-3 text-xs text-muted-foreground">
          {coverImageCredit}
        </p>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <time dateTime={date}>{format(parseISO(date), 'MMM d, yyyy')}</time>
          <span>{readingTime} min read</span>
        </div>

        <h3 className="mt-3 text-xl font-heading leading-snug">
          <Link href={url} className="transition-opacity hover:opacity-80">
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {excerpt}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <Link
            href={url}
            aria-label={`Continue reading: ${title}`}
            className="font-heading text-sm underline underline-offset-4"
          >
            Continue →
          </Link>
        </div>
      </div>
    </article>
  )
}
