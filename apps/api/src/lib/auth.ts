import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
import { db } from "../db"
import { env } from "./env"

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    socialProviders: {
        ...(env.GITHUB && { github: env.GITHUB }),
        ...(env.GOOGLE && { google: env.GOOGLE }),
    },
    trustedOrigins: [env.CORS_ORIGIN],
    plugins: [openAPI({ disableDefaultReference: true })],
})
