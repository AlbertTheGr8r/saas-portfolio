import type { posts } from '.velite'

const VERSION_REGEX = /\.v\d+$/

export interface VersionInfo {
  slug: string
  url: string
  date: string
  isCurrent: boolean
  versionLabel: string
}

export function getBaseSlug(slug: string): string {
  return slug.replace(VERSION_REGEX, '')
}

export function isVersioned(slug: string): boolean {
  return VERSION_REGEX.test(slug)
}

export function getVersionLabel(slug: string, isCurrent: boolean): string {
  if (isCurrent) return 'Current'
  const match = slug.match(/\.v(\d+)$/)
  return match ? `v${match[1]}` : ''
}

export function extractVersionInfo(posts: posts[], slug: string): VersionInfo[] {
  const baseSlug = getBaseSlug(slug)

  const relatedPosts = posts
    .filter((p) => !p.draft && new Date(p.date) <= new Date())
    .filter((p) => getBaseSlug(p.slug) === baseSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (relatedPosts.length <= 1) return []

  return relatedPosts.map((p) => ({
    slug: p.slug,
    url: p.url,
    date: p.date,
    isCurrent: p.slug === slug,
    versionLabel: !isVersioned(p.slug) ? 'Current' : `v${p.slug.match(/\.v(\d+)$/)?.[1]}`,
  }))
}

export function filterNonVersionedPosts(posts: posts[]): posts[] {
  return posts.filter((p) => !isVersioned(p.slug))
}