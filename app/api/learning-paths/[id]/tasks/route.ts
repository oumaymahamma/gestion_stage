import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createTaskSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const tasks = await prisma.task.findMany({
      where: {
        learningPathId: params.id
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = createTaskSchema.parse({
      ...body,
      learningPathId: params.id
    })

    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        contentType: validatedData.contentType,
        deadlineOffset: validatedData.deadlineOffset,
        order: validatedData.order,
        learningPathId: validatedData.learningPathId
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}

