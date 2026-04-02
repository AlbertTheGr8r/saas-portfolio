import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto w-container max-w-full px-5 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-heading">Entry</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This is my space on the internet.
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-heading mb-4">Identity</h2>
            <p className="text-lg text-muted-foreground">
              I'm Albert Florin. Developer. Geodetic Engineer.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading mb-4">Function</h2>
            <p className="text-muted-foreground mb-4">
              I build things. Sometimes they're prose, sometimes they're technical 
              solutions. I still learning clean code, exploratory interfaces, and the 
              occasional deep-dive.
            </p>
            <p className="text-muted-foreground mb-4">
              This site is a collection of my projects and thoughts. It's intentionally 
              simple, just content. A return to what the web used to be: 
              a personal space on the internet.
            </p>
            <p className="text-muted-foreground">
              No tracking, no ads (yet). Working on that part. 
              Turns out servers do not run on goodwill. If it happens, 
              see <a href="/privacy" className="underline">privacy</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading mb-4">Contact</h2>
            <p className="text-muted-foreground mb-6">
              Want to say hi? Here's where you can reach me.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-base border-2 border-border bg-background p-6 shadow-shadow dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow">
                <h3 className="text-lg font-heading mb-2">Albert</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Personal projects, development work, and general inquiries.
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:albert@antiparity.net">
                    <Mail className="mr-2 h-5 w-5" />
                    albert@antiparity.net
                  </a>
                </Button>
              </div>

              <div className="rounded-base border-2 border-border bg-background p-6 shadow-shadow dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow">
                <h3 className="text-lg font-heading mb-2">AFFDC</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Engineering services, formal collaborations, and project engagements.
                </p>
                <Button size="lg" variant="neutral" asChild>
                  <a href="mailto:albert@affdc.net">
                    <Mail className="mr-2 h-5 w-5" />
                    albert@affdc.net
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading mb-4">System</h2>
            <p className="text-muted-foreground">
              This is a static site built with Next.js. No database, no tracking, 
              no complex frameworks. Just content delivered as HTML. If you're curious 
              about the tech stack or want to see the code, it's all available on GitHub.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}