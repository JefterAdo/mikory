import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extension du type User par défaut
   */
  interface User {
    id: string
    role: string
    name?: string | null
    email?: string | null
  }

  /**
   * Extension du type Session par défaut
   */
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Extension du type JWT par défaut
   */
  interface JWT {
    id: string
    role: string
  }
}
