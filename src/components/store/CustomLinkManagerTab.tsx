'use client'

import { useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreatorStore } from '@prisma/client'
import { useDebounce } from '@/hooks/useDebounce'
import { toast } from '@/components/ui/use-toast'
import { CustomLink } from '@/types'
import AddCustomLinkPage from './AddCustomLinkPage'
import EditCustomLinkPage from './EditCustomLinkPage'
import DraggableCustomLinksList from './DraggableCustomLinksList'

interface CustomLinkManagerTabProps {
  store: CreatorStore
  onUpdate: (data: Partial<CreatorStore>) => void
  onBack: () => void
}

type CustomLinkView = 'manager' | 'add' | 'edit'

export default function CustomLinkManagerTab({ store, onUpdate, onBack }: CustomLinkManagerTabProps) {
  const [customLinks, setCustomLinks] = useState<CustomLink[]>((store.customLinks as CustomLink[]) || [])
  const [currentView, setCurrentView] = useState<CustomLinkView>('manager')
  const [editingLink, setEditingLink] = useState<CustomLink | null>(null)

  // Debounced save
  const debouncedSave = useDebounce((data: any) => {
    onUpdate(data)
  }, 400)

  const handleAddLink = (title: string, url: string) => {
    const newLink: CustomLink = {
      id: crypto.randomUUID(),
      title,
      url,
      visible: true
    }

    const newLinks = [...customLinks, newLink]
    setCustomLinks(newLinks)
    debouncedSave({ customLinks: newLinks })
    
    toast({
      title: 'Link added',
      description: `${title} has been added`,
    })

    setCurrentView('manager')
  }

  const handleUpdateLink = (updatedLink: CustomLink) => {
    const newLinks = customLinks.map(link => 
      link.id === updatedLink.id ? updatedLink : link
    )
    setCustomLinks(newLinks)
    debouncedSave({ customLinks: newLinks })
    
    toast({
      title: 'Link updated',
      description: `${updatedLink.title} has been updated`,
    })

    setCurrentView('manager')
    setEditingLink(null)
  }

  const handleDeleteLink = (linkId: string) => {
    const newLinks = customLinks.filter(link => link.id !== linkId)
    setCustomLinks(newLinks)
    debouncedSave({ customLinks: newLinks })
    
    toast({
      title: 'Link removed',
      description: 'Custom link has been removed',
    })

    setCurrentView('manager')
    setEditingLink(null)
  }

  const handleEdit = (link: CustomLink) => {
    setEditingLink(link)
    setCurrentView('edit')
  }

  const handleReorderLinks = async (newLinks: CustomLink[]) => {
    const previousLinks = customLinks

    // Optimistically update the UI
    setCustomLinks(newLinks)

    try {
      // Save immediately (no debounce for reordering)
      await onUpdate({ customLinks: newLinks })
    } catch (error) {
      // Revert on error
      setCustomLinks(previousLinks)
      toast({
        variant: 'destructive',
        title: 'Failed to reorder',
        description: 'Could not save the new order. Please try again.',
      })
    }
  }

  const handleBackToManager = () => {
    setCurrentView('manager')
    setEditingLink(null)
  }

  // Render different views based on state
  if (currentView === 'add') {
    return (
      <AddCustomLinkPage
        onBack={handleBackToManager}
        onSave={handleAddLink}
      />
    )
  }

  if (currentView === 'edit' && editingLink) {
    return (
      <EditCustomLinkPage
        link={editingLink}
        onBack={handleBackToManager}
        onSave={handleUpdateLink}
        onDelete={handleDeleteLink}
      />
    )
  }

  // Manager view
  return (
    <div className="h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-950 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="text-base font-semibold">Custom Link</h3>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          {/* Add Link Button */}
          <Button
            type="button"
            className="w-full mb-4 bg-[#0F172A] text-white hover:bg-[#1E293B] border-[#0F172A] hover:border-[#1E293B] transition-colors"
            onClick={() => setCurrentView('add')}
          >
            <Plus className="w-4 h-4 mr-2 text-white" />
            Add link
          </Button>

          {/* Draggable Custom Links List with 6-dot handles */}
          <DraggableCustomLinksList 
            links={customLinks} 
            onEdit={handleEdit}
            onReorder={handleReorderLinks}
          />

          {/* Empty State */}
          {customLinks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No links yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



