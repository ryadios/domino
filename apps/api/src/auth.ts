import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import { env } from "./env"

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
        ...(env.GITHUB && { github: env.GITHUB }),
        ...(env.GOOGLE && { google: env.GOOGLE }),
    },
    trustedOrigins: [env.CORS_ORIGIN],
})
