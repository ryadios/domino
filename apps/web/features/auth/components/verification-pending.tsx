"use client"

import { Button } from "@domino/ui/components/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { AuthButtonIcon } from "./auth-button-icon"

type VerificationPendingProps = {
    email: string
    initiallyRequested?: boolean
    onBack: () => void
}

export function VerificationPending({
    email,
    initiallyRequested = false,
    onBack,
}: VerificationPendingProps) {
    const [isPending, setIsPending] = useState(false)
    const [hasRequested, setHasRequested] = useState(initiallyRequested)
    const [cooldown, setCooldown] = useState(initiallyRequested ? 60 : 0)

    useEffect(() => {
        if (cooldown === 0) return

        const timer = window.setTimeout(
            () => setCooldown((seconds) => seconds - 1),
            1_000,
        )
        return () => window.clearTimeout(timer)
    }, [cooldown])

    async function resend() {
        setIsPending(true)

        try {
            const result = await authClient.sendVerificationEmail({
                email,
                callbackURL: new URL("/verify-email", window.location.origin)
                    .href,
            })

            if (result.error) {
                toast.error(
                    result.error.status === 429
                        ? "Too many attempts. Try again in a minute."
                        : "Unable to send a verification email. Please try again.",
                )
                return
            }

            toast.success(
                "If this email needs verification, we sent a new link.",
            )
            setHasRequested(true)
            setCooldown(60)
        } catch {
            toast.error(
                "Unable to send a verification email. Please try again.",
            )
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="space-y-3">
            <Button
                type="button"
                disabled={isPending || cooldown > 0}
                aria-busy={isPending}
                onClick={resend}
                className="h-12 w-full"
            >
                <AuthButtonIcon isPending={isPending} />
                {cooldown > 0
                    ? `Send again in ${cooldown}s`
                    : hasRequested
                      ? "Resend Verification Email"
                      : "Send Verification Email"}
            </Button>
            <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={onBack}
                className="h-12 w-full border-border"
            >
                Use a Different Email
            </Button>
        </div>
    )
}
