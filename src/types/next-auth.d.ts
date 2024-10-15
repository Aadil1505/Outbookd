import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    role?: unknown
  }

  interface Session {
    user: {
      role?: unknown
    } & DefaultSession["user"]
  }
}