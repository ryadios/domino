import { AuthLayout } from "@/features/auth/components/auth-layout"
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { getOAuthErrorMessage } from "@/features/auth/lib/errors"

type SignInPageProps = {
    searchParams: Promise<{ error?: string | string[] }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const oauthError = getOAuthErrorMessage((await searchParams).error)

    return (
        <AuthLayout
            title="Welcome Back"
            description="Sign in to your account and continue editing with AI"
            imageSrc="/auth/signin.jpg"
            alternateText="Don’t have an account yet?"
            alternateHref="/signup"
            alternateLabel="Create Account"
            oauthError={oauthError}
        >
            <SignInForm />
        </AuthLayout>
    )
}
