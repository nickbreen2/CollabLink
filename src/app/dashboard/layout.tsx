import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import DashboardNav from '@/components/DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session.isLoggedIn) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <DashboardNav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}

