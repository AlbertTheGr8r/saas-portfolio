import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allProjects, type Project } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-base border-2 border-border bg-bg shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:border-darkBorder dark:bg-darkBg dark:shadow-darkShadow">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <time dateTime={project.date} className="text-sm text-muted-foreground">
            {format(parseISO(project.date), 'MMMM yyyy')}
          </time>
          <Badge variant={project.status === 'completed' ? 'default' : 'neutral'}>
            {project.status}
          </Badge>
        </div>
        
        <h2 className="mt-3 text-2xl font-heading">
          <Link href={project.url} className="hover:text-main transition-colors">
            {project.title}
          </Link>
        </h2>
        
        {project.excerpt && (
          <p className="mt-3 line-clamp-3 text-muted-foreground">
            {project.excerpt}
          </p>
        )}
        
        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="neutral" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-3">
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
    </article>
  )
}

export default function ProjectsPage() {
  const projects = allProjects
    .filter((project) => !project.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg">
      <div className="mx-auto w-container max-w-full px-5 py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-heading">Projects</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of things I&apos;ve built.
          </p>
        </header>

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-base border-2 border-border bg-secondary-background p-12 text-center dark:border-darkBorder">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
