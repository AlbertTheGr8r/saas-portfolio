import type { Metadata } from 'next'
import { Mail, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Albert Florin for inquiries, corrections, and resume requests.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto w-container max-w-full px-5 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-heading">Contact</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            One inbox for everything. General inquiries, resume requests,
            field notes, corrections. I reply within a week.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl">
          <section>
            <h2 className="mb-6 text-2xl font-heading">Email</h2>
            <Button size="lg" asChild>
              <a href="mailto:albertflorin93@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                albertflorin93@gmail.com
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Include context, links, and what you need. Short sparks welcome.
              Longer questions welcome when they have shape.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-heading">Code</h2>
            <div className="flex gap-4">
              <Button variant="neutral" size="lg" asChild>
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
            <p className="mt-4 text-sm text-muted-foreground">
              Site code is MIT. Prose and images © Albert Florin,
              Philippines, all rights reserved, unless otherwise credited.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
