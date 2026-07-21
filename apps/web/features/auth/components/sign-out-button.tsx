"use client"

import { Button } from "@domino/ui/components/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { AuthButtonIcon } from "./auth-button-icon"

export function SignOutButton() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    async function handleSignOut() {
        setIsPending(true)

        try {
            const result = await authClient.signOut()

            if (result.error) {
                toast.error("Unable to sign out. Please try again.")
                return
            }

            router.replace("/")
            router.refresh()
        } catch {
            toast.error("Unable to sign out. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button
            type="button"
            variant="outline"
            disabled={isPending}
            aria-busy={isPending}
            onClick={handleSignOut}
            className="h-auto px-4 py-2"
        >
            <AuthButtonIcon isPending={isPending} />
            Sign Out
        </Button>
    )
}
