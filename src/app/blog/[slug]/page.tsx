import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts } from '.velite'
import { EditorialLayout } from '@/components/layouts/editorial-layout'
import { StructuredEditorialLayout } from '@/components/layouts/structured-editorial-layout'
import { PostNavigation } from '@/components/post-navigation'
import { MDXContent } from '@/components/mdx-content'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return posts
    .filter((post) => !post.draft && new Date(post.date) <= new Date())
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://antiparity.net${post.url}` },
  }
}

// Extract H2 headings from markdown content
function extractH2Headings(content: string): { id: string; text: string }[] {
  const h2Regex = /^## (.+)$/gm
  const headings: { id: string; text: string }[] = []

  const matches = content.matchAll(h2Regex)
  for (const match of matches) {
    const text = match[1].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    headings.push({ id, text })
  }

  return headings
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Look up the requested post among all published posts
  const post = posts.find(
    (p) => p.slug === slug && !p.draft && new Date(p.date) <= new Date()
  )

  if (!post) {
    notFound()
  }

  const sortedPosts = [...posts]
    .filter((p) => !p.draft && new Date(p.date) <= new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)

  // Get previous and next posts
  const previousPost = postIndex >= 0 && postIndex < sortedPosts.length - 1 ? sortedPosts[postIndex + 1] : undefined
  const nextPost = postIndex > 0 ? sortedPosts[postIndex - 1] : undefined

  // Extract H2 headings for TOC
  const h2Headings = extractH2Headings(post.content)
  const h2Count = h2Headings.length

  // Decide layout based on H2 count (threshold: 3)
  const useStructuredLayout = h2Count >= 3

  const postNavigation = (
    <PostNavigation
      previousPost={previousPost}
      nextPost={nextPost}
    />
  )

  const blogPostLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage
      ? `https://antiparity.net${post.coverImage}`
      : undefined,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      '@type': 'Person',
      name: 'Albert Francis P. Florin',
      url: 'https://antiparity.net',
    },
    publisher: {
      '@type': 'Person',
      name: 'Albert Francis P. Florin',
      url: 'https://antiparity.net',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://antiparity.net${post.url}`,
    },
  }

if (useStructuredLayout) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostLd) }}
        />
        <StructuredEditorialLayout
          title={post.title}
          date={post.date}
          updated={post.updated}
          excerpt={post.excerpt}
          coverImage={post.coverImage}
          coverImageAlt={post.coverImageAlt}
          coverImageCredit={post.coverImageCredit}
          tags={post.tags}
          url={post.url}
          tocItems={h2Headings}
          footer={postNavigation}
        >
          <MDXContent source={post.content} />
        </StructuredEditorialLayout>
      </>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostLd) }}
      />
      <EditorialLayout
        title={post.title}
        date={post.date}
        updated={post.updated}
        excerpt={post.excerpt}
        coverImage={post.coverImage}
        coverImageAlt={post.coverImageAlt}
        coverImageCredit={post.coverImageCredit}
        tags={post.tags}
        url={post.url}
        footer={postNavigation}
      >
        <MDXContent source={post.content} />
      </EditorialLayout>
    </>
  )
}
