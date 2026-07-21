import Link from "next/link"

export default function Home() {
    return (
        <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
            <div className="space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-light tracking-tighter md:text-5xl">
                        Domino
                    </h1>
                    <p className="text-muted-foreground">
                        AI automation workflows, made simple.
                    </p>
                </div>

                <div className="flex justify-center gap-3">
                    <Link
                        href="/signin"
                        className="home-auth-action rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="home-auth-action rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </main>
    )
}
