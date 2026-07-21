import type { NextConfig } from "next"

const apiURL = process.env.API_URL

if (!apiURL) throw new Error("API_URL is required")

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: `${apiURL}/api/auth/:path*`,
            },
        ]
    },
}

export default nextConfig
