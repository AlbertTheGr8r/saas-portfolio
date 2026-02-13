import reviews from '@/data/reviews.json'

interface Review {
  pfp: string;
  fullName: string;
  jobTitle: string;
  review: string;
}

export default function Community() {
  const distributeReviews = (reviews: Review[]) => {
    const columns: Review[][] = [[], [], []];
    
    // Middle column first (index 1)
    for (let i = 0; i < reviews.length; i++) {
      if (i % 3 === 1) {
        columns[1].push(reviews[i]);
      }
    }
    
    // First and third columns
    for (let i = 0; i < reviews.length; i++) {
      if (i % 3 === 0) {
        columns[0].push(reviews[i]);
      } else if (i % 3 === 2) {
        columns[2].push(reviews[i]);
      }
    }
    
    return columns;
  };

  const distributedReviews = distributeReviews(reviews.reviews);

  return (
    <section className="border-b-border bg-secondary-background inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
      <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          See who I&apos;ve worked with
        </h2>
        <div className="grid grid-cols-3 gap-4 lg:gap-8 w900:grid-cols-1 w900:gap-0">
          {distributedReviews.map((card, index) => (
            <div className="group flex flex-col justify-center" key={index}>
              {card.map(({ jobTitle, pfp, fullName, review }, index) => (
                <div
                  className="border-border shadow-shadow bg-secondary-background mb-4 min-h-48 w-full rounded-base border-2 p-5 lg:mb-8 w900:mx-auto w900:min-h-20 w900:w-2/3 w500:w-full"
                  key={index}
                >
                  <div className="flex items-center gap-5">
                    <img
                      className="border-border h-12 w-12 rounded-base border-2"
                      src={pfp}
                      alt="pfp"
                    />

                    <div>
                      <h4 className="text-lg font-heading">{fullName}</h4>
                      <p className="text-sm font-base">{jobTitle}</p>
                    </div>
                  </div>
                  <div className="mt-5">{review}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
