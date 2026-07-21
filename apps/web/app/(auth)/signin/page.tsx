import { AuthLayout } from "@/features/auth/auth-layout"
import { SignInForm } from "@/features/auth/sign-in-form"

export default function SignInPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            description="Sign in to your account and continue editing with AI"
            imageSrc="/auth/signin.jpg"
            alternateText="Don’t have an account yet?"
            alternateHref="/signup"
            alternateLabel="Create Account"
        >
            <SignInForm />
        </AuthLayout>
    )
}
