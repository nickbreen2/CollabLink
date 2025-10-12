'use client'

import { useEffect, useState } from 'react'
import StorePreviewCard from '@/components/StorePreviewCard'
import EditPanel from '@/components/EditPanel'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import EditPreviewToggle from '@/components/store/EditPreviewToggle'
import EmailConnectPill from '@/components/store/EmailConnectPill'
import Banner from '@/components/Banner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/components/ui/use-toast'
import { CreatorStore } from '@prisma/client'
import { Instagram, Youtube, Music, Eye, Pencil } from 'lucide-react'

export default function MyStorePage() {
  const [store, setStore] = useState<CreatorStore | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'preview' | 'edit'>('preview')

  useEffect(() => {
    fetchStore()
  }, [])

  const fetchStore = async () => {
    try {
      const response = await fetch('/api/store')
      if (!response.ok) {
        throw new Error('Failed to fetch store')
      }
      const data = await response.json()
      setStore(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load store data',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updates: Partial<CreatorStore>) => {
    if (!store) return

    try {
      const response = await fetch('/api/store', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update store')
      }

      const updatedStore = await response.json()
      setStore(updatedStore)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save changes',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your store...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Store not found</p>
        </div>
      </div>
    )
  }

  const isEditing = mode === 'edit'
  const handleToggle = () => setMode(mode === 'preview' ? 'edit' : 'preview')
  
  const social = (store.social as any[]) || []
  const socialIcons: Record<string, any> = {
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Music,
    snapchat: Music,
  }
  
  const initials = store.displayName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?'

  const handleEmailConnect = (email: string) => {
    console.log('Connect email:', email)
    toast({
      title: 'Coming soon!',
      description: 'Email connection will be available soon.',
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* FIXED HEADER - DOESN'T SCROLL */}
      <DashboardHeader
        title="My Store"
        subtitle="Customize your creator profile"
        handle={store.handle}
      />

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] h-full px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] h-full">
            {/* PREVIEW COLUMN - SCROLLABLE */}
            <div className="flex justify-center items-start overflow-y-auto scrollbar-hide max-h-[calc(100vh-120px)] pt-8 pb-6">
              {/* PREVIEW CARD — BIGGER + CENTERED */}
              <div
                className={`
                  relative
                  w-full max-w-[860px]
                  overflow-hidden rounded-3xl border shadow-xl
                  ring-1 ring-black/10 dark:ring-white/10
                  h-fit
                  ${store.theme === 'LIGHT' ? 'bg-white text-black' : 'bg-black text-white border-gray-800'}
                `}
              >
                {/* Banner/header area with toggle button */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Banner src={store.bannerUrl || undefined} theme={store.theme} />
                  
                  {/* TOP-LEFT TOGGLE - Inside banner with high z-index */}
                  <button
                    onClick={handleToggle}
                    className="absolute left-6 top-6 z-50 px-4 py-2 bg-white text-black rounded-full shadow-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    {isEditing ? (
                      <>
                        <Eye className="h-4 w-4" />
                        Preview
                      </>
                    ) : (
                      <>
                        <Pencil className="h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>

                {/* PROFILE BODY - Centered Content */}
                <div
                  className={`
                    relative
                    w-full
                    flex flex-col justify-center
                    min-h-[680px]
                    px-6 pb-10 pt-2
                    sm:px-10
                    ${store.theme === 'LIGHT' ? 'bg-white' : 'bg-gradient-to-b from-black via-black/95 to-black'}
                  `}
                >
                  {/* Avatar + Profile Info - Moved up */}
                  <div className="relative -mt-32 mb-5">
                    <Avatar className="h-32 w-32 border-4 border-white dark:border-black shadow-xl">
                      <AvatarImage src={store.avatarUrl || undefined} />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {store.displayName || 'Your Name'}
                      </h2>
                      {store.location && (
                        <p className={`text-sm mt-1 ${store.theme === 'LIGHT' ? 'text-gray-600' : 'text-gray-400'}`}>
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

                    {/* EMAIL CONNECT PILL */}
                    <EmailConnectPill
                      avatarUrl={store.avatarUrl}
                      onSubmit={handleEmailConnect}
                      className="mt-6"
                    />

                    {/* Social Links */}
                    {social.length > 0 && (
                      <div className="flex gap-3 pt-4">
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
            </div>

            {/* EDITOR COLUMN - SCROLLABLE WITH FADE */}
            <aside className={`${isEditing ? 'block' : 'hidden lg:block'} pt-8 pb-6`}>
              {isEditing && (
                <div className="sticky top-0 h-[calc(100vh-136px)] rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
                  {/* TOP FADE EFFECT */}
                  <div className="absolute top-0 left-0 right-0 z-10 h-8 bg-gradient-to-b from-white via-white/90 dark:from-gray-950 dark:via-gray-950/90 to-transparent pointer-events-none" />
                  
                  {/* SCROLLABLE CONTENT */}
                  <div className="h-full overflow-y-auto">
                    <EditPanel store={store} onUpdate={handleUpdate} />
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
