import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { allProjects } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MDXContent } from './mdx-content'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project._raw.flattenedPath.replace('projects/', ''),
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = allProjects.find(
    (project) => project._raw.flattenedPath.replace('projects/', '') === slug
  )

  if (!project || project.draft) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-bg dark:bg-darkBg">
      <div className="mx-auto w-container max-w-full px-5 py-20">
        <header className="mb-12">
          <div className="flex items-center gap-3">
            <Badge variant={project.status === 'completed' ? 'default' : 'neutral'}>
              {project.status}
            </Badge>
            <time dateTime={project.date} className="text-sm text-muted-foreground">
              {format(parseISO(project.date), 'MMMM yyyy')}
            </time>
          </div>

          <h1 className="mt-4 text-4xl font-heading md:text-5xl">
            {project.title}
          </h1>

          {project.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{project.excerpt}</p>
          )}

          {project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="neutral">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="neutral" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXContent code={project.body.code} />
        </div>
      </div>
    </article>
  )
}
