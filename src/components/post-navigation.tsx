import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Post {
  slug: string
  title: string
  date: string
  url: string
}

interface PostNavigationProps {
  previousPost?: Post
  nextPost?: Post
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Previous Post */}
      {previousPost ? (
        <Link
          href={previousPost.url}
          className="group flex flex-col p-4 rounded-base border-2 border-border bg-bg shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow"
        >
          <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <ChevronLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="font-heading group-hover:text-main transition-colors line-clamp-2">
            {previousPost.title}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {format(parseISO(previousPost.date), 'MMM d, yyyy')}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={nextPost.url}
          className="group flex flex-col items-end text-right p-4 rounded-base border-2 border-border bg-bg shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow"
        >
          <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            Next
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="font-heading group-hover:text-main transition-colors line-clamp-2">
            {nextPost.title}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {format(parseISO(nextPost.date), 'MMM d, yyyy')}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}
    </div>
  )
}
