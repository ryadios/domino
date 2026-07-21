"use client"

import { Spinner } from "@domino/ui/components/spinner"
import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"
import { easeOut } from "@/lib/motion"

type AuthButtonIconProps = {
    isPending: boolean
    idle?: ReactNode
}

export function AuthButtonIcon({ isPending, idle }: AuthButtonIconProps) {
    const content = isPending ? <Spinner /> : idle

    return (
        <span
            aria-hidden="true"
            data-icon="inline-start"
            className="relative size-4 shrink-0"
        >
            <AnimatePresence initial={false}>
                {content && (
                    <motion.span
                        key={isPending ? "pending" : "idle"}
                        initial={{ opacity: 0, transform: "scale(0.96)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{
                            opacity: 0,
                            transform: "scale(0.96)",
                            transition: { duration: 0.1, ease: easeOut },
                        }}
                        transition={{ duration: 0.14, ease: easeOut }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {content}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    )
}
