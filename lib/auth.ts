import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db"

export async function getCurrentUser() {
  const { userId } = await auth() // <-- il faut attendre l'appel

  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { profile: true },
    })

    return user
  } catch (error) {
    console.error("❌ Error fetching current user:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}

export async function requireAdmin() {
  const user = await requireAuth()

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required")
  }

  return user
}
