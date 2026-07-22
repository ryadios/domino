import nodemailer from "nodemailer"
import { env } from "./env"

type VerificationEmail = {
    to: string
    url: string
}

function escapeHtml(value: string) {
    return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
})

export async function sendVerificationEmail({
    to,
    url,
}: VerificationEmail) {
    await transporter.sendMail({
        from: `Domino <${env.GMAIL_USER}>`,
        to,
        subject: "Verify your Domino email",
        text: `Verify your email address to finish creating your Domino account:\n\n${url}\n\nThis link expires in one hour. If you did not request this email, you can ignore it.`,
        html: `<p>Verify your email address to finish creating your Domino account.</p><p><a href="${escapeHtml(url)}">Verify email</a></p><p>This link expires in one hour. If you did not request this email, you can ignore it.</p>`,
    })
}
