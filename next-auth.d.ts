import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      /** The user's postal address. */
      id: string
      name?: string | null
      email?: string | null
      accessToken: string
      level?: number
    }
  }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        
        id: string
        accessToken: string
        // id: string
        email?: string | null
        // image?: string | null
        name?: string | null
        
        // emailVerified: Date | null
    }
}