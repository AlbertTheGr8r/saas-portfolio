import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for reading, quoting, and reusing content from antiparity.net.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="mt-8 mb-8 font-heading text-4xl font-bold">Terms of Use</h1>

      <div className="space-y-6 text-lg">
        <p>Last updated: October 31, 2026</p>
        <p>
          Operator: Albert Francis P. Florin, Philippines.{' '}
          <a href="mailto:albertflorin93@gmail.com" className="underline">
            albertflorin93@gmail.com
          </a>
          . Governing law: Philippines.
        </p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Content ownership</h2>
          <p>
            All prose, essays, images, and figures on this site are © Albert
            Francis P. Florin, Philippines, all rights reserved, unless a caption
            or post metadata credits another source. Third-party images remain
            the property of their credited creators and are used only with
            permission or under an applicable license. Publication on GitHub
            grants visibility for reading and review. It grants no reuse license
            for prose or images.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">What you may do</h2>
          <p>
            Short quotation under 90 words with credit and link is welcome.
            Link freely. For anything beyond that — republication, translation,
            dataset use, commercial use — write first for written permission.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Code</h2>
          <p>
            Site structure and code samples are MIT as noted in LICENSE and the
            repository, unless a file states otherwise. Third-party stack
            (Next.js, Velite, Tailwind, Radix) remains under its respective
            license with attribution.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Paid products</h2>
          <p>
            If paid deep dives or other digital products are offered, the terms
            presented at checkout apply to that purchase, including delivery,
            refunds, and the personal-use license. Free articles remain complete
            and are not teasers for a paid product.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">No warranties</h2>
          <p>
            Essays document work in progress and field experience. Methods,
            coordinates, and examples require professional judgment before reuse
            in live surveys. Verify against primary sources and standards.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Contact</h2>
          <p>
            Permission requests and corrections:{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>{' '}
            or the <Link href="/contact" className="underline">contact page</Link>.
            See also the <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
