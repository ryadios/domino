"use client"

import { useState } from "react"
import { AuthLayout } from "./auth-layout"
import { SignUpForm } from "./sign-up-form"
import { VerificationPending } from "./verification-pending"

type SignUpScreenProps = {
    oauthError?: string | null
}

type VerificationState = {
    email: string
    verificationRequested: boolean
}

export function SignUpScreen({ oauthError }: SignUpScreenProps) {
    const [verification, setVerification] =
        useState<VerificationState | null>(null)

    return (
        <AuthLayout
            title={verification ? "Check Your Inbox" : "Get Started"}
            description={
                verification ? (
                    <>
                        Check{" "}
                        <span className="break-all font-medium text-foreground/90">
                            {verification.email}
                        </span>{" "}
                        for a verification link. If it doesn&apos;t arrive, send
                        another below.
                    </>
                ) : (
                    "Create your account and start editing with AI"
                )
            }
            imageSrc="/auth/signup.jpg"
            alternateText="Already have an account?"
            alternateHref="/signin"
            alternateLabel="Sign In"
            oauthError={oauthError}
            showGoogle={!verification}
        >
            {verification ? (
                <VerificationPending
                    email={verification.email}
                    initiallyRequested={verification.verificationRequested}
                    onBack={() => setVerification(null)}
                />
            ) : (
                <SignUpForm
                    onVerificationRequired={(email, verificationRequested) =>
                        setVerification({ email, verificationRequested })
                    }
                />
            )}
        </AuthLayout>
    )
}
