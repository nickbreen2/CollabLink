'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageSquareText, Bug, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default function FeedbackPage() {
  const router = useRouter()

  // Redirect to dashboard on desktop (this page is mobile-only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      router.push('/dashboard/my-store')
    }
  }, [router])

  const handleFeedback = (type: 'contact' | 'bug' | 'feature') => {
    // TODO: Implement feedback submission logic
    console.log(`Feedback type: ${type}`)
    // For now, just go back
    router.back()
  }

  return (
    <div className="flex h-full flex-col lg:hidden">
      {/* Header */}
      <DashboardHeader
        title="Send Feedback"
        subtitle="How can we help you?"
        showHandleBar={false}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
              onClick={() => handleFeedback('contact')}
            >
              <MessageSquareText className="h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col items-start flex-1">
                <span className="font-medium">Contact</span>
                <span className="text-xs text-muted-foreground text-left">
                  Get in touch with our team
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
              onClick={() => handleFeedback('bug')}
            >
              <Bug className="h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col items-start flex-1">
                <span className="font-medium">Report a Bug</span>
                <span className="text-xs text-muted-foreground text-left">
                  Let us know about an issue
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
              onClick={() => handleFeedback('feature')}
            >
              <Lightbulb className="h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col items-start flex-1">
                <span className="font-medium">Request a Feature</span>
                <span className="text-xs text-muted-foreground text-left">
                  Suggest a new feature
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

