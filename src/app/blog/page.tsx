import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { posts } from '.velite'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

function PostCard({ post }: { post: typeof posts[0] }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-base border-2 border-border bg-background shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'MMM d, yyyy')}
          </time>
        </div>
        
        <h2 className="mt-3 text-xl font-heading">
          <Link href={post.url}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>
        
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-muted-foreground text-sm">
            {post.excerpt}
          </p>
        )}
        
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 relative z-10">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function BlogPage() {
  const allPosts = posts
    .filter((post) => !post.draft && !post.archived)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const featuredPosts = allPosts.filter((post) => post.featured)
  const regularPosts = allPosts.filter((post) => !post.featured)

  // Ensure exactly 2 featured posts
  const displayFeatured = featuredPosts.slice(0, 2)
  const remainingSlots = 2 - displayFeatured.length
  const fillerPosts = regularPosts.slice(0, remainingSlots)
  const allFeatured = [...displayFeatured, ...fillerPosts]
  const remainingPosts = regularPosts.slice(remainingSlots)

  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto w-container max-w-6xl px-5 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Thoughts, learnings, and explorations in code.
          </p>
        </header>

        {allFeatured.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-xl font-heading flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-main rounded-full"></span>
              Featured
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {allFeatured.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {remainingPosts.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-heading">All Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {allPosts.length === 0 && (
          <div className="rounded-base border-2 border-border bg-secondary-background p-12 text-center dark:border-darkBorder">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
