import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://antiparity.net'),
  title: {
    default: 'Albert Florin',
    template: '%s | Albert Florin',
  },
  description: 'Developer, Geodetic Engineer. A personal space on the internet showcasing projects and thoughts.',
  keywords: ['developer', 'geodetic engineer', 'portfolio', 'blog', 'projects'],
  authors: [{ name: 'Albert Francis P. Florin' }],
  creator: 'Albert Florin',
  publisher: 'Albert Florin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://antiparity.net',
    siteName: 'Albert Florin',
    title: 'Albert Florin',
    description: 'Developer, Geodetic Engineer. A personal space on the internet.',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Albert Florin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albert Florin',
    description: 'Developer, Geodetic Engineer. A personal space on the internet.',
    images: ['/preview.png'],
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
    name: 'Albert Francis P. Florin',
    url: 'https://antiparity.net',
    jobTitle: ['Developer', 'Geodetic Engineer'],
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
        </ThemeProvider>
      </body>
    </html>
  )
}
