import { Feed } from 'feed'
import { allPosts } from 'contentlayer/generated'
import { writeFileSync } from 'fs'

export function generateRssFeed() {
  const siteUrl = 'https://antiparity.net'
  const date = new Date()

  const feed = new Feed({
    title: "Albert's Blog",
    description: 'Thoughts, learnings, and explorations in code.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
  })

  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}${post.url}`,
      link: `${siteUrl}${post.url}`,
      description: post.excerpt,
      content: post.body.raw,
      author: [
        {
          name: 'Albert',
        },
      ],
      date: new Date(post.date),
    })
  })

  writeFileSync('./public/feed.xml', feed.rss2())
  writeFileSync('./public/feed.json', feed.json1())
  writeFileSync('./public/atom.xml', feed.atom1())
}
