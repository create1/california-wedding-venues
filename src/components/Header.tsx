import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-xl font-semibold text-sage-800">
          California Wedding Venues
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/venues" className="text-sm text-stone-600 hover:text-sage-700">
            Browse Venues
          </Link>
          <Link href="/help" className="text-sm text-stone-600 hover:text-sage-700">
            Help
          </Link>
          {session?.user ? (
            <>
              {(session.user as { role: string }).role === "admin" ? (
                <Link href="/admin" className="btn-secondary text-sm">
                  Admin
                </Link>
              ) : (
                <Link href="/venue/dashboard" className="btn-secondary text-sm">
                  Dashboard
                </Link>
              )}
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="text-sm text-stone-500 hover:text-stone-700">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/venue/login" className="text-sm text-stone-600 hover:text-sage-700">
                Venue login
              </Link>
              <Link href="/venue/signup" className="btn-primary text-sm">
                List your venue
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
