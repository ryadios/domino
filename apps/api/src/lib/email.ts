type VerificationEmail = {
    to: string
    url: string
}

type ResendConfig = {
    apiKey: string
    from: string
}

function escapeHtml(value: string) {
    return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
}

export async function sendVerificationEmail(
    { to, url }: VerificationEmail,
    { apiKey, from }: ResendConfig,
) {
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [to],
            subject: "Verify your Domino email",
            text: `Verify your email address to finish creating your Domino account:\n\n${url}\n\nThis link expires in one hour. If you did not request this email, you can ignore it.`,
            html: `<p>Verify your email address to finish creating your Domino account.</p><p><a href="${escapeHtml(url)}">Verify email</a></p><p>This link expires in one hour. If you did not request this email, you can ignore it.</p>`,
        }),
        signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
        throw new Error(`Resend request failed with status ${response.status}`)
    }
}
