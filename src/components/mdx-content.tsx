import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MDXContentProps {
  source: string
  className?: string
}

export function MDXContent({ source, className }: MDXContentProps) {
  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1
              className={cn(
                'mt-12 mb-6 text-4xl font-heading tracking-tight scroll-mt-24',
                className
              )}
              {...props}
            />
          ),
          h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2
              className={cn(
                'mt-10 mb-4 text-3xl font-heading tracking-tight scroll-mt-24',
                className
              )}
              {...props}
            />
          ),
          h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3
              className={cn(
                'mt-8 mb-3 text-2xl font-heading tracking-tight',
                className
              )}
              {...props}
            />
          ),
          p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p
              className={cn('leading-8 mb-6 text-foreground', className)}
              {...props}
            />
          ),
          ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
            <ul className={cn('my-6 ml-6 list-disc space-y-2', className)} {...props} />
          ),
          ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
            <ol className={cn('my-6 ml-6 list-decimal space-y-2', className)} {...props} />
          ),
          li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
            <li className={cn('leading-7', className)} {...props} />
          ),
          blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
            <blockquote
              className={cn(
                'mt-6 border-l-4 border-main bg-secondary-background pl-6 py-4 italic mb-6',
                className
              )}
              {...props}
            />
          ),
          code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <code
              className={cn(
                'relative rounded bg-secondary-background px-[0.3rem] py-[0.2rem] font-mono text-sm',
                className
              )}
              {...props}
            />
          ),
          pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
            <pre
              className={cn(
                'mb-6 overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-4',
                className
              )}
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-border" {...props} />
          ),
          a: ({ className, href = '', ...props }: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
            const isExternal = href.startsWith('http')
            return (
              <a
                href={href}
                className={cn(
                  'font-medium underline underline-offset-4 text-main hover:text-main/80',
                  className
                )}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
              />
            )
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
