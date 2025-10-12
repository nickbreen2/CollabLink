'use client'

import { Button } from '@/components/ui/button'

interface StoreCardToggleProps {
  mode: 'preview' | 'edit'
  onToggle: () => void
}

export default function StoreCardToggle({ mode, onToggle }: StoreCardToggleProps) {
  return (
    <div className="absolute left-4 top-4 z-10">
      <Button variant="secondary" size="sm" onClick={onToggle}>
        {mode === 'preview' ? 'Edit' : 'Preview'}
      </Button>
    </div>
  )
}

