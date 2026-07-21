import { AuthLayout } from "@/features/auth/components/auth-layout"
import { SignUpForm } from "@/features/auth/components/sign-up-form"
import { getOAuthErrorMessage } from "@/features/auth/lib/errors"

type SignUpPageProps = {
    searchParams: Promise<{ error?: string | string[] }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
    const oauthError = getOAuthErrorMessage((await searchParams).error)

    return (
        <AuthLayout
            title="Get Started"
            description="Create your account and start editing with AI"
            imageSrc="/auth/signup.jpg"
            alternateText="Already have an account?"
            alternateHref="/signin"
            alternateLabel="Sign In"
            oauthError={oauthError}
        >
            <SignUpForm />
        </AuthLayout>
    )
}
