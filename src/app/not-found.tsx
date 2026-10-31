import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Not Found',
}

export default function NotFound() {
  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-bg px-5 dark:bg-darkBg">
      <div className="text-center">
        <p className="font-heading text-8xl leading-none md:text-9xl">404</p>
        <h1 className="mt-6 text-2xl font-heading">Not Found.</h1>
        <Link
          href="/"
          className="mt-10 inline-block border-2 border-border bg-main px-8 py-3 font-heading text-main-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder"
        >
          Home
        </Link>
      </div>
    </main>
  )
}
