'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Banner from './Banner'
import { Instagram, Youtube, Music } from 'lucide-react'
import { CreatorStore } from '@prisma/client'

interface StorePreviewCardProps {
  store: CreatorStore
}

const socialIcons: Record<string, any> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music,
  snapchat: Music, // Using Music as placeholder
}

export default function StorePreviewCard({ store }: StorePreviewCardProps) {
  const social = (store.social as any[]) || []
  const initials = store.displayName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?'

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border shadow-2xl ${
        store.theme === 'LIGHT'
          ? 'bg-white text-black'
          : 'bg-black text-white border-gray-800'
      }`}
    >
      <Banner src={store.bannerUrl || undefined} theme={store.theme} />

      <div className="relative px-8 pb-8 -mt-16">
        {/* Avatar */}
        <div className="mb-4">
          <Avatar className="h-32 w-32 border-4 border-white dark:border-black shadow-xl">
            <AvatarImage src={store.avatarUrl || undefined} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold">
              {store.displayName || 'Your Name'}
            </h2>
            {store.location && (
              <p className="text-sm text-muted-foreground mt-1">
                📍 {store.location}
              </p>
            )}
          </div>

          {store.bio && (
            <p className="text-sm leading-relaxed">{store.bio}</p>
          )}

          {/* Categories */}
          {store.categories && store.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {store.categories.map((category, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    store.theme === 'LIGHT'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Social Links */}
          {social.length > 0 && (
            <div className="flex gap-3 pt-2">
              {social.map((link: any, index: number) => {
                const Icon = socialIcons[link.network.toLowerCase()] || Instagram
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-colors ${
                      store.theme === 'LIGHT'
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

