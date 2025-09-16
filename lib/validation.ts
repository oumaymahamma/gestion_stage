import { z } from 'zod'

// User schemas
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['USER', 'ADMIN']).default('USER')
})

export const updateProfileSchema = z.object({
  cvUrl: z.string().url().optional(),
  education: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.string().optional()
})

// Internship schemas
export const createInternshipSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.number().min(1).max(12),
  capacity: z.number().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  learningPathId: z.string().optional()
})

export const updateInternshipSchema = createInternshipSchema.partial()

// Learning path schemas
export const createLearningPathSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
})

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  contentType: z.enum(['TEXT', 'VIDEO']).default('TEXT'),
  deadlineOffset: z.number().min(1),
  order: z.number().min(1),
  learningPathId: z.string()
})

// Application schemas
export const createApplicationSchema = z.object({
  internshipId: z.string()
})

export const updateApplicationSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED'])
})

// Submission schemas
export const createSubmissionSchema = z.object({
  taskId: z.string(),
  githubUrl: z.string().url()
})

export const updateSubmissionSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REQUIRES_CHANGES']),
  feedback: z.string().optional()
})

