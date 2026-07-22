"use client"

import { Button } from "@domino/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useInvalidFieldNudge } from "../hooks/use-invalid-field-nudge"
import { type SignUpValues, signUpSchema } from "../lib/schemas"
import { AuthButtonIcon } from "./auth-button-icon"
import { AuthInputField } from "./auth-input-field"
import { PasswordField } from "./password-field"

type SignUpFormProps = {
    onVerificationRequired: (
        email: string,
        verificationRequested: boolean,
    ) => void
}

export function SignUpForm({ onVerificationRequired }: SignUpFormProps) {
    const { formRef, nudgeInvalidFields } = useInvalidFieldNudge<SignUpValues>()
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: { email: "", name: "", password: "" },
    })
    const submit = handleSubmit(async (values) => {
        try {
            const result = await authClient.signUp.email({
                ...values,
                callbackURL: new URL("/verify-email", window.location.origin)
                    .href,
            })

            if (result.error) {
                toast.error(
                    "Unable to create your account. Please try again.",
                )
                return
            }

            try {
                const verification = await authClient.sendVerificationEmail({
                    email: values.email,
                    callbackURL: new URL(
                        "/verify-email",
                        window.location.origin,
                    ).href,
                })

                onVerificationRequired(values.email, !verification.error)

                if (verification.error) {
                    toast.error(
                        verification.error.status === 429
                            ? "Too many attempts. Try again in a minute."
                            : "Unable to send a verification email. Please try again.",
                    )
                }
            } catch {
                onVerificationRequired(values.email, false)
                toast.error(
                    "Unable to send a verification email. Please try again.",
                )
            }
        } catch {
            toast.error("Unable to create your account. Please try again.")
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
                id="name"
                label="Full Name"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register("name")}
            />

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
                autoComplete="new-password"
                placeholder="Create a password"
                error={errors.password?.message}
                {...register("password")}
            />

            <Button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="h-12 w-full"
            >
                <AuthButtonIcon isPending={isSubmitting} />
                Create Account
            </Button>
        </form>
    )
}
