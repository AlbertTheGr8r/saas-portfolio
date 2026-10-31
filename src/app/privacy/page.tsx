import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How antiparity.net handles data, cookies, hosting, and advertising.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="mt-8 mb-8 font-heading text-4xl font-bold">Privacy Policy</h1>

      <div className="space-y-6 text-lg">
        <p>Last updated: October 31, 2026</p>
        <p>
          Operator: Albert Francis P. Florin, Philippines.{' '}
          <a href="mailto:albertflorin93@gmail.com" className="underline">
            albertflorin93@gmail.com
          </a>
          .
        </p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Information We Collect</h2>
          <p>
            This is a static site. There are no accounts and no forms that store
            personal information. The operator does not run analytics or tracking
            scripts. Pages ship as static HTML.
          </p>
          <p className="mt-4">
            The site is delivered through Cloudflare and GitHub Pages. Those
            providers process request data such as IP address, user agent, and
            timestamps to deliver the site, prevent abuse, and keep it available.
            Their own privacy policies apply to that processing.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Cookies and Advertising</h2>
          <p>
            Advertising is not currently enabled. If Google AdSense is enabled,
            Google as a third-party vendor will use cookies to serve ads based on
            prior visits to this site and other sites. This page will be updated
            before ads are enabled.
          </p>
          <p className="mt-4">
            You may opt out of personalized advertising by visiting the{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Google Ad Settings
            </a>{' '}
            page or the{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              About Ads
            </a>{' '}
            page, and review the{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Google Advertising Policies
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Third-Party Links</h2>
          <p>
            Linked projects, papers, and maps follow their own policies.
            Consult the respective pages for details.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Changes to This Policy</h2>
          <p>
            Updates ship by posting a new version on this page with a new date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Contact</h2>
          <p>
            Questions about this policy:{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>{' '}
            or the <Link href="/contact" className="underline">contact page</Link>.
            See also the <Link href="/terms" className="underline">terms</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
