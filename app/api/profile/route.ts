import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { updateProfileSchema } from '@/lib/validation'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()
    
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth()
    
    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    const profile = await prisma.profile.upsert({
      where: {
        userId: user.id
      },
      update: {
        cvUrl: validatedData.cvUrl,
        education: validatedData.education,
        skills: validatedData.skills,
        experience: validatedData.experience
      },
      create: {
        userId: user.id,
        cvUrl: validatedData.cvUrl,
        education: validatedData.education,
        skills: validatedData.skills || [],
        experience: validatedData.experience
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

