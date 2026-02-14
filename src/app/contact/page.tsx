import { Mail, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Links from '@/components/links'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg">
      <div className="mx-auto w-container max-w-full px-5 py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-heading">Contact</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get in touch. I&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-6 text-2xl font-heading">Email</h2>
            <Button size="lg" asChild>
              <a href="mailto:albert@antiparity.net">
                <Mail className="mr-2 h-5 w-5" />
                albert@antiparity.net
              </a>
            </Button>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-heading">Social</h2>
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
              <Button variant="neutral" size="lg" asChild>
                <a
                  href="https://linkedin.com/in/albertflorin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-heading">Other Links</h2>
          <Links />
        </section>
      </div>
    </div>
  )
}
