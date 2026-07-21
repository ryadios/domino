const oauthErrorMessages: Record<string, string> = {
    access_denied: "Google sign-in was cancelled.",
    account_not_linked:
        "An account already exists with this email. Use the original sign-in method.",
    no_code: "Google sign-in could not be completed. Please try again.",
    signup_disabled: "New account registration is currently unavailable.",
}

export function getOAuthErrorMessage(error: string | string[] | undefined) {
    const code = Array.isArray(error) ? error[0] : error
    if (!code) return null

    return (
        oauthErrorMessages[code] ??
        "Google sign-in could not be completed. Please try again."
    )
}
