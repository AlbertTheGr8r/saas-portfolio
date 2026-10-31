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
          Operator: Albert Florin, Philippines.{' '}
          <a href="mailto:albertflorin93@gmail.com" className="underline">
            albertflorin93@gmail.com
          </a>
          .
        </p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Scope and applicable law</h2>
          <p>
            AntiParity is operated from the Philippines. Personal data is handled
            with the Philippine Data Privacy Act of 2012 (RA 10173) in mind. For
            visitors in the EEA or UK, GDPR and UK GDPR protections apply. For
            visitors in California, CCPA/CPRA protections apply. Where local law
            gives additional rights, those rights apply.
          </p>
          <p className="mt-4">We do not sell personal information.</p>
        </section>

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
          <h2 className="mb-4 font-heading text-2xl font-semibold">How we use data</h2>
          <p>
            Request data is used to deliver the site, prevent abuse, and keep it
            available. Consent choices are used to remember your preferences.
            When advertising is enabled, ad-related data is used to serve and
            measure ads. Legal bases are consent for non-essential cookies and
            advertising, legitimate interests for security and delivery, and
            legal obligation where applicable.
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
            . See the{' '}
            <Link href="/cookies" className="underline">cookie policy</Link> for
            the cookies used on this site, and Google&apos;s{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              partner sites page
            </a>{' '}
            for how Google uses information from sites that use its services.
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
          <h2 className="mb-4 font-heading text-2xl font-semibold">Retention</h2>
          <p>
            Cloudflare and GitHub Pages retain request logs under their own
            policies. Consent choices stay in your browser until you clear them.
            Google retains ad-related data under its policies. Email
            correspondence is kept only as long as needed to respond or to
            maintain a record of a correction.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access,
            correct, delete, or object to the processing of your personal data,
            to request portability, or to withdraw consent. To make a request,
            email{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>
            . You may also complain to the Philippine National Privacy
            Commission or your local data protection authority.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Children</h2>
          <p>
            This site is not directed at children under 13, and personal
            information is not knowingly collected from them.
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
            See also the <Link href="/terms" className="underline">terms</Link>,{' '}
            <Link href="/cookies" className="underline">cookie policy</Link>, and{' '}
            <Link href="/editorial" className="underline">editorial policy</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
