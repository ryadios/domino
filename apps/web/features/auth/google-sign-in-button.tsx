"use client"

import { Button } from "@domino/ui/components/button"
import Image from "next/image"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export function GoogleSignInButton() {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("")

    async function handleGoogleSignIn() {
        setIsPending(true)
        setError("")

        try {
            const { error: authError } = await authClient.signIn.social({
                provider: "google",
                callbackURL: window.location.origin,
            })

            if (authError)
                setError(authError.message ?? "Google sign in failed")
        } catch {
            setError("Unable to reach the authentication server")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="space-y-2">
            <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={handleGoogleSignIn}
                className="h-12 w-full gap-3 border-border"
            >
                <Image src="/google.svg" alt="" width={17} height={17} />
                Continue with Google
            </Button>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}
