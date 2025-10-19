'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface LocationEditModalProps {
  open: boolean
  currentLocation: string
  onClose: () => void
  onSave: (newLocation: string) => void
}

export default function LocationEditModal({
  open,
  currentLocation,
  onClose,
  onSave,
}: LocationEditModalProps) {
  const [location, setLocation] = useState(currentLocation)
  const [isSaving, setIsSaving] = useState(false)

  // Update local state when currentLocation changes or modal opens
  useEffect(() => {
    if (open) {
      setLocation(currentLocation)
    }
  }, [open, currentLocation])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(location.trim())
      onClose()
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setLocation(currentLocation) // Reset to original
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="City, Country"
              maxLength={60}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              {location.length}/60
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

