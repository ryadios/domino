import { serve } from "srvx"
import app from "./index"

serve({
    fetch: (request) => app.fetch(request),
    middleware: [
        async (request, next) => {
            const start = performance.now()
            const response = await next()
            const duration = performance.now() - start

            console.log(
                `${request.method} ${new URL(request.url).pathname} [${response.status}] (${duration.toFixed(2)}ms)`,
            )
            return response
        },
    ],
})
