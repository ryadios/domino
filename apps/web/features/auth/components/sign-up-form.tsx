"use client"

import { Button } from "@domino/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAnimate } from "motion/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { easeInOut } from "@/lib/motion"
import { type SignUpValues, signUpSchema } from "../lib/schemas"
import { AuthButtonIcon } from "./auth-button-icon"
import { AuthInputField } from "./auth-input-field"
import { PasswordField } from "./password-field"

export function SignUpForm() {
    const router = useRouter()
    const [formRef, animate] = useAnimate<HTMLFormElement>()
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
    const submit = handleSubmit(
        async (values) => {
            try {
                const result = await authClient.signUp.email(values)

                if (result.error) {
                    toast.error(
                        "Unable to create your account. Please try again.",
                    )
                    return
                }

                router.replace("/")
                router.refresh()
            } catch {
                toast.error("Unable to create your account. Please try again.")
            }
        },
        (errors) => {
            const invalidFields = Object.keys(errors)
                .map((name) => `[name=${name}]`)
                .join(",")

            if (invalidFields)
                void animate(
                    invalidFields,
                    { x: [0, -4, 3, -2, 0] },
                    { duration: 0.24, ease: easeInOut },
                )
        },
    )

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
