import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createLearningPathSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    
    const learningPaths = await prisma.learningPath.findMany({
      include: {
        tasks: {
          orderBy: {
            order: 'asc'
          }
        },
        internships: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(learningPaths)
  } catch (error) {
    console.error('Error fetching learning paths:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning paths' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = createLearningPathSchema.parse(body)

    const learningPath = await prisma.learningPath.create({
      data: {
        title: validatedData.title,
        description: validatedData.description
      },
      include: {
        tasks: true
      }
    })

    return NextResponse.json(learningPath, { status: 201 })
  } catch (error) {
    console.error('Error creating learning path:', error)
    return NextResponse.json(
      { error: 'Failed to create learning path' },
      { status: 500 }
    )
  }
}

