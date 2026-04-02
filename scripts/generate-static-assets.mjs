// Script to generate RSS feed and content index after build
import { Feed } from 'feed'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const veliteDir = join(__dirname, '..', '.velite')

// Read velite data
const allPosts = JSON.parse(readFileSync(join(veliteDir, 'posts.json'), 'utf-8'))
const allProjects = JSON.parse(readFileSync(join(veliteDir, 'projects.json'), 'utf-8'))

const siteUrl = 'https://antiparity.net'
const date = new Date()

// Static pages to include in sitemap
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
]

function generateSitemap() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const projects = allProjects
    .filter((project) => !project.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const pages = staticPages.map(p => ({
    loc: `${siteUrl}${p.path}`,
    changefreq: p.changefreq,
    priority: p.priority,
    lastmod: date.toISOString().split('T')[0]
  }))

  const blogUrls = posts.map(post => ({
    loc: `${siteUrl}${post.url}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: post.date
  }))

  const projectUrls = projects.map(project => ({
    loc: `${siteUrl}${project.url}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: project.date
  }))

  const allUrls = [...pages, ...blogUrls, ...projectUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync('./public/sitemap.xml', sitemap)
  console.log('Sitemap generated!')
}

// Generate RSS Feed
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
    // Note: content not available in Velite without markdown processing
    author: [{ name: 'Albert' }],
    date: new Date(post.date),
  })
})

writeFileSync('./public/feed.xml', feed.rss2())
writeFileSync('./public/feed.json', feed.json1())
writeFileSync('./public/atom.xml', feed.atom1())
console.log('RSS feeds generated!')

// Generate Content Index
const indexPosts = allPosts
  .filter((post) => !post.draft)
  .map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    type: 'blog',
    url: post.url,
  }))

const indexProjects = allProjects
  .filter((project) => !project.draft)
  .map((project) => ({
    slug: project.slug,
    title: project.title,
    date: project.date,
    excerpt: project.excerpt,
    tags: [...project.tags, ...project.techStack],
    type: 'project',
    url: project.url,
  }))

const allItems = [...indexPosts, ...indexProjects]
const allTags = new Set()
allItems.forEach((item) => {
  item.tags.forEach((tag) => allTags.add(tag))
})

const allTechStacks = new Set()
allProjects.forEach((project) => {
  project.techStack.forEach((tech) => allTechStacks.add(tech))
})

const index = {
  posts: allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  tags: Array.from(allTags).sort(),
  techStacks: Array.from(allTechStacks).sort(),
}

writeFileSync('./public/content-index.json', JSON.stringify(index, null, 2))
console.log('Content index generated!')

// Generate Robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`
  writeFileSync('./public/robots.txt', robots)
  console.log('Robots.txt generated!')
}

generateSitemap()
generateRobots()
console.log('All static assets generated!')
