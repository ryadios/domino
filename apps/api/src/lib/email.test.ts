import { afterEach, describe, expect, mock, test } from "bun:test"
import { sendVerificationEmail } from "./email"

const fetchImplementation = globalThis.fetch

afterEach(() => {
    globalThis.fetch = fetchImplementation
})

describe("verification email", () => {
    test("sends the Better Auth link through Resend", async () => {
        const fetchMock = mock(() =>
            Promise.resolve(new Response(null, { status: 200 })),
        )
        globalThis.fetch = fetchMock as typeof fetch

        await sendVerificationEmail(
            {
                to: "person@example.com",
                url: "https://app.example.com/api/auth/verify-email?token=token&callbackURL=%2F",
            },
            { apiKey: "secret", from: "Domino <auth@example.com>" },
        )

        expect(fetchMock).toHaveBeenCalledTimes(1)
        const [endpoint, request] = fetchMock.mock.calls[0] ?? []
        expect(endpoint).toBe("https://api.resend.com/emails")
        expect(request?.method).toBe("POST")
        expect(request?.headers).toEqual({
            Authorization: "Bearer secret",
            "Content-Type": "application/json",
        })

        const body = JSON.parse(String(request?.body))
        expect(body.to).toEqual(["person@example.com"])
        expect(body.text).toContain("token=token&callbackURL=%2F")
        expect(body.html).toContain("token=token&amp;callbackURL=%2F")
    })

    test("throws a sanitized provider error", async () => {
        globalThis.fetch = mock(() =>
            Promise.resolve(
                new Response('{"message":"provider details"}', {
                    status: 500,
                }),
            ),
        ) as typeof fetch

        expect(
            sendVerificationEmail(
                { to: "person@example.com", url: "https://example.com" },
                { apiKey: "secret", from: "auth@example.com" },
            ),
        ).rejects.toThrow("Resend request failed with status 500")
    })
})
