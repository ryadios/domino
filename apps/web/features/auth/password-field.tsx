"use client"

import { Input } from "@domino/ui/components/input"
import { EyeIcon, EyeOffIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

type PasswordFieldProps = {
    autoComplete: "current-password" | "new-password"
    placeholder: string
}

export function PasswordField({
    autoComplete,
    placeholder,
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <label
            htmlFor="password"
            className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
        >
            Password
            <span className="relative block">
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={autoComplete}
                    required
                    minLength={8}
                    maxLength={128}
                    className="h-12 px-4 pr-12"
                    placeholder={placeholder}
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
                    <HugeiconsIcon
                        icon={EyeIcon}
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        data-visible={!showPassword}
                        className="password-visibility-icon"
                    />
                    <HugeiconsIcon
                        icon={EyeOffIcon}
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        data-visible={showPassword}
                        className="password-visibility-icon"
                    />
                </button>
            </span>
        </label>
    )
}
