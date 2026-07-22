"use client"

import { Button } from "@domino/ui/components/button"

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
    return (
        <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
            <div className="max-w-md space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-light tracking-tight">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        We couldn&apos;t reach the service. Please try again.
                    </p>
                </div>
                <Button type="button" onClick={reset} className="min-w-32">
                    Try Again
                </Button>
            </div>
        </main>
    )
}
