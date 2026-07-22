"use client"

import { Button } from "@domino/ui/components/button"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { AuthButtonIcon } from "./auth-button-icon"

export function SignOutButton() {
    const router = useRouter()
    const [isSigningOut, setIsSigningOut] = useState(false)
    const [isRefreshing, startRefresh] = useTransition()

    async function handleSignOut() {
        setIsSigningOut(true)

        try {
            const result = await authClient.signOut()

            if (result.error) {
                toast.error("Unable to sign out. Please try again.")
                setIsSigningOut(false)
                return
            }

            startRefresh(() => router.refresh())
        } catch {
            toast.error("Unable to sign out. Please try again.")
            setIsSigningOut(false)
        }
    }

    const isPending = isSigningOut || isRefreshing

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
