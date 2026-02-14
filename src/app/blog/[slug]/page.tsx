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
    <article className="min-h-screen bg-bg dark:bg-darkBg">
      <div className="mx-auto w-container max-w-full px-5 py-20">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
            {post.updated && (
              <>
                <span>·</span>
                <span>
                  Updated {format(parseISO(post.updated), 'MMMM d, yyyy')}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-heading md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6">
            <ShareButtons url={post.url} title={post.title} />
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXContent code={post.body.code} />
        </div>
      </div>
    </article>
  )
}
