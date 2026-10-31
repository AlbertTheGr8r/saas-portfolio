import type { Metadata } from 'next'
import { Mail, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description: 'Albert Francis P. Florin is a geodetic engineer and developer in Metro Manila. He writes about geospatial systems, infrastructure, and the tools we use to think.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto w-container max-w-full px-5 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-heading">Hi.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This is a working space. A place to think in public.
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-3xl">
          <p className="text-lg text-muted-foreground mb-4">
            The blog gathers thoughts while they are still forming. Projects gather
            work once it has shape. Notes stay here. Built pieces live there.
            The split stays on purpose. Creative writing belongs with projects
            when it becomes a constructed piece. Fragments, observations, and
            field notes belong in the blog.
          </p>
          <p className="text-muted-foreground mb-4">
            I write for myself first. When a piece survives contact with another
            reader, that is a bonus. I come from geodetic engineering and
            development work, based in Metro Manila. UP trained me to sequence
            thoughts by hand before I ever typed a prompt. Field work taught me
            to defend a measurement. Both feed this site.
          </p>
          <p className="text-muted-foreground mb-4">
            Process here is simple. Paper for ground-truthing. A vault for storage
            and linking. Conversation for momentum when an idea needs exploring.
            One listens, one stores, one talks back. Small sparks stay raw and
            sharp. Larger questions get hours of back-and-forth until the gap
            between what I meant and what landed becomes visible. That gap is
            where clarity lives.
          </p>
          <p className="text-muted-foreground mb-4">
            If you want credentials, ask for my resume at{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>
            . If you want skill level, read how I write. Start with continuity
            in sidewalks, defensibility in surveys, and translation between
            government systems and lived experience. Get to know me through
            the backlog.
          </p>
          <p className="text-muted-foreground mb-8">
            This is a static site built with Next.js. Content ships as HTML.
            No database, no accounts. Code is MIT on{' '}
            <a
              href="https://github.com/AlbertTheGr8r/saas-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            . Prose and images © Albert Francis P. Florin, Philippines,
            all rights reserved, unless otherwise credited. See{' '}
            <a href="/privacy" className="underline">
              privacy
            </a>{' '}
            and{' '}
            <a href="/terms" className="underline">
              terms
            </a>
            .
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="mailto:albertflorin93@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                albertflorin93@gmail.com
              </a>
            </Button>
            <Button size="lg" variant="neutral" asChild>
              <a
                href="https://github.com/AlbertTheGr8r"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
