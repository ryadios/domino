import { swaggerUI } from "@hono/swagger-ui"
import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"
import { auth } from "./lib/auth"
import { env } from "./lib/env"
import authRouter from "./routes/auth"

const app = new OpenAPIHono()

app.use(
    "/api/auth/*",
    cors({
        origin: env.CORS_ORIGIN,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        maxAge: 600,
        credentials: true,
    }),
)

app.route("/api", authRouter)

app.get("/openapi.json", async (c) => {
    const document = await auth.api.generateOpenAPISchema()

    document.paths = Object.fromEntries(
        Object.entries(document.paths).map(([path, operations]) => {
            for (const operation of Object.values(operations))
                operation.tags = ["auth"]
            return [`/api/auth${path}`, operations]
        }),
    )

    return c.json({
        ...document,
        info: { title: "Domino API", version: "1.0.0" },
        servers: [{ url: "/" }],
        tags: [{ name: "auth", description: "Authentication" }],
    })
})

app.get("/docs", swaggerUI({ url: "/openapi.json", title: "Domino API Docs" }))

export default app
