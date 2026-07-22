import { useAnimate } from "motion/react"
import type { FieldErrors, FieldValues } from "react-hook-form"
import { easeInOut } from "@/lib/motion"

export function useInvalidFieldNudge<T extends FieldValues>() {
    const [formRef, animate] = useAnimate<HTMLFormElement>()

    function nudgeInvalidFields(errors: FieldErrors<T>) {
        const invalidFields = Object.keys(errors)
            .map((name) => `[name="${CSS.escape(name)}"]`)
            .join(",")

        if (invalidFields)
            void animate(
                invalidFields,
                { x: [0, -4, 3, -2, 0] },
                { duration: 0.24, ease: easeInOut },
            )
    }

    return { formRef, nudgeInvalidFields }
}
