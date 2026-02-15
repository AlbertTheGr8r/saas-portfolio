import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { MDXContent } from './mdx-content'
import { ShareButtons } from '@/components/share-buttons'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.replace('blog/', ''),
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = allPosts.find(
    (post) => post._raw.flattenedPath.replace('blog/', '') === slug
  )

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
            <div className="prose prose-lg max-w-none">
              <MDXContent code={post.body.code} />
            </div>
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
