"use client"

import { Button } from "@domino/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useInvalidFieldNudge } from "../hooks/use-invalid-field-nudge"
import {
    type VerificationEmailValues,
    verificationEmailSchema,
} from "../lib/schemas"
import { AuthButtonIcon } from "./auth-button-icon"
import { AuthInputField } from "./auth-input-field"

export function VerificationEmailForm() {
    const { formRef, nudgeInvalidFields } =
        useInvalidFieldNudge<VerificationEmailValues>()
    const [cooldown, setCooldown] = useState(0)
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm<VerificationEmailValues>({
        resolver: zodResolver(verificationEmailSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: { email: "" },
    })

    useEffect(() => {
        if (cooldown === 0) return

        const timer = window.setTimeout(
            () => setCooldown((seconds) => seconds - 1),
            1_000,
        )
        return () => window.clearTimeout(timer)
    }, [cooldown])

    const submit = handleSubmit(async ({ email }) => {
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
                "If an unverified account exists, we sent a verification email.",
            )
            setCooldown(60)
        } catch {
            toast.error(
                "Unable to send a verification email. Please try again.",
            )
        }
    }, nudgeInvalidFields)

    return (
        <form
            ref={formRef}
            className="space-y-4"
            aria-busy={isSubmitting}
            noValidate
            onSubmit={submit}
        >
            <AuthInputField
                id="verification-email"
                label="Email Address"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
            />

            <Button
                type="submit"
                disabled={isSubmitting || cooldown > 0}
                aria-busy={isSubmitting}
                className="h-12 w-full"
            >
                <AuthButtonIcon isPending={isSubmitting} />
                {cooldown > 0
                    ? `Send again in ${cooldown}s`
                    : "Resend Verification Email"}
            </Button>
        </form>
    )
}
