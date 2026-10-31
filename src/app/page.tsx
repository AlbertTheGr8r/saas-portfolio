import type { Metadata } from 'next'
import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { posts, projects } from '.velite'
import { ArticleCard } from '@/components/article-card'
import { getReadingTime } from '@/lib/reading-time'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

function postCardProps(post: (typeof posts)[0]) {
  return {
    title: post.title,
    excerpt: post.excerpt,
    url: post.url,
    date: post.date,
    tags: post.tags,
    readingTime: getReadingTime(post.content),
  }
}

export default function Home() {
  const published = posts
    .filter(
      (post) =>
        !post.draft &&
        !post.archived &&
        new Date(post.date) <= new Date()
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const startHere = published.filter((post) => post.featured).slice(0, 2)
  const startHereSlugs = new Set(startHere.map((post) => post.slug))
  const latest = published
    .filter((post) => !startHereSlugs.has(post.slug))
    .slice(0, 4)

  const selectedProjects = projects
    .filter((project) => !project.draft && !project.archived)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)

  return (
    <>
      <section className="border-b-2 border-border bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="mx-auto flex min-h-[100dvh] w-container max-w-full flex-col items-center justify-center px-5 py-[110px] text-center lg:py-[150px]">
          <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
            Albert Florin
          </h1>
          <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
            Geospatial engineering and system design.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-base text-muted-foreground md:text-lg">
            Essays, field notes, and case studies on geospatial systems,
            infrastructure, and the tools we use to think.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/blog">Read the writing</Link>
            </Button>
            <Button variant="neutral" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="neutral" asChild>
              <a href="/feed.xml">RSS</a>
            </Button>
            <Button variant="neutral" asChild>
              <a
                href="https://github.com/AlbertTheGr8r"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button variant="neutral" asChild>
              <a href="mailto:albertflorin93@gmail.com">Email</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-border bg-background py-16 md:py-20">
        <div className="mx-auto w-container max-w-full px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-heading md:text-4xl">Latest writing</h2>
            </div>
            <Link href="/blog" className="font-heading underline underline-offset-4">
              More →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {latest.map((post) => (
              <ArticleCard key={post.slug} {...postCardProps(post)} />
            ))}
          </div>
        </div>
      </section>

      {startHere.length > 0 && (
        <section className="border-b-2 border-border bg-secondary-background py-16 md:py-20">
          <div className="mx-auto w-container max-w-full px-5">
            <h2 className="text-3xl font-heading md:text-4xl">Start here</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The pieces that best explain what this site is about.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {startHere.map((post) => (
                <ArticleCard key={post.slug} {...postCardProps(post)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b-2 border-border bg-background py-16 md:py-20">
        <div className="mx-auto w-container max-w-full px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-heading md:text-4xl">Studies</h2>
              <p className="mt-2 text-muted-foreground">
                Case studies on things built and shipped.
              </p>
            </div>
            <Link href="/projects" className="font-heading underline underline-offset-4">
              More →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {selectedProjects.map((project) => (
              <Link
                key={project.slug}
                href={project.url}
                className="group flex h-full flex-col rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:shadow-darkShadow"
              >
                <Badge
                  variant={project.status === 'completed' ? 'default' : 'neutral'}
                  className="w-fit"
                >
                  {project.status}
                </Badge>
                <h3 className="mt-4 text-xl font-heading leading-snug">
                  {project.title}
                </h3>
                {project.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {project.excerpt}
                  </p>
                )}
                <span className="mt-auto pt-6 font-heading text-sm underline underline-offset-4">
                  View study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary-background py-16 md:py-20">
        <div className="mx-auto w-container max-w-full px-5">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-heading md:text-4xl">About</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Albert Florin is a geodetic engineer and developer based in Metro
              Manila. He writes about geospatial systems, infrastructure, and
              the tools we use to think. The site is a working space: pieces
              are published while they are still being figured out.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block font-heading underline underline-offset-4"
            >
              More about Albert →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
