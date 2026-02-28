import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = user?.role === "admin" || (adminEmail && user?.email === adminEmail);
  if (!session || !isAdmin) {
    redirect("/venue/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-8 flex gap-4 border-b border-stone-200 pb-4">
        <Link href="/admin" className="text-stone-600 hover:text-sage-700">Queue</Link>
        <Link href="/help" className="text-stone-600 hover:text-sage-700">Help</Link>
      </nav>
      {children}
    </div>
  );
}
