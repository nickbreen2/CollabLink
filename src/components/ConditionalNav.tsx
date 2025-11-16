'use client'

import { usePathname } from 'next/navigation'
import DashboardNav from './DashboardNav'
import MobileBottomNav from './dashboard/MobileBottomNav'
import MobileProfileDropdown from './dashboard/MobileProfileDropdown'

interface ConditionalNavProps {
  user?: {
    email: string
    displayName?: string | null
    avatarUrl?: string | null
  }
  handle?: string | null
  pendingCollabCount?: number
  totalCollabCount?: number
  newestPendingTimestamp?: string | null
}

export default function ConditionalNav(props: ConditionalNavProps) {
  const pathname = usePathname()
  const isSettingsPage = pathname === '/dashboard/settings'
  const isFeedbackPage = pathname === '/dashboard/feedback'
  
  if (isSettingsPage || isFeedbackPage) {
    return (
      <>
        <MobileProfileDropdown user={props.user} handle={props.handle} />
        <MobileBottomNav />
      </>
    )
  }
  
  return (
    <>
      <DashboardNav {...props} />
      <MobileBottomNav />
      <MobileProfileDropdown user={props.user} handle={props.handle} />
    </>
  )
}

