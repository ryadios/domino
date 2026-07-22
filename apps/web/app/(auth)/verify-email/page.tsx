import { buttonVariants } from "@domino/ui/components/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { VerificationEmailForm } from "@/features/auth/components/verification-email-form"
import { getEmailVerificationErrorMessage } from "@/features/auth/lib/errors"
import { getServerSession } from "@/lib/auth-server"

type VerifyEmailPageProps = {
    searchParams: Promise<{ error?: string | string[] }>
}

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {
    const [params, session] = await Promise.all([
        searchParams,
        getServerSession(),
    ])

    if (session?.user.emailVerified) redirect("/")

    const error = getEmailVerificationErrorMessage(params.error)

    return (
        <AuthLayout
            title={error ? "Verification Link Expired" : "Sign In to Continue"}
            description={
                error ??
                "Your email may already be verified, but we could not confirm a session in this browser."
            }
            imageSrc="/auth/verify-email.jpg"
            alternateText={
                error ? "Already verified?" : "Don’t have an account?"
            }
            alternateHref={error ? "/signin" : "/signup"}
            alternateLabel={error ? "Sign In" : "Create Account"}
            showGoogle={false}
        >
            {error ? (
                <VerificationEmailForm />
            ) : (
                <Link
                    href="/signin"
                    className={buttonVariants({ className: "h-12 w-full" })}
                >
                    Sign In
                </Link>
            )}
        </AuthLayout>
    )
}
