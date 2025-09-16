import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createInternshipSchema } from '@/lib/validation'
import { requireAdmin, getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    const internships = await prisma.internship.findMany({
      include: {
        learningPath: {
          include: {
            tasks: true
          }
        },
        applications: user?.role === 'ADMIN' ? {
          include: {
            user: true
          }
        } : undefined
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(internships)
  } catch (error) {
    console.error('Error fetching internships:', error)
    return NextResponse.json(
      { error: 'Failed to fetch internships' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = createInternshipSchema.parse(body)

    const internship = await prisma.internship.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        duration: validatedData.duration,
        capacity: validatedData.capacity,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        learningPathId: validatedData.learningPathId
      },
      include: {
        learningPath: {
          include: {
            tasks: true
          }
        }
      }
    })

    return NextResponse.json(internship, { status: 201 })
  } catch (error) {
    console.error('Error creating internship:', error)
    return NextResponse.json(
      { error: 'Failed to create internship' },
      { status: 500 }
    )
  }
}

