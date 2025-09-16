import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createUserSchema } from '@/lib/validation'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        applications: {
          include: {
            internship: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    const user = await prisma.user.create({
      data: {
        clerkId: `temp_${Date.now()}`, // Temporary ID for admin-created users
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role
      },
      include: {
        profile: true
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

