'use client'

import { MessageSquareText, Bug, Lightbulb } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

export default function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const handleFeedback = (type: 'contact' | 'bug' | 'feature') => {
    // TODO: Implement feedback submission logic
    console.log(`Feedback type: ${type}`)
    // For now, just close the modal
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            How can we help you? Choose an option below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={() => handleFeedback('contact')}
          >
            <MessageSquareText className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Contact</span>
              <span className="text-xs text-muted-foreground">
                Get in touch with our team
              </span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={() => handleFeedback('bug')}
          >
            <Bug className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Report a Bug</span>
              <span className="text-xs text-muted-foreground">
                Let us know about an issue
              </span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={() => handleFeedback('feature')}
          >
            <Lightbulb className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Request a Feature</span>
              <span className="text-xs text-muted-foreground">
                Suggest a new feature
              </span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

