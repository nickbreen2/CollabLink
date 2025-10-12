'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ContentForm from './ContentForm'
import DesignForm from './DesignForm'
import { CreatorStore } from '@prisma/client'

interface EditPanelProps {
  store: CreatorStore
  onUpdate: (data: Partial<CreatorStore>) => void
}

export default function EditPanel({ store, onUpdate }: EditPanelProps) {
  return (
    <div className="w-96 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Store</h2>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="flex-1">
              Design
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-6">
            <ContentForm store={store} onUpdate={onUpdate} />
          </TabsContent>
          
          <TabsContent value="design" className="mt-6">
            <DesignForm store={store} onUpdate={onUpdate} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

