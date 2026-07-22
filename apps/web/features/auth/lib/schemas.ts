import { z } from "zod"

export const verificationEmailSchema = z.object({
    email: z.email("Enter a valid email address"),
})

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")

export const signInSchema = verificationEmailSchema.extend({
    password: passwordSchema,
})

export const signUpSchema = signInSchema.extend({
    name: z.string().trim().min(1, "Enter your full name"),
})

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
export type VerificationEmailValues = z.infer<typeof verificationEmailSchema>
