import { redirect } from "next/navigation"
import { SignInScreen } from "@/features/auth/components/sign-in-screen"
import { getOAuthErrorMessage } from "@/features/auth/lib/errors"
import { getServerSession } from "@/lib/auth-server"

type SignInPageProps = {
    searchParams: Promise<{ error?: string | string[] }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const [params, session] = await Promise.all([
        searchParams,
        getServerSession(),
    ])
    if (session?.user.emailVerified) redirect("/")

    return <SignInScreen oauthError={getOAuthErrorMessage(params.error)} />
}
