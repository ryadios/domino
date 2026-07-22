"use client"

import { Button } from "@domino/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useInvalidFieldNudge } from "../hooks/use-invalid-field-nudge"
import { type SignInValues, signInSchema } from "../lib/schemas"
import { AuthButtonIcon } from "./auth-button-icon"
import { AuthInputField } from "./auth-input-field"
import { PasswordField } from "./password-field"

type SignInFormProps = {
    onVerificationRequired: (email: string) => void
}

export function SignInForm({ onVerificationRequired }: SignInFormProps) {
    const router = useRouter()
    const [isNavigating, startNavigation] = useTransition()
    const { formRef, nudgeInvalidFields } = useInvalidFieldNudge<SignInValues>()
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: { email: "", password: "" },
    })
    const submit = handleSubmit(async (values) => {
        try {
            const result = await authClient.signIn.email(values)

            if (result.error) {
                if (result.error.code === "EMAIL_NOT_VERIFIED") {
                    onVerificationRequired(values.email)
                    return
                }

                toast.error(
                    "Unable to sign in. Check your credentials and try again.",
                )
                return
            }

            startNavigation(() => router.replace("/"))
        } catch {
            toast.error(
                "Unable to sign in. Check your credentials and try again.",
            )
        }
    }, nudgeInvalidFields)

    const isPending = isSubmitting || isNavigating

    return (
        <form
            ref={formRef}
            className="space-y-4"
            aria-busy={isPending}
            noValidate
            onSubmit={submit}
        >
            <AuthInputField
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
            />

            <PasswordField
                autoComplete="current-password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
            />

            <Button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className="h-12 w-full"
            >
                <AuthButtonIcon isPending={isPending} />
                Sign In
            </Button>
        </form>
    )
}
