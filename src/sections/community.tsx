import featured from '@/data/featured.json'
import Link from 'next/link'

interface FeaturedItem {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export default function Community() {
  const distributeFeatured = (items: FeaturedItem[]) => {
    const columns: FeaturedItem[][] = [[], [], []];
    
    for (let i = 0; i < items.length; i++) {
      if (i % 3 === 1) {
        columns[1].push(items[i]);
      }
    }
    
    for (let i = 0; i < items.length; i++) {
      if (i % 3 === 0) {
        columns[0].push(items[i]);
      } else if (i % 3 === 2) {
        columns[2].push(items[i]);
      }
    }
    
    return columns;
  };

  const distributedFeatured = distributeFeatured(featured.featured);

  return (
    <section className="border-b-border bg-secondary-background inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
      <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Featured
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {distributedFeatured.map((card, index) => (
            <div className="group flex flex-col justify-center" key={index}>
              {card.map(({ title, date, excerpt, slug }, index) => (
                <Link
                  href={`/blog/${slug}`}
                  className="border-border shadow-shadow bg-background mb-4 min-h-48 w-full rounded-base border-2 p-5 lg:mb-8 w900:mx-auto w900:min-h-20 w900:w-2/3 w500:w-full transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                  key={index}
                >
                  <div className="text-sm font-base text-muted-foreground">
                    {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h4 className="mt-2 text-lg font-heading line-clamp-2">{title}</h4>
                  <p className="mt-3 text-sm font-base line-clamp-3">{excerpt}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
