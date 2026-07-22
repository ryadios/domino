"use client"

import { useState } from "react"
import { AuthLayout } from "./auth-layout"
import { SignInForm } from "./sign-in-form"
import { VerificationPending } from "./verification-pending"

type SignInScreenProps = {
    oauthError?: string | null
}

export function SignInScreen({ oauthError }: SignInScreenProps) {
    const [verificationEmail, setVerificationEmail] = useState<string | null>(
        null,
    )

    return (
        <AuthLayout
            title={verificationEmail ? "Verify Your Email" : "Welcome Back"}
            description={
                verificationEmail ? (
                    <>
                        Send a verification link to{" "}
                        <span className="break-all font-medium text-foreground/90">
                            {verificationEmail}
                        </span>{" "}
                        to continue.
                    </>
                ) : (
                    "Sign in to your account and continue editing with AI"
                )
            }
            imageSrc="/auth/signin.jpg"
            alternateText={
                verificationEmail
                    ? "Already verified?"
                    : "Don’t have an account yet?"
            }
            alternateHref={verificationEmail ? "/signin" : "/signup"}
            alternateLabel={verificationEmail ? "Sign In" : "Create Account"}
            oauthError={oauthError}
            showGoogle={!verificationEmail}
        >
            {verificationEmail ? (
                <VerificationPending
                    email={verificationEmail}
                    onBack={() => setVerificationEmail(null)}
                />
            ) : (
                <SignInForm onVerificationRequired={setVerificationEmail} />
            )}
        </AuthLayout>
    )
}
