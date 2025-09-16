import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateInternshipSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const internship = await prisma.internship.findUnique({
      where: { id: params.id },
      include: {
        learningPath: {
          include: {
            tasks: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        },
        applications: {
          include: {
            user: {
              include: {
                profile: true
              }
            }
          }
        }
      }
    })

    if (!internship) {
      return NextResponse.json(
        { error: 'Internship not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(internship)
  } catch (error) {
    console.error('Error fetching internship:', error)
    return NextResponse.json(
      { error: 'Failed to fetch internship' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = updateInternshipSchema.parse(body)

    const updateData: any = {}
    
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description) updateData.description = validatedData.description
    if (validatedData.duration) updateData.duration = validatedData.duration
    if (validatedData.capacity) updateData.capacity = validatedData.capacity
    if (validatedData.startDate) updateData.startDate = new Date(validatedData.startDate)
    if (validatedData.endDate) updateData.endDate = new Date(validatedData.endDate)
    if (validatedData.learningPathId !== undefined) updateData.learningPathId = validatedData.learningPathId

    const internship = await prisma.internship.update({
      where: { id: params.id },
      data: updateData,
      include: {
        learningPath: {
          include: {
            tasks: true
          }
        }
      }
    })

    return NextResponse.json(internship)
  } catch (error) {
    console.error('Error updating internship:', error)
    return NextResponse.json(
      { error: 'Failed to update internship' },
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
    
    await prisma.internship.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Internship deleted successfully' })
  } catch (error) {
    console.error('Error deleting internship:', error)
    return NextResponse.json(
      { error: 'Failed to delete internship' },
      { status: 500 }
    )
  }
}

