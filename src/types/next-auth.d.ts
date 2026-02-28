import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    role?: string;
    venueId?: string;
    venueStatus?: string;
    listingTier?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    venueId?: string;
    venueStatus?: string;
    listingTier?: string;
  }
}
