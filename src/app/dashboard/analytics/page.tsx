'use client'

import { useEffect, useState } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  const [handle, setHandle] = useState<string | null>(null)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch('/api/store')
        if (response.ok) {
          const data = await response.json()
          setHandle(data.handle)
        }
      } catch (error) {
        console.error('Failed to fetch store:', error)
      }
    }
    fetchStore()
  }, [])

  return (
    <div className="flex h-full flex-col">
      {/* FIXED HEADER */}
      <DashboardHeader
        title="Analytics"
        subtitle="Track your profile performance"
        handle={handle}
      />

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
              <div className="text-sm font-medium text-muted-foreground">
                Profile Views
              </div>
              <div className="mt-2 text-3xl font-bold">0</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Coming soon
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
              <div className="text-sm font-medium text-muted-foreground">
                Collaboration Requests
              </div>
              <div className="mt-2 text-3xl font-bold">0</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Coming soon
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
              <div className="text-sm font-medium text-muted-foreground">
                Active Collabs
              </div>
              <div className="mt-2 text-3xl font-bold">0</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Coming soon
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl border p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Detailed Analytics Coming Soon</h2>
              <p className="text-muted-foreground">
                Get insights into your profile performance, audience demographics, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
