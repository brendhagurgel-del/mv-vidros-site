import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub && session.user) {
        ;(session.user as typeof session.user & { id: string }).id = token.sub
      }
      return session
    },
  },
})

export { handlers as GET, handlers as POST }
