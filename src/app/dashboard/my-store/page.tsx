'use client'

import { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import StorePreviewCard from '@/components/StorePreviewCard'
import StoreCardToggle from '@/components/StoreCardToggle'
import EditPanel from '@/components/EditPanel'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { CreatorStore } from '@prisma/client'

export default function MyStorePage() {
  const [store, setStore] = useState<CreatorStore | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'preview' | 'edit'>('preview')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchStore()
  }, [])

  const fetchStore = async () => {
    try {
      const response = await fetch('/api/store')
      if (!response.ok) {
        throw new Error('Failed to fetch store')
      }
      const data = await response.json()
      setStore(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load store data',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updates: Partial<CreatorStore>) => {
    if (!store) return

    try {
      const response = await fetch('/api/store', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update store')
      }

      const updatedStore = await response.json()
      setStore(updatedStore)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save changes',
      })
    }
  }

  const copyUrl = () => {
    if (!store) return
    const url = `${window.location.origin}/${store.handle}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: 'Copied!',
      description: 'Store URL copied to clipboard',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your store...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Store not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header with URL */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Store</h1>
              <p className="text-muted-foreground mt-1">
                Customize your creator profile
              </p>
            </div>
            <Button variant="outline" onClick={copyUrl}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy URL
                </>
              )}
            </Button>
          </div>

          {/* Public URL Display */}
          <div className="bg-muted/50 rounded-lg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Your public page:</span>
              <code className="font-mono bg-background px-2 py-1 rounded">
                collabverse.io/{store.handle}
              </code>
            </div>
          </div>

          {/* Store Preview Card with Toggle */}
          <div className="relative">
            <StoreCardToggle
              mode={mode}
              onToggle={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            />
            <StorePreviewCard store={store} />
          </div>
        </div>
      </div>

      {/* Edit Panel (only in edit mode) */}
      {mode === 'edit' && (
        <EditPanel store={store} onUpdate={handleUpdate} />
      )}
    </div>
  )
}

