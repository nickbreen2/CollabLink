'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Settings, LogOut, MessageSquare, Copy, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import FeedbackModal from './FeedbackModal'
import { useMemo } from 'react'

interface MobileProfileDropdownProps {
  user?: {
    email: string
    displayName?: string | null
    avatarUrl?: string | null
  }
  handle?: string | null
}

export default function MobileProfileDropdown({
  user,
  handle,
}: MobileProfileDropdownProps) {
  const router = useRouter()
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  const handleFeedbackClick = () => {
    // On mobile, navigate to feedback page. On desktop, open modal.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      router.push('/dashboard/feedback')
    } else {
      setFeedbackModalOpen(true)
    }
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const avatarFallback = displayName.substring(0, 2).toUpperCase()

  const publicPath = useMemo(() => {
    const h = (handle ?? '').trim()
    return h ? `collabl.ink/${h}` : 'collabl.ink/…'
  }, [handle])

  const fullOpenUrl = useMemo(() => {
    const base =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${base.replace(/\/+$/, '')}/${(handle ?? '').trim()}`
  }, [handle])

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST' })
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      })
      router.push('/auth/sign-in')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out',
      })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://${publicPath}`)
      toast({
        title: 'Link copied',
        description: `https://${publicPath}`,
      })
    } catch {
      toast({
        variant: 'destructive',
        title: "Couldn't copy",
        description: 'Select and copy manually.',
      })
    }
  }

  const openInNewTab = () => {
    window.open(fullOpenUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="lg:hidden fixed top-4 right-4 z-[110] focus:outline-none transition-transform hover:scale-105 active:scale-95"
            aria-label="Open profile menu"
          >
            <Avatar className="h-10 w-10 ring-2 ring-background/50 shadow-lg border-2 border-background/20">
              {user?.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={displayName} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white font-semibold">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 mr-3 mt-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 z-[120]"
          sideOffset={8}
        >
          {/* User Info */}
          <div className="px-3 py-2.5 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                {user?.avatarUrl && (
                  <AvatarImage src={user.avatarUrl} alt={displayName} />
                )}
                <AvatarFallback className="text-xs">{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate leading-tight">{displayName}</p>
                {user?.email && (
                  <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Handle URL Section */}
          {handle && (
            <div className="px-3 py-2.5 border-b border-gray-200 dark:border-gray-800">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Your Profile Link
              </p>
              <div className="flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2 py-1.5">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{publicPath}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Copy link"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={openInNewTab}
                    className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="Open link"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="py-1">
            {/* Settings */}
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            {/* Send Feedback */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleFeedbackClick}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Send Feedback</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="my-1" />

          <div className="py-1">
            {/* Logout */}
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20 focus:text-red-600 dark:focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <FeedbackModal
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </>
  )
}

