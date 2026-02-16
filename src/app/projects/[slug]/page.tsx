import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { projects } from '.velite'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { MDXContent } from '@/components/mdx-content'
import Link from 'next/link'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((project) => project.slug === slug)

  if (!project || project.draft) {
    notFound()
  }

  // Get related projects (excluding current)
  const relatedProjects = projects
    .filter((p) => !p.draft && p.slug !== project.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

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

          {/* MAIN CONTENT - Constrained width */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <MDXContent source={project.content} />
            </div>
          </div>

          {/* SIDEBAR - Spec Card */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border-2 border-border bg-background p-6 space-y-8 dark:border-darkBorder">
              
              {/* Project Info */}
              <div>
                <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
                  Project Info
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="capitalize">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{format(parseISO(project.date), 'MMMM yyyy')}</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
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

              {/* Links */}
              <div>
                <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-heading">
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

            </div>
          </aside>
        </div>

        {/* MORE PROJECTS */}
        {relatedProjects.length > 0 && (
          <section className="mt-32 pt-20 border-t-2 border-border dark:border-darkBorder">
            <h2 className="text-2xl font-heading mb-10">
              More Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <Link 
                  key={relatedProject.slug}
                  href={relatedProject.url}
                  className="group block p-6 rounded-base border-2 border-border bg-bg shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {format(parseISO(relatedProject.date), 'MMM yyyy')}
                    </span>
                    <Badge variant={relatedProject.status === 'completed' ? 'default' : 'neutral'}>
                      {relatedProject.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-heading group-hover:text-main transition-colors">
                    {relatedProject.title}
                  </h3>
                  {relatedProject.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {relatedProject.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  )
}
