import { z } from 'zod'

// Common fields for both posts and projects
const commonFields = {
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Updated date must be in YYYY-MM-DD format').optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  archived: z.boolean().default(false),
  coverImage: z.string().optional(),
}

// Blog post schema
export const PostSchema = z.object({
  ...commonFields,
  featured: z.boolean().default(false),
})

// Project schema
export const ProjectSchema = z.object({
  ...commonFields,
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  demoUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  techStack: z.array(z.string()).default([]),
})

// Content file schema (includes body)
export const PostFileSchema = PostSchema.extend({
  content: z.string(),
})

export const ProjectFileSchema = ProjectSchema.extend({
  content: z.string(),
})

// Types
export type Post = z.infer<typeof PostSchema>
export type Project = z.infer<typeof ProjectSchema>
