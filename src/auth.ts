import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(db),
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "client",
        }
      },
    })
  ],
  pages: {
    signIn: "/login",
  },
})