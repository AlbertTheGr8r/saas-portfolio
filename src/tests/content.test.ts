import { describe, it, expect } from 'vitest'
import { glob } from 'glob'
import matter from 'gray-matter'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { PostSchema, ProjectSchema } from './schemas'

describe('Content Integrity Tests', () => {
  describe('Blog Posts', () => {
    const blogFiles = glob.sync('content/blog/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })

    it('should have at least one blog post', () => {
      expect(blogFiles.length).toBeGreaterThan(0)
    })

    blogFiles.forEach((file) => {
      describe(`File: ${file}`, () => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)

        it('should have valid frontmatter', () => {
          expect(() => {
            PostSchema.parse(parsed.data)
          }).not.toThrow()
        })

        it('should have a title', () => {
          expect(parsed.data.title).toBeDefined()
          expect(parsed.data.title.length).toBeGreaterThan(0)
        })

        it('should have a valid date', () => {
          expect(parsed.data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        })

        it('should have content', () => {
          expect(parsed.content.trim().length).toBeGreaterThan(0)
        })

        it('should have unique slug or filename-based slug', () => {
          // Slug is either explicit or derived from filename
          const slug = parsed.data.slug || file.split('/').pop()?.replace('.md', '')
          expect(slug).toBeDefined()
          expect(slug?.length).toBeGreaterThan(0)
        })

        if (parsed.data.updated) {
          it('should have valid updated date', () => {
            expect(parsed.data.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
          })
        }

        if (parsed.data.coverImage) {
          it('should have existing cover image', () => {
            const imagePath = join(dirname(file), parsed.data.coverImage)
            expect(existsSync(imagePath)).toBe(true)
          })
        }

        if (parsed.data.tags && parsed.data.tags.length > 0) {
          it('should have valid tags', () => {
            expect(Array.isArray(parsed.data.tags)).toBe(true)
            parsed.data.tags.forEach((tag: string) => {
              expect(typeof tag).toBe('string')
              expect(tag.length).toBeGreaterThan(0)
            })
          })
        }
      })
    })

    it('should have unique slugs across all posts', () => {
      const slugs = blogFiles.map((file) => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)
        return parsed.data.slug || file.split('/').pop()?.replace('.md', '')
      })
      
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })
  })

  describe('Projects', () => {
    const projectFiles = glob.sync('content/projects/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })

    it('should have at least one project', () => {
      expect(projectFiles.length).toBeGreaterThan(0)
    })

    projectFiles.forEach((file) => {
      describe(`File: ${file}`, () => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)

        it('should have valid frontmatter', () => {
          expect(() => {
            ProjectSchema.parse(parsed.data)
          }).not.toThrow()
        })

        it('should have a title', () => {
          expect(parsed.data.title).toBeDefined()
          expect(parsed.data.title.length).toBeGreaterThan(0)
        })

        it('should have a valid date', () => {
          expect(parsed.data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        })

        it('should have content', () => {
          expect(parsed.content.trim().length).toBeGreaterThan(0)
        })

        it('should have tech stack defined', () => {
          expect(parsed.data.techStack).toBeDefined()
          expect(Array.isArray(parsed.data.techStack)).toBe(true)
        })

        it('should have valid status', () => {
          expect(['completed', 'in-progress', 'archived']).toContain(parsed.data.status || 'completed')
        })

        if (parsed.data.demoUrl) {
          it('should have valid demo URL', () => {
            expect(parsed.data.demoUrl).toMatch(/^https?:\/\/.+/)
          })
        }

        if (parsed.data.repoUrl) {
          it('should have valid repo URL', () => {
            expect(parsed.data.repoUrl).toMatch(/^https?:\/\/.+/)
          })
        }

        if (parsed.data.coverImage) {
          it('should have existing cover image', () => {
            const imagePath = join(dirname(file), parsed.data.coverImage)
            expect(existsSync(imagePath)).toBe(true)
          })
        }
      })
    })

    it('should have unique slugs across all projects', () => {
      const slugs = projectFiles.map((file) => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)
        return parsed.data.slug || file.split('/').pop()?.replace('.md', '')
      })
      
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })
  })

  describe('Content Rules', () => {
    it('should not have duplicate titles between posts and projects', () => {
      const blogFiles = glob.sync('content/blog/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })
      const projectFiles = glob.sync('content/projects/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })
      
      const blogTitles = blogFiles.map((file) => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)
        return parsed.data.title
      })
      
      const projectTitles = projectFiles.map((file) => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)
        return parsed.data.title
      })
      
      const allTitles = [...blogTitles, ...projectTitles]
      const uniqueTitles = new Set(allTitles)
      
      expect(uniqueTitles.size).toBe(allTitles.length)
    })

    it('should have valid markdown syntax in all files', () => {
      const allFiles = glob.sync('content/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })
      
      allFiles.forEach((file) => {
        const content = readFileSync(file, 'utf-8')
        
        // Should be parseable by gray-matter
        expect(() => matter(content)).not.toThrow()
        
        // Should not have unmatched code block delimiters
        const codeBlockMatches = content.match(/```/g)
        if (codeBlockMatches) {
          expect(codeBlockMatches.length % 2).toBe(0)
        }
      })
    })
  })

  describe('Link Integrity', () => {
    it('should have valid internal links in content', () => {
      const allFiles = glob.sync('content/**/*.md', { ignore: ['**/README.md', '**/_assets/**'] })
      const internalLinkRegex = /\[([^\]]+)\]\((\/[^)]+)\)/g
      
      allFiles.forEach((file) => {
        const content = readFileSync(file, 'utf-8')
        const parsed = matter(content)
        
        const matches = parsed.content.match(internalLinkRegex) || []
        matches.forEach((linkMatch) => {
          const linkPathMatch = linkMatch.match(/\]\((\/[^)]+)\)/)
          if (linkPathMatch) {
            const linkPath = linkPathMatch[1]
            
            // Check if it's a valid internal link
            if (linkPath.startsWith('/blog/') || linkPath.startsWith('/projects/')) {
              // These will be validated at build time by Next.js
              expect(linkPath).toMatch(/^\/(blog|projects)\/[a-z0-9-]+$/)
            }
          }
        })
      })
    })
  })
})
