"use client"

import { AnimatePresence, motion } from "motion/react"
import { easeOut } from "@/lib/motion"

type FieldErrorProps = {
    id: string
    message?: string
}

export function FieldError({ id, message }: FieldErrorProps) {
    return (
        <div className="mt-1.5 min-h-5">
            <AnimatePresence initial={false}>
                {message && (
                    <motion.p
                        key={id}
                        id={id}
                        role="alert"
                        initial={{
                            opacity: 0,
                            transform: "translateY(-2px)",
                        }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{
                            opacity: 0,
                            transform: "translateY(-2px)",
                            transition: { duration: 0.14, ease: easeOut },
                        }}
                        transition={{ duration: 0.18, ease: easeOut }}
                        className="text-sm leading-5 text-destructive"
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
