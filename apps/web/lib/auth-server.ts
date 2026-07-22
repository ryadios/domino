import { headers } from "next/headers"

type Session = {
    user: { id: string; name: string; email: string; emailVerified: boolean }
}

export async function getServerSession() {
    const baseURL = process.env.API_URL
    if (!baseURL) throw new Error("API_URL is required")

    const cookie = (await headers()).get("cookie") ?? ""
    const response = await fetch(new URL("/api/auth/get-session", baseURL), {
        headers: { cookie },
        cache: "no-store",
    })

    if (!response.ok)
        throw new Error(`Session request failed with status ${response.status}`)

    return (await response.json()) as Session | null
}
