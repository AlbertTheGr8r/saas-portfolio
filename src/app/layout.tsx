import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://antiparity.net'),
  title: {
    default: 'AntiParity — Albert Florin',
    template: '%s | AntiParity',
  },
  description: 'AntiParity is the personal publication of Albert Florin — geodetic engineer and developer in Metro Manila. Essays, field notes, and case studies on geospatial systems, infrastructure, and the tools we use to think.',
  keywords: ['antiparity', 'geospatial', 'geodetic engineering', 'infrastructure', 'systems', 'essays', 'field notes'],
  authors: [{ name: 'Albert Florin' }],
  creator: 'Albert Florin',
  publisher: 'Albert Florin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://antiparity.net',
    siteName: 'AntiParity',
    title: 'AntiParity — Albert Florin',
    description: 'Essays, field notes, and case studies on geospatial systems, infrastructure, and the tools we use to think.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AntiParity — Albert Florin, geospatial engineering and systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AntiParity — Albert Florin',
    description: 'Essays, field notes, and case studies on geospatial systems, infrastructure, and the tools we use to think.',
    images: ['/og-default.png'],
    creator: '@AlbertTheGr8r',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://antiparity.net/feed.xml',
      'application/atom+xml': 'https://antiparity.net/atom.xml',
      'application/feed+json': 'https://antiparity.net/feed.json',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Albert Florin',
    alternateName: 'Albert Francis P. Florin',
    url: 'https://antiparity.net',
    jobTitle: ['Developer', 'Geodetic Engineer'],
    description: 'Geodetic engineer and developer in Metro Manila. Writes about geospatial systems, infrastructure, and the tools we use to think.',
    sameAs: [
      'https://github.com/AlbertTheGr8r',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">
          <Navbar />
          <main className="pt-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
