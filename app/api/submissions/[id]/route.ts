import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateSubmissionSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = updateSubmissionSchema.parse(body)

    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        status: validatedData.status,
        feedback: validatedData.feedback,
        reviewedAt: new Date()
      },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        task: {
          include: {
            learningPath: true
          }
        }
      }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json(
      { error: 'Failed to update submission' },
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
    
    await prisma.submission.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Submission deleted successfully' })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}

