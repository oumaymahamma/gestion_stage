import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createSubmissionSchema, updateSubmissionSchema } from '@/lib/validation'
import { requireAuth, requireAdmin, getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let submissions
    
    if (user.role === 'ADMIN') {
      // Admin can see all submissions
      submissions = await prisma.submission.findMany({
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
        },
        orderBy: {
          submittedAt: 'desc'
        }
      })
    } else {
      // Users can only see their own submissions
      submissions = await prisma.submission.findMany({
        where: {
          userId: user.id
        },
        include: {
          task: {
            include: {
              learningPath: true
            }
          }
        },
        orderBy: {
          submittedAt: 'desc'
        }
      })
    }

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    
    const body = await request.json()
    const validatedData = createSubmissionSchema.parse(body)

    // Check if user already submitted for this task
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        userId_taskId: {
          userId: user.id,
          taskId: validatedData.taskId
        }
      }
    })

    if (existingSubmission) {
      // Update existing submission
      const submission = await prisma.submission.update({
        where: {
          userId_taskId: {
            userId: user.id,
            taskId: validatedData.taskId
          }
        },
        data: {
          githubUrl: validatedData.githubUrl,
          status: 'PENDING',
          submittedAt: new Date(),
          reviewedAt: null,
          feedback: null
        },
        include: {
          task: {
            include: {
              learningPath: true
            }
          }
        }
      })

      return NextResponse.json(submission)
    } else {
      // Create new submission
      const submission = await prisma.submission.create({
        data: {
          userId: user.id,
          taskId: validatedData.taskId,
          githubUrl: validatedData.githubUrl
        },
        include: {
          task: {
            include: {
              learningPath: true
            }
          }
        }
      })

      return NextResponse.json(submission, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}

