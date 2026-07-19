import { Button } from "@domino/ui/components/button"
import { Input } from "@domino/ui/components/input"
import { ArrowLeft01Icon, EyeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"

const artwork =
    "https://images.unsplash.com/photo-1773761193222-4ad3b5ac23dc?auto=format&fit=crop&fm=jpg&q=85&w=2400"

export default function Page() {
    return (
        <main className="grid min-h-svh bg-background text-foreground md:grid-cols-2">
            <section className="flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-md space-y-6">
                    <a
                        href="/"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                        Home
                    </a>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-light tracking-tighter md:text-5xl">
                            Get Started
                        </h1>
                        <p className="text-muted-foreground">
                            Create your account and start editing with AI
                        </p>
                    </div>

                    <div className="space-y-5">
                        <label
                            htmlFor="name"
                            className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
                        >
                            Full Name
                            <Input
                                id="name"
                                className="h-12 px-4"
                                placeholder="Enter your full name"
                            />
                        </label>

                        <label
                            htmlFor="email"
                            className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
                        >
                            Email Address
                            <Input
                                id="email"
                                type="email"
                                className="h-12 px-4"
                                placeholder="Enter your email address"
                            />
                        </label>

                        <label
                            htmlFor="password"
                            className="flex flex-col gap-2 text-sm font-medium text-muted-foreground"
                        >
                            Password
                            <span className="relative block">
                                <Input
                                    id="password"
                                    type="password"
                                    className="h-12 px-4 pr-12"
                                    placeholder="Create a password"
                                />
                                <HugeiconsIcon
                                    icon={EyeIcon}
                                    size={20}
                                    strokeWidth={1.5}
                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
                                />
                            </span>
                        </label>

                        <Button type="button" className="h-12 w-full">
                            Create Account
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        Or continue with
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="h-12 w-full gap-3"
                    >
                        <Image
                            src="/google.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <a href="/" className="text-accent hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </section>

            <section className="relative hidden min-h-svh p-4 md:block">
                <div
                    className="absolute inset-4 rounded-3xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${artwork})` }}
                />

                <div className="absolute inset-x-8 bottom-8 flex justify-center gap-4">
                    <article className="flex w-64 items-start gap-3 rounded-3xl border border-white/10 bg-card/40 p-5 text-card-foreground backdrop-blur-xl">
                        <span
                            role="img"
                            aria-label="Dhruv"
                            className="size-10 shrink-0 rounded-2xl bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url(https://unavatar.io/twitter/dhruvtwt_)",
                            }}
                        />
                        <div className="text-sm leading-snug">
                            <p className="font-medium">Dhruv</p>
                            <p className="text-muted-foreground">@dhruvtwt_</p>
                            <p className="mt-1 text-foreground/80">
                                Removed my image background in seconds. The AI
                                tools are incredibly fast and accurate.
                            </p>
                        </div>
                    </article>

                    <article className="hidden w-64 items-start gap-3 rounded-3xl border border-white/10 bg-card/40 p-5 text-card-foreground backdrop-blur-xl xl:flex">
                        <span
                            role="img"
                            aria-label="Athrix"
                            className="size-10 shrink-0 rounded-2xl bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url(https://unavatar.io/twitter/athrix_codes)",
                            }}
                        />
                        <div className="text-sm leading-snug">
                            <p className="font-medium">Athrix</p>
                            <p className="text-muted-foreground">
                                @athrix_codes
                            </p>
                            <p className="mt-1 text-foreground/80">
                                Finally an editor that doesn&apos;t slow me
                                down. The AI extend feature is a game changer.
                            </p>
                        </div>
                    </article>

                    <article className="hidden w-64 items-start gap-3 rounded-3xl border border-white/10 bg-card/40 p-5 text-card-foreground backdrop-blur-xl 2xl:flex">
                        <span
                            role="img"
                            aria-label="Sahil"
                            className="size-10 shrink-0 rounded-2xl bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url(https://unavatar.io/twitter/sahilcodex)",
                            }}
                        />
                        <div className="text-sm leading-snug">
                            <p className="font-medium">Sahil</p>
                            <p className="text-muted-foreground">@sahilcodex</p>
                            <p className="mt-1 text-foreground/80">
                                Clean interface, powerful tools. Been using it
                                for all my product photography.
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}
