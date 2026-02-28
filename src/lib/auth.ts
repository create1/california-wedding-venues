import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db, users, venues } from "./db";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const [user] = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        if (!user || !user.passwordHash) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
        const [venue] = user.venueId
          ? await db.select().from(venues).where(eq(venues.id, user.venueId)).limit(1)
          : [null];
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          venueId: user.venueId ?? undefined,
          venueStatus: venue?.status,
          listingTier: venue?.listingTier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.venueId = user.venueId;
        token.venueStatus = user.venueStatus;
        token.listingTier = user.listingTier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { venueId?: string }).venueId = token.venueId as string | undefined;
        (session.user as { venueStatus?: string }).venueStatus = token.venueStatus as string | undefined;
        (session.user as { listingTier?: string }).listingTier = token.listingTier as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/venue/login",
    error: "/venue/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
