import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import * as motion from "motion/react-client"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { easeOut } from "@/lib/motion"
import { GoogleAuthButton } from "./google-auth-button"

type AuthLayoutProps = {
    title: string
    description: ReactNode
    imageSrc: string
    alternateText: string
    alternateHref: string
    alternateLabel: string
    oauthError?: string | null
    showGoogle?: boolean
    children: ReactNode
}

export function AuthLayout({
    title,
    description,
    imageSrc,
    alternateText,
    alternateHref,
    alternateLabel,
    oauthError,
    showGoogle = true,
    children,
}: AuthLayoutProps) {
    return (
        <main className="grid min-h-svh bg-background text-foreground md:grid-cols-2">
            <section className="flex items-center justify-center px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ duration: 0.28, ease: easeOut }}
                    className="w-full max-w-md space-y-6"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                        Home
                    </Link>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-light tracking-tighter md:text-5xl">
                            {title}
                        </h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>

                    {children}

                    {showGoogle && (
                        <>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="h-px flex-1 bg-border" />
                                Or continue with
                                <span className="h-px flex-1 bg-border" />
                            </div>

                            <GoogleAuthButton callbackError={oauthError} />
                        </>
                    )}

                    <p className="text-center text-sm text-muted-foreground">
                        {alternateText}{" "}
                        <Link
                            href={alternateHref}
                            className="text-accent hover:underline"
                        >
                            {alternateLabel}
                        </Link>
                    </p>
                </motion.div>
            </section>

            <section className="relative hidden min-h-svh p-4 md:block">
                <motion.div
                    initial={{ opacity: 0, transform: "scale(0.985)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    transition={{ duration: 0.3, delay: 0.06, ease: easeOut }}
                    className="absolute inset-4 overflow-hidden rounded-3xl"
                >
                    <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="50vw"
                        className="object-cover"
                    />
                </motion.div>
            </section>
        </main>
    )
}
