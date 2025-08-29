import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials

                if (!email || !password) {
                    return null
                }

                await dbConnect()

                const user = await User.findOne({ email })

                if (!user) {
                    return null
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password)

                if (!isPasswordCorrect) {
                    return null
                }

                return user
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }