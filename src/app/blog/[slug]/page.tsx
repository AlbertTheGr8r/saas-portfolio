import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { posts } from '.velite'
import { Badge } from '@/components/ui/badge'
import { ShareButtons } from '@/components/share-buttons'
import { MDXContent } from '@/components/mdx-content'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = posts.find((post) => post.slug === slug)

  if (!post || post.draft) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">

        {/* HERO */}
        <header className="mx-auto max-w-3xl text-center mb-16">
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
            {post.updated && (
              <span> · Updated {format(parseISO(post.updated), 'MMMM d, yyyy')}</span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-heading md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">
            <MDXContent source={post.content} />
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {post.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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
              <ShareButtons url={post.url} title={post.title} />
            </div>

          </aside>
        </div>
      </div>
    </article>
  )
}
