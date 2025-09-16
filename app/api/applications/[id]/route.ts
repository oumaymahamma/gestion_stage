import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateApplicationSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = updateApplicationSchema.parse(body)

    const application = await prisma.application.update({
      where: { id: params.id },
      data: {
        status: validatedData.status,
        reviewedAt: new Date()
      },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        internship: {
          include: {
            learningPath: {
              include: {
                tasks: {
                  orderBy: {
                    order: 'asc'
                  }
                }
              }
            }
          }
        }
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    await prisma.application.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Application deleted successfully' })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
}

