import { defineConfig, defineCollection, s } from 'velite'

// Post schema for blog content
const posts = defineCollection({
  name: 'posts',
  pattern: 'blog/*.md',
  schema: s
    .object({
      title: s.string(),
      slug: s.path(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      excerpt: s.string().optional(),
      tags: s.array(s.string()).default([]),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      archived: s.boolean().default(false),
      coverImage: s.string().optional(),
      // Use raw() to get markdown content as string, process with next-mdx-remote
      content: s.raw(),
      metadata: s.metadata(),
    })
    .transform((data) => ({
      ...data,
      // Extract just the filename from path (e.g., "blog/welcome" -> "welcome")
      slug: data.slug.replace(/^blog\//, ''),
      url: `/blog/${data.slug.replace(/^blog\//, '')}`,
    })),
})

// Project schema for project content
const projects = defineCollection({
  name: 'projects',
  pattern: 'projects/*.md',
  schema: s
    .object({
      title: s.string(),
      slug: s.path(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      status: s.enum(['completed', 'in-progress', 'archived']).default('completed'),
      excerpt: s.string().optional(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      archived: s.boolean().default(false),
      coverImage: s.string().optional(),
      demoUrl: s.string().optional(),
      repoUrl: s.string().optional(),
      techStack: s.array(s.string()).default([]),
      // Use raw() to get markdown content as string, process with next-mdx-remote
      content: s.raw(),
      metadata: s.metadata(),
    })
    .transform((data) => ({
      ...data,
      // Extract just the filename from path (e.g., "projects/saas-portfolio" -> "saas-portfolio")
      slug: data.slug.replace(/^projects\//, ''),
      url: `/projects/${data.slug.replace(/^projects\//, '')}`,
    })),
})

export default defineConfig({
  root: './content',
  output: {
    data: '.velite',
    clean: true,
  },
  collections: { posts, projects },
})
