import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"

import {db} from "@/lib/db"


export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session
    },
    jwt({ token }) {
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig
})