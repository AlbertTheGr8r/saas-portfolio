import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { glob } from 'glob'
import { XMLParser } from 'fast-xml-parser'

describe('Build Output Tests', () => {
  describe('RSS Feeds', () => {
    it('should generate RSS 2.0 feed', () => {
      expect(existsSync('./public/feed.xml')).toBe(true)
      
      const feed = readFileSync('./public/feed.xml', 'utf-8')
      expect(feed).toContain('<?xml version="1.0"')
      expect(feed).toContain('<rss version="2.0"')
      expect(feed).toContain('<channel>')
      expect(feed).toContain('<title>')
    })

    it('should generate Atom feed', () => {
      expect(existsSync('./public/atom.xml')).toBe(true)
      
      const feed = readFileSync('./public/atom.xml', 'utf-8')
      expect(feed).toContain('<?xml version="1.0"')
      expect(feed).toContain('<feed')
      expect(feed).toContain('xmlns="http://www.w3.org/2005/Atom"')
    })

    it('should generate JSON feed', () => {
      expect(existsSync('./public/feed.json')).toBe(true)
      
      const feed = readFileSync('./public/feed.json', 'utf-8')
      const json = JSON.parse(feed)
      
      expect(json).toHaveProperty('version')
      expect(json).toHaveProperty('title')
      expect(json).toHaveProperty('items')
      expect(Array.isArray(json.items)).toBe(true)
    })

    it('should have consistent items across all feed formats', () => {
      const rssFeed = readFileSync('./public/feed.xml', 'utf-8')
      const atomFeed = readFileSync('./public/atom.xml', 'utf-8')
      const jsonFeed = JSON.parse(readFileSync('./public/feed.json', 'utf-8'))

      // Parse RSS
      const parser = new XMLParser()
      const rssObj = parser.parse(rssFeed)
      const rssItem = rssObj.rss?.channel?.item
      const rssItems = Array.isArray(rssItem) ? rssItem : rssItem ? [rssItem] : []

      // Parse Atom
      const atomObj = parser.parse(atomFeed)
      const atomEntry = atomObj.feed?.entry
      const atomItems = Array.isArray(atomEntry) ? atomEntry : atomEntry ? [atomEntry] : []

      // All feeds should have the same number of items
      expect(rssItems.length).toBe(atomItems.length)
      expect(rssItems.length).toBe(jsonFeed.items.length)

      // Each item should have required fields
      if (rssItems.length > 0) {
        const firstItem = rssItems[0]
        expect(firstItem).toHaveProperty('title')
        expect(firstItem).toHaveProperty('link')
        expect(firstItem).toHaveProperty('pubDate')
      }
    })
  })

  describe('Content Index', () => {
    it('should generate content index', () => {
      expect(existsSync('./public/content-index.json')).toBe(true)
    })

    it('should have valid content index structure', () => {
      const index = JSON.parse(readFileSync('./public/content-index.json', 'utf-8'))
      
      expect(index).toHaveProperty('posts')
      expect(index).toHaveProperty('tags')
      expect(index).toHaveProperty('techStacks')
      
      expect(Array.isArray(index.posts)).toBe(true)
      expect(Array.isArray(index.tags)).toBe(true)
      expect(Array.isArray(index.techStacks)).toBe(true)
    })

    it('should have sorted arrays', () => {
      const index = JSON.parse(readFileSync('./public/content-index.json', 'utf-8'))
      
      // Check tags are sorted
      const sortedTags = [...index.tags].sort()
      expect(index.tags).toEqual(sortedTags)
      
      // Check techStacks are sorted
      const sortedTech = [...index.techStacks].sort()
      expect(index.techStacks).toEqual(sortedTech)
    })

    it('should have valid post entries', () => {
      const index = JSON.parse(readFileSync('./public/content-index.json', 'utf-8'))
      
      if (index.posts.length > 0) {
        const firstPost = index.posts[0]
        
        expect(firstPost).toHaveProperty('slug')
        expect(firstPost).toHaveProperty('title')
        expect(firstPost).toHaveProperty('date')
        expect(firstPost).toHaveProperty('tags')
        expect(firstPost).toHaveProperty('type')
        expect(firstPost).toHaveProperty('url')
        
        expect(['blog', 'project']).toContain(firstPost.type)
        expect(Array.isArray(firstPost.tags)).toBe(true)
      }
    })
  })

  describe('Static Pages', () => {
    it('should have generated HTML files', () => {
      const htmlFiles = glob.sync('out/**/*.html')
      expect(htmlFiles.length).toBeGreaterThan(0)
    })

    it('should have blog pages', () => {
      const blogFiles = glob.sync('out/blog/**/*.html')
      expect(blogFiles.length).toBeGreaterThan(0)
    })

    it('should have project pages', () => {
      const projectFiles = glob.sync('out/projects/**/*.html')
      expect(projectFiles.length).toBeGreaterThan(0)
    })

    it('should have 404 page', () => {
      expect(existsSync('out/404.html')).toBe(true)
    })
  })

  describe('Content Consistency', () => {
    it('should have same number of posts in feeds and content index', () => {
      const rssFeed = readFileSync('./public/feed.xml', 'utf-8')
      const parser = new XMLParser()
      const rssObj = parser.parse(rssFeed)
      const rssItem = rssObj.rss?.channel?.item
      const rssItems = Array.isArray(rssItem) ? rssItem : rssItem ? [rssItem] : []

      const index = JSON.parse(readFileSync('./public/content-index.json', 'utf-8'))
      const blogPosts = index.posts.filter((p: { type: string }) => p.type === 'blog')

      expect(rssItems.length).toBe(blogPosts.length)
    })
  })
})
