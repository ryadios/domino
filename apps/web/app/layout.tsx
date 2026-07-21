import { Toaster } from "@domino/ui/components/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Domino",
    description: "AI Automation Workflow",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} dark`}>
            <body>
                <Toaster />
                <MotionProvider>{children}</MotionProvider>
            </body>
        </html>
    )
}
