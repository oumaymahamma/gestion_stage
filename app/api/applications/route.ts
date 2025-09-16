import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createApplicationSchema, updateApplicationSchema } from '@/lib/validation'
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

    let applications
    
    if (user.role === 'ADMIN') {
      // Admin can see all applications
      applications = await prisma.application.findMany({
        include: {
          user: {
            include: {
              profile: true
            }
          },
          internship: true
        },
        orderBy: {
          appliedAt: 'desc'
        }
      })
    } else {
      // Users can only see their own applications
      applications = await prisma.application.findMany({
        where: {
          userId: user.id
        },
        include: {
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
        },
        orderBy: {
          appliedAt: 'desc'
        }
      })
    }

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    
    const body = await request.json()
    const validatedData = createApplicationSchema.parse(body)

    // Check if user already applied for this internship
    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_internshipId: {
          userId: user.id,
          internshipId: validatedData.internshipId
        }
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied for this internship' },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        userId: user.id,
        internshipId: validatedData.internshipId
      },
      include: {
        internship: true,
        user: true
      }
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
}

