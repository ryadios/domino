"use client"

import { Button } from "@domino/ui/components/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { AuthButtonIcon } from "./auth-button-icon"

type GoogleAuthButtonProps = {
    callbackError?: string | null
}

export function GoogleAuthButton({
    callbackError = null,
}: GoogleAuthButtonProps) {
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        if (!callbackError) return

        toast.error(callbackError, { id: "oauth-callback-error" })

        const url = new URL(window.location.href)
        url.searchParams.delete("error")
        window.history.replaceState(
            window.history.state,
            "",
            `${url.pathname}${url.search}${url.hash}`,
        )
    }, [callbackError])

    async function handleGoogleSignIn() {
        const origin = window.location.origin
        setIsPending(true)

        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: origin,
                errorCallbackURL: new URL(window.location.pathname, origin)
                    .href,
            })

            if (result.error)
                toast.error("Unable to sign in with google. Please try again.")
        } catch {
            toast.error("Unable to sign in with google. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            aria-busy={isPending}
            onClick={handleGoogleSignIn}
            className="h-12 w-full border-border has-data-[icon=inline-start]:pl-2.5"
        >
            <AuthButtonIcon
                isPending={isPending}
                idle={<Image src="/google.svg" alt="" width={16} height={16} />}
            />
            Continue with Google
        </Button>
    )
}
