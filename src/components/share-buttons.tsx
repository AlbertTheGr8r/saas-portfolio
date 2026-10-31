'use client'

import { SiX } from '@icons-pack/react-simple-icons'
import { Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://antiparity.net${url}`

  const shareOnX = () => {
    const text = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(fullUrl)
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareOnLinkedIn = () => {
    const shareUrl = encodeURIComponent(fullUrl)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="noShadow"
        size="icon"
        className="h-8 w-8"
        onClick={shareOnX}
        title="Share on X"
      >
        <SiX size={16} />
      </Button>
      <Button
        variant="noShadow"
        size="icon"
        className="h-8 w-8"
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
      >
        <LinkedInIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="noShadow"
        size="icon"
        className="h-8 w-8"
        onClick={copyLink}
        title="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
