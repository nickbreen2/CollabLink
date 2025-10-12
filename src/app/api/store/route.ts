import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { StoreUpdateSchema } from '@/lib/validations'

export async function GET() {
  try {
    const session = await requireAuth()

    const store = await prisma.creatorStore.findUnique({
      where: { userId: session.userId },
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(store)
  } catch (error) {
    console.error('Get store error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await request.json()

    // Validate input
    const result = StoreUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const updateData = result.data

    // Update store
    const store = await prisma.creatorStore.update({
      where: { userId: session.userId },
      data: updateData,
    })

    return NextResponse.json(store)
  } catch (error) {
    console.error('Update store error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

