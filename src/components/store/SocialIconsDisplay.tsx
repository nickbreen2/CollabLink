'use client'

import { getPlatformById } from '@/lib/platformCategories'
import { getPlatformIcon } from '@/components/icons/PlatformIcons'

interface SocialLink {
  network: string
  url: string
}

interface SocialIconsDisplayProps {
  links: SocialLink[]
}

// Simple component that renders social icons as clickable links
// NO drag functionality - icons are NOT draggable
export default function SocialIconsDisplay({ links }: SocialIconsDisplayProps) {
  return (
    <>
      {links.map((link) => {
        const platform = getPlatformById(link.network)
        const Icon = platform ? getPlatformIcon(platform.icon) : null

        if (!Icon) return null

        return (
          <a
            key={link.network}
            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg"
          >
            <Icon className="h-10 w-10 object-contain" />
          </a>
        )
      })}
    </>
  )
}

