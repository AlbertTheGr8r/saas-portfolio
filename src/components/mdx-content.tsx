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
          h2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
            const text = String(children || '')
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            return (
              <h2
                id={id}
                className={cn(
                  'mt-20 mb-6 text-3xl font-heading tracking-tight scroll-mt-24 border-t-2 border-border dark:border-darkBorder pt-10',
                  className
                )}
                {...props}
              >
                {children}
              </h2>
            )
          },
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
          blockquote: ({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
            <blockquote
              className={cn(
                'mt-8 mb-8 rounded-base border-2 border-border dark:border-darkBorder bg-secondary-background p-6 shadow-shadow dark:shadow-darkShadow',
                className
              )}
              {...props}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-main flex items-center justify-center">
                  <span className="text-main-foreground font-heading text-lg">!</span>
                </div>
                <div className="flex-1 italic text-foreground">
                  {children}
                </div>
              </div>
            </blockquote>
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
          pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
            <div className="mb-6 rounded-base border-2 border-border dark:border-darkBorder bg-secondary-background shadow-shadow dark:shadow-darkShadow overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">code</span>
              </div>
              <pre
                className={cn(
                  'overflow-x-auto p-4 text-sm',
                  className
                )}
                {...props}
              >
                {children}
              </pre>
            </div>
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
