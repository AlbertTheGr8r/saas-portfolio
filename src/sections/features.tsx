import Marquee from 'react-fast-marquee'
import projects from '@/data/projects.json'
import skills from '@/data/skills.json'

export default function Features() {

  return (
    <div>
      <section id='projects' className="border-t-border border-t-2 bg-background py-20 font-base lg:py-[100px]">
        <h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Projects
        </h2>

        <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            return (
              <div
                className="border-border bg-secondary-background shadow-shadow flex flex-col gap-3 rounded-base border-2 p-5"
                key={i}
              >
                <h4 className="text-xl font-heading">
                  {project.title} {i + 1}
                </h4>
                <p>{project.text}</p>
              </div>
            )
          })}
        </div>
      </section>
      <div>
        <Marquee
          className="border-y-border border-y-2 bg-secondary-background py-3 font-base sm:py-5"
          direction="left"
        >
          {skills.skills
            .map((skill, id) => {
              return (
                <div className="flex items-center" key={`${skill}-${id}`}>
                  <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
                    {skill}
                  </span>
                </div>
              )
            })}
        </Marquee>
      </div>
    </div>
  )
}
