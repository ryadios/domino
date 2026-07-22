import Link from "next/link"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/features/auth/components/sign-out-button"
import { getServerSession } from "@/lib/auth-server"

export default async function Home() {
    const session = await getServerSession()

    if (session && !session.user.emailVerified) redirect("/signin")

    if (session) {
        return (
            <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
                <div className="w-full max-w-lg space-y-8">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-accent">
                            Authenticated
                        </p>
                        <h1 className="text-4xl font-light tracking-tighter md:text-5xl">
                            Welcome, {session.user.name}
                        </h1>
                        <p className="text-muted-foreground">
                            Your Better Auth session is active.
                        </p>
                    </div>

                    <dl className="divide-y divide-border rounded-xl border border-border">
                        <div className="space-y-1 p-4">
                            <dt className="text-sm text-muted-foreground">
                                Email
                            </dt>
                            <dd>{session.user.email}</dd>
                        </div>
                        <div className="space-y-1 p-4">
                            <dt className="text-sm text-muted-foreground">
                                User ID
                            </dt>
                            <dd className="break-all font-mono text-sm">
                                {session.user.id}
                            </dd>
                        </div>
                    </dl>

                    <SignOutButton />
                </div>
            </main>
        )
    }

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
