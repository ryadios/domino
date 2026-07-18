import { Hono } from "hono"
import { cors } from "hono/cors"
import { auth } from "./auth"
import { env } from "./env"

const app = new Hono()

app.use(
    "/api/auth/*",
    cors({
        origin: env.CORS_ORIGIN,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        credentials: true,
    }),
)

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

export default app
