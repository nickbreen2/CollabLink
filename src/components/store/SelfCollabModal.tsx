'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface SelfCollabModalProps {
  open: boolean
  onClose: () => void
}

export default function SelfCollabModal({ open, onClose }: SelfCollabModalProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm p-8 gap-6 inset-x-auto inset-y-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-xl data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Can't Send Request</h3>
            <p className="text-sm text-muted-foreground">
              You can't send collaboration requests to yourself.
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full"
            variant="default"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

