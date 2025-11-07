'use client'

import { useEffect, useState } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { Users, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CollabRequest } from '@/types'

interface CollabStats {
  pending: number
  accepted: number
  total: number
}

function getTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  const diffWeeks = Math.floor(diffMs / 604800000)
  
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  if (diffWeeks < 4) return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`
  
  // For older dates, show the actual date
  return past.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: past.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

export default function CollabsPage() {
  const [handle, setHandle] = useState<string | null>(null)
  const [requests, setRequests] = useState<CollabRequest[]>([])
  const [stats, setStats] = useState<CollabStats>({ pending: 0, accepted: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    // Mark collabs as seen when the page is visited
    localStorage.setItem('collabs_last_seen', new Date().toISOString())
  }, [])

  const fetchData = async () => {
    try {
      const [storeRes, collabsRes] = await Promise.all([
        fetch('/api/store'),
        fetch('/api/collabs'),
      ])

      if (storeRes.ok) {
        const storeData = await storeRes.json()
        setHandle(storeData.handle)
      }

      if (collabsRes.ok) {
        const collabsData = await collabsRes.json()
        console.log('📥 Received collab data:', collabsData)
        console.log('🔗 Requests with links:', collabsData.requests.map((r: CollabRequest) => ({
          id: r.id,
          senderName: r.senderName,
          links: r.links,
          hasLinks: !!r.links,
          linksLength: Array.isArray(r.links) ? r.links.length : 0
        })))
        setRequests(collabsData.requests)
        setStats(collabsData.stats)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* FIXED HEADER */}
      <DashboardHeader
        title="Collabs"
        subtitle="Manage your collaboration opportunities"
        handle={handle}
      />

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-8 space-y-6">
          {/* Stats Card */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Total Requests
                </div>
              </div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
          </div>

          {/* Requests List */}
          {loading ? (
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-12 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">No Collaboration Requests Yet</h2>
                <p className="text-muted-foreground">
                  When brands reach out to collaborate with you, their requests will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold px-2">Collaboration Requests</h3>
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white dark:bg-gray-950 rounded-xl border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{request.senderName}</h4>
                      {request.brandName && (
                        <p className="text-sm text-muted-foreground">{request.brandName}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {getTimeAgo(request.createdAt)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`mailto:${request.senderEmail}`}
                        className="text-primary hover:underline"
                      >
                        {request.senderEmail}
                      </a>
                    </div>

                    {request.budget && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">${request.budget.toString()}</span>
                      </div>
                    )}

                    {request.description && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {request.description}
                        </p>
                      </div>
                    )}

                    {Array.isArray(request.links) && request.links.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Additional Links:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {request.links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                            >
                              Link {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${request.senderEmail}`, '_blank')}
                        className="h-8 gap-1.5"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Open Email
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
