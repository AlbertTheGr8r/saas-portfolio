import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: false },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: false },
    excerpt: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    featured: { type: 'boolean', default: false },
    draft: { type: 'boolean', default: false },
    archived: { type: 'boolean', default: false },
    coverImage: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace('blog/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post.slug || post._raw.sourceFileName.replace('.md', ''),
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: false },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: false },
    status: { 
      type: 'enum', 
      options: ['completed', 'in-progress', 'archived'],
      default: 'completed'
    },
    excerpt: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean', default: false },
    archived: { type: 'boolean', default: false },
    coverImage: { type: 'string', required: false },
    demoUrl: { type: 'string', required: false },
    repoUrl: { type: 'string', required: false },
    techStack: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project._raw.flattenedPath.replace('projects/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (project) => project.slug || project._raw.sourceFileName.replace('.md', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
  contentDirExclude: ['README.md'],
  mdx: {
    remarkPlugins: [remarkGfm, remarkToc],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
})
