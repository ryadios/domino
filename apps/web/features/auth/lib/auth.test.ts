import { describe, expect, test } from "bun:test"
import { getOAuthErrorMessage } from "./errors"
import { signInSchema, signUpSchema } from "./schemas"

describe("auth schemas", () => {
    test("accepts valid credentials and trims signup names", () => {
        expect(
            signInSchema.safeParse({
                email: "person@example.com",
                password: "password123",
            }).success,
        ).toBe(true)

        const signup = signUpSchema.safeParse({
            name: "  Ada Lovelace  ",
            email: "ada@example.com",
            password: "password123",
        })

        expect(signup.success).toBe(true)
        if (signup.success) expect(signup.data.name).toBe("Ada Lovelace")
    })

    test("rejects invalid fields", () => {
        expect(
            signInSchema.safeParse({ email: "invalid", password: "short" })
                .success,
        ).toBe(false)
        expect(
            signUpSchema.safeParse({
                name: "   ",
                email: "person@example.com",
                password: "password123",
            }).success,
        ).toBe(false)
        expect(
            signInSchema.safeParse({
                email: "person@example.com",
                password: "x".repeat(129),
            }).success,
        ).toBe(false)
    })
})

describe("OAuth errors", () => {
    test("allowlists OAuth errors", () => {
        expect(getOAuthErrorMessage("access_denied")).toBe(
            "Google sign-in was cancelled.",
        )
        expect(getOAuthErrorMessage(["account_not_linked", "ignored"])).toBe(
            "An account already exists with this email. Use the original sign-in method.",
        )
        expect(getOAuthErrorMessage("unexpected_provider_detail")).toBe(
            "Google sign-in could not be completed. Please try again.",
        )
        expect(getOAuthErrorMessage(undefined)).toBeNull()
    })
})
