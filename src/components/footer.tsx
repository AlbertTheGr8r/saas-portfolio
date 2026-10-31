import Link from "next/link"

export default function Footer() {
  return (
    <footer className="m500:text-sm bg-secondary-background z-30 px-5 py-5 text-center font-base">
      © 2026 Albert Francis P. Florin. All rights reserved.{' '}
      <Link href="/about" className="font-heading underline">
        About
      </Link>
      {' · '}
      <Link href="/contact" className="font-heading underline">
        Contact
      </Link>
      {' · '}
      <Link href="/privacy" className="font-heading underline">
        Privacy
      </Link>
      {' · '}
      <Link href="/terms" className="font-heading underline">
        Terms
      </Link>
      {' · '}
      <a
        target="_blank"
        href="https://github.com/AlbertTheGr8r/saas-portfolio"
        className="font-heading underline"
      >
        Code (MIT)
      </a>
      .
    </footer>
  )
}
