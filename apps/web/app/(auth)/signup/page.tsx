import { AuthLayout } from "@/features/auth/auth-layout"
import { SignUpForm } from "@/features/auth/sign-up-form"

export default function SignUpPage() {
    return (
        <AuthLayout
            title="Get Started"
            description="Create your account and start editing with AI"
            imageSrc="/auth/signup.jpg"
            alternateText="Already have an account?"
            alternateHref="/signin"
            alternateLabel="Sign In"
        >
            <SignUpForm />
        </AuthLayout>
    )
}
