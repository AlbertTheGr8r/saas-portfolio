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
}

export function ArticleCard({
  title,
  excerpt,
  url,
  date,
  tags,
  readingTime,
}: ArticleCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-base border-2 border-border bg-background p-6 shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow">
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
          aria-label={`Read more: ${title}`}
          className="font-heading text-sm underline underline-offset-4"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
