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
    <article className="min-h-screen bg-bg dark:bg-darkBg pt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">

        {/* HERO */}
        <header className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Badge variant={project.status === 'completed' ? 'default' : 'neutral'}>
              {project.status}
            </Badge>
            <span>·</span>
            <time dateTime={project.date}>
              {format(parseISO(project.date), 'MMMM yyyy')}
            </time>
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-heading">
            {project.title}
          </h1>

          {project.excerpt && (
            <p className="mt-6 text-lg text-muted-foreground">
              {project.excerpt}
            </p>
          )}

          <div className="mt-8 flex justify-center gap-3">
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

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <MDXContent code={project.body.code} />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {project.techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="neutral">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Links
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.demoUrl && (
                  <Button size="sm" variant="neutral" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button size="sm" variant="noShadow" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </article>
  )
}
