"use client"

import { Input } from "@domino/ui/components/input"
import { cn } from "@domino/ui/lib/utils"
import { EyeIcon, EyeOffIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion } from "motion/react"
import { type ComponentProps, useState } from "react"
import { easeOut } from "@/lib/motion"
import { FieldError } from "./field-error"

type PasswordFieldProps = Omit<ComponentProps<typeof Input>, "type"> & {
    autoComplete: "current-password" | "new-password"
    error?: string
}

export function PasswordField({
    id = "password",
    autoComplete,
    error,
    className,
    "aria-describedby": ariaDescribedBy,
    ...props
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const errorId = `${id}-error`
    const describedBy = [ariaDescribedBy, error && errorId]
        .filter(Boolean)
        .join(" ")

    return (
        <label
            htmlFor={id}
            className="flex flex-col text-sm font-medium text-muted-foreground"
        >
            Password
            <span className="relative mt-2 block">
                <Input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    autoComplete={autoComplete}
                    required
                    minLength={8}
                    maxLength={128}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy || undefined}
                    className={cn("h-12 px-4 pr-12", className)}
                    {...props}
                />
                <button
                    type="button"
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute inset-y-0 right-3 flex w-5 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                    <AnimatePresence initial={false}>
                        <motion.span
                            key={showPassword ? "hide" : "show"}
                            initial={{
                                opacity: 0,
                                transform: "scale(0.7)",
                            }}
                            animate={{ opacity: 1, transform: "scale(1)" }}
                            exit={{
                                opacity: 0,
                                transform: "scale(0.7)",
                            }}
                            transition={{ duration: 0.3, ease: easeOut }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <HugeiconsIcon
                                icon={showPassword ? EyeOffIcon : EyeIcon}
                                size={20}
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </motion.span>
                    </AnimatePresence>
                </button>
            </span>
            <FieldError id={errorId} message={error} />
        </label>
    )
}
