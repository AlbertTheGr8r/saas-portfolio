'use client'

import { Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://antiparity.net${url}`

  const shareOnTwitter = () => {
    const text = encodeURIComponent(title)
    const shareUrl = encodeURIComponent(fullUrl)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
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
        onClick={shareOnTwitter}
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="noShadow"
        size="icon"
        className="h-8 w-8"
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
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
