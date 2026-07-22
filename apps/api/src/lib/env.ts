function required(name: string) {
    const value = process.env[name]
    if (!value) throw new Error(`${name} is required`)
    return value
}

function credentials(id: string, secret: string) {
    const clientId = process.env[id]
    const clientSecret = process.env[secret]

    if (Boolean(clientId) !== Boolean(clientSecret)) {
        throw new Error(`${id} and ${secret} must be configured together`)
    }

    return clientId && clientSecret ? { clientId, clientSecret } : undefined
}

export const env = {
    DATABASE_URL: required("DATABASE_URL"),
    BETTER_AUTH_SECRET: required("BETTER_AUTH_SECRET"),
    BETTER_AUTH_URL: required("BETTER_AUTH_URL"),
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3001",
    GMAIL_USER: required("GMAIL_USER"),
    GMAIL_APP_PASSWORD: required("GMAIL_APP_PASSWORD"),
    GITHUB: credentials("GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"),
    GOOGLE: {
        clientId: required("GOOGLE_CLIENT_ID"),
        clientSecret: required("GOOGLE_CLIENT_SECRET"),
    },
}
