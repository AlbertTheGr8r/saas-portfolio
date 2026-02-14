import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-8 scroll-m-20 text-4xl font-heading tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-8 scroll-m-20 text-3xl font-heading tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-heading tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-heading tracking-tight',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  a: ({ className, href = '', ...props }: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    const isExternal = href.startsWith('http')
    return (
      <Link
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
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-main bg-secondary-background pl-6 py-4 italic',
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
        'mb-4 mt-6 overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-4',
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-border" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t border-border p-0', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        'border border-border px-4 py-2 text-left font-heading [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('rounded-base border-2 border-border', className)}
      alt={alt}
      {...props}
    />
  ),
}
