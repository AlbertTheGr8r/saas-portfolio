import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookies and local storage used by antiparity.net, including advertising and consent.',
  alternates: { canonical: '/cookies' },
}

export default function CookiePolicy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="mt-8 mb-8 font-heading text-4xl font-bold">Cookie Policy</h1>

      <div className="space-y-6 text-lg">
        <p>Last updated: October 31, 2026</p>
        <p>
          This page explains the cookies and local storage used by
          antiparity.net. For how data is handled generally, see the{' '}
          <Link href="/privacy" className="underline">privacy policy</Link>.
        </p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Essential storage</h2>
          <p>
            The site stores your theme preference in browser local storage. This
            is not a cookie and is not sent to the server. Cloudflare may set
            security cookies, such as <code>__cf_bm</code>, to distinguish
            humans from bots and keep the site available.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Analytics</h2>
          <p>
            No analytics scripts are currently loaded. If analytics are added,
            this page and the privacy policy will be updated before they are
            enabled.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Advertising</h2>
          <p>
            Advertising is not currently enabled. If Google AdSense is enabled,
            Google and its partners may set advertising cookies after consent is
            obtained where required. These cookies can be used to serve ads based
            on prior visits to this site and other sites.
          </p>
          <p className="mt-4">
            Examples of Google advertising cookies include <code>IDE</code>,{' '}
            <code>test_cookie</code>, <code>__gads</code>, and <code>__gpi</code>.
            Cookie names can change; the authoritative descriptions are in
            Google&apos;s own policies.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. For
            personalized advertising, use the{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google Ad Settings
            </a>{' '}
            page or the{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              About Ads
            </a>{' '}
            page. When a consent message is active, a &ldquo;Manage consent&rdquo;
            link in the footer reopens it.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Third-party policies</h2>
          <p>
            Google&apos;s advertising and privacy policies apply to Google-served
            ads. Cloudflare&apos;s and GitHub&apos;s policies apply to hosting,
            security, and delivery. See the{' '}
            <Link href="/privacy" className="underline">privacy policy</Link> for
            links and contact details.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Contact</h2>
          <p>
            Questions:{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>{' '}
            or the <Link href="/contact" className="underline">contact page</Link>.
            See also the <Link href="/editorial" className="underline">editorial policy</Link>{' '}
            and <Link href="/terms" className="underline">terms</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
