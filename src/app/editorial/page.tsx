import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How AntiParity is researched, written, edited, corrected, and funded.',
  alternates: { canonical: '/editorial' },
}

export default function EditorialPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="mt-8 mb-8 font-heading text-4xl font-bold">Editorial Policy</h1>

      <div className="space-y-6 text-lg">
        <p>
          AntiParity is written by Albert Florin, a geodetic engineer and
          developer based in Metro Manila. Every article is authored, edited,
          and approved by him.
        </p>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">How an article is made</h2>
          <ol className="ml-6 list-decimal space-y-2">
            <li>A question, field observation, or argument.</li>
            <li>Research: primary sources, standards, papers, datasets, and field notes.</li>
            <li>Synthesis: the thesis and the argument are decided by the author.</li>
            <li>Draft: the prose is written by the author.</li>
            <li>Second pass: AI is used to challenge structure, find gaps, and edit. AI does not write the final article.</li>
            <li>Verification: claims are checked against sources; citations, numbers, and names are checked.</li>
            <li>Publication: the piece is dated, linked, and published.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">How AI is used</h2>
          <p>
            AI is a research and editing tool, not the author. It is used to
            brainstorm, find and summarize sources, cross-reference claims, and
            do a second-pass edit. Published prose is not generated wholesale by
            AI. The degree of assistance varies: some essays are written with
            minimal AI involvement; others use it more heavily for research
            discovery and editing. The thesis, argument, and final wording are
            the author&apos;s. The author is responsible for every published
            claim.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Research and sources</h2>
          <p>
            Technical pieces keep a research trail: primary literature, official
            data, standards, field notes, a bibliography, and citation or claim
            checks. Where a claim is the author&apos;s own analysis, it is
            labeled as such. Where a source is used, it is linked. Observation
            and inference are kept distinct.
          </p>
          <p className="mt-4">
            The full research trail is private and available on request. PDFs
            are not hosted unless they are open access or redistribution is
            permitted; links point to the publisher, DOI, or open-access
            version.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Corrections</h2>
          <p>
            If something is wrong, email{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>
            . Corrections are published with an updated date and a note. Pieces
            are not silently rewritten.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Images</h2>
          <p>
            Images are the author&apos;s own or are used with permission or
            under a license. Third-party images are credited. If an image is
            miscredited, contact the address above and it will be fixed or
            removed.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Advertising</h2>
          <p>
            Ads are served by Google AdSense when enabled. Advertisers do not
            influence editorial content. Sponsored content, if it ever appears,
            will be clearly labeled. Pieces are not written to attract a
            specific advertiser.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Comments</h2>
          <p>
            Comments are not enabled. If they are enabled, they will be
            moderated; spam, abuse, and doxxing will be removed.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Ownership and reuse</h2>
          <p>
            Prose and images are © Albert Florin, all rights reserved, unless
            otherwise credited. Short quotation under 90 words with credit and
            link is welcome. For republication, translation, or commercial use,
            ask first. Site code is MIT.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Scope</h2>
          <p>
            Engineering and geospatial pieces are educational. They are not
            professional survey, legal, or safety advice. Verify methods,
            coordinates, and standards before using them in live work.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Contact</h2>
          <p>
            Corrections, permissions, and research requests:{' '}
            <a href="mailto:albertflorin93@gmail.com" className="underline">
              albertflorin93@gmail.com
            </a>{' '}
            or the <Link href="/contact" className="underline">contact page</Link>.
            See also the <Link href="/privacy" className="underline">privacy policy</Link>{' '}
            and <Link href="/terms" className="underline">terms</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
