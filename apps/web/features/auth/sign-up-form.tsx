"use client"

import { Button } from "@domino/ui/components/button"
import { Input } from "@domino/ui/components/input"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { PasswordField } from "./password-field"

export function SignUpForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("")

    async function handleSignUp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsPending(true)
        setError("")

        const form = new FormData(event.currentTarget)

        try {
            const result = await authClient.signUp.email({
                name: String(form.get("name")),
                email: String(form.get("email")),
                password: String(form.get("password")),
            })

            if (result.error) {
                setError(result.error.message ?? "Authentication failed")
                return
            }

            router.replace("/")
            router.refresh()
        } catch {
            setError("Unable to reach the authentication server")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="space-y-5">
            <form
                className="space-y-5"
                aria-busy={isPending}
                onSubmit={handleSignUp}
            >
                <label
                    htmlFor="name"
                    className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
                >
                    Full Name
                    <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        className="h-12 px-4"
                        placeholder="Enter your full name"
                    />
                </label>

                <label
                    htmlFor="email"
                    className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
                >
                    Email Address
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-12 px-4"
                        placeholder="Enter your email address"
                    />
                </label>

                <PasswordField
                    autoComplete="new-password"
                    placeholder="Create a password"
                />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-12 w-full"
                >
                    {isPending ? "Please wait…" : "Create Account"}
                </Button>
            </form>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}
