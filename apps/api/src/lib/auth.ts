import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
import { db } from "../db"
import { sendVerificationEmail } from "./email"
import { env } from "./env"

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: false,
        sendOnSignIn: false,
        autoSignInAfterVerification: true,
        expiresIn: 3600,
        async sendVerificationEmail({ user, url }) {
            await sendVerificationEmail({ to: user.email, url })
        },
    },
    rateLimit: {
        storage: "database",
        customRules: { "/get-session": false },
    },
    socialProviders: {
        ...(env.GITHUB && { github: env.GITHUB }),
        google: env.GOOGLE,
    },
    trustedOrigins: [env.CORS_ORIGIN],
    plugins: [openAPI({ disableDefaultReference: true })],
})
