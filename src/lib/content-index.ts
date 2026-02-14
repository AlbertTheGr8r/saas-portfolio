import { allPosts, allProjects } from 'contentlayer/generated'
import { writeFileSync } from 'fs'

interface ContentIndex {
  posts: {
    slug: string
    title: string
    date: string
    excerpt?: string
    tags: string[]
    type: 'blog' | 'project'
    url: string
  }[]
  tags: string[]
  techStacks: string[]
}

export function generateContentIndex() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug || post._raw.sourceFileName.replace('.md', ''),
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags,
      type: 'blog' as const,
      url: post.url,
    }))

  const projects = allProjects
    .filter((project) => !project.draft)
    .map((project) => ({
      slug: project.slug || project._raw.sourceFileName.replace('.md', ''),
      title: project.title,
      date: project.date,
      excerpt: project.excerpt,
      tags: [...project.tags, ...project.techStack],
      type: 'project' as const,
      url: project.url,
    }))

  const allItems = [...posts, ...projects]

  // Extract unique tags
  const allTags = new Set<string>()
  allItems.forEach((item) => {
    item.tags.forEach((tag) => allTags.add(tag))
  })

  // Extract unique tech stacks from projects
  const allTechStacks = new Set<string>()
  allProjects.forEach((project) => {
    project.techStack.forEach((tech) => allTechStacks.add(tech))
  })

  const index: ContentIndex = {
    posts: allItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    tags: Array.from(allTags).sort(),
    techStacks: Array.from(allTechStacks).sort(),
  }

  writeFileSync('./public/content-index.json', JSON.stringify(index, null, 2))
}
