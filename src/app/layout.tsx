import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Albert Florin',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navbar />
          <main className="pt-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
