import { z } from 'zod'

export const HandleSchema = z
  .string()
  .min(3, 'Handle must be at least 3 characters')
  .max(30, 'Handle must be at most 30 characters')
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Handle can only contain lowercase letters, numbers, and hyphens (not at start/end)')

export const RESERVED_HANDLES = [
  'admin',
  'api',
  'login',
  'signup',
  'dashboard',
  'collabverse',
  'www',
  'auth',
  'signin',
  'signout',
]

export const SignUpSchema = z.object({
  email: z.string().toLowerCase().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  handle: HandleSchema.transform(val => val.toLowerCase()),
})

export const SignInSchema = z.object({
  email: z.string().toLowerCase().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const StoreUpdateSchema = z.object({
  displayName: z.string().max(50).optional(),
  location: z.string().max(60).optional(),
  bio: z.string().max(280).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  bannerUrl: z.string().url().optional().or(z.literal('')),
  theme: z.enum(['LIGHT', 'DARK']).optional(),
  social: z
    .array(
      z.object({
        network: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
  categories: z.array(z.string()).max(5, 'Maximum 5 categories allowed').optional(),
})

export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type StoreUpdateInput = z.infer<typeof StoreUpdateSchema>

