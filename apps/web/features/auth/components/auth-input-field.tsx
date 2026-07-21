"use client"

import { Input } from "@domino/ui/components/input"
import { cn } from "@domino/ui/lib/utils"
import type { ComponentProps } from "react"
import { FieldError } from "./field-error"

type AuthInputFieldProps = ComponentProps<typeof Input> & {
    id: string
    label: string
    error?: string
}

export function AuthInputField({
    id,
    label,
    error,
    className,
    "aria-describedby": ariaDescribedBy,
    ...props
}: AuthInputFieldProps) {
    const errorId = `${id}-error`
    const describedBy = [ariaDescribedBy, error && errorId]
        .filter(Boolean)
        .join(" ")

    return (
        <label
            htmlFor={id}
            className="flex flex-col text-sm font-medium text-muted-foreground"
        >
            {label}
            <Input
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy || undefined}
                className={cn("mt-2 h-12 px-4", className)}
                {...props}
            />
            <FieldError id={errorId} message={error} />
        </label>
    )
}
