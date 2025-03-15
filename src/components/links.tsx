import {
  IconType,
  SiGithub,
  SiGmail,
  SiGooglemaps,
} from '@icons-pack/react-simple-icons'

export default function Links() {
  const links: { icon: IconType; href: string }[] = [
    {
      icon: SiGmail,
      href: 'mailto:albertflorin93@gmail.com',
    },
    {
      icon: SiGithub,
      href: 'https://github.com/AlbertTheGr8r',
    },
    {
      icon: SiGooglemaps,
      href: 'https://maps.app.goo.gl/1rGKJzqherZ72yEQ6',
    }
  ]

  return (
    <div className="mr-auto mb-20 flex w-full flex-wrap items-center gap-10 justify-center">
      {links.map((link, id) => {
        return (
          <a target="_blank" key={id} href={link.href}>
            <link.icon title="" />
          </a>
        )
      })}
    </div>
  )
}