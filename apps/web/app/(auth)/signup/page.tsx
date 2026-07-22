import { redirect } from "next/navigation"
import { SignUpScreen } from "@/features/auth/components/sign-up-screen"
import { getOAuthErrorMessage } from "@/features/auth/lib/errors"
import { getServerSession } from "@/lib/auth-server"

type SignUpPageProps = {
    searchParams: Promise<{ error?: string | string[] }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
    const [params, session] = await Promise.all([
        searchParams,
        getServerSession(),
    ])
    if (session?.user.emailVerified) redirect("/")

    return <SignUpScreen oauthError={getOAuthErrorMessage(params.error)} />
}
