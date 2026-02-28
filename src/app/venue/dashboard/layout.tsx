import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function VenueDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string; venueId?: string; venueStatus?: string } | undefined;
  if (!session || !user?.id) {
    redirect("/venue/login?callbackUrl=/venue/dashboard");
  }
  if (user.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <nav className="dashboard-nav w-full shrink-0 md:w-56">
          <ul className="flex flex-wrap gap-2 border-b border-stone-200 pb-4 md:flex-col md:border-0 md:pb-0">
            <li>
              <Link href="/venue/dashboard" className="block rounded-lg border border-transparent px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/venue/dashboard/profile" className="block rounded-lg border border-transparent px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Edit profile
              </Link>
            </li>
            <li>
              <Link href="/venue/dashboard/leads" className="block rounded-lg border border-transparent px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Inquiries
              </Link>
            </li>
            <li>
              <Link href="/venue/dashboard/billing" className="block rounded-lg border border-transparent px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">
                Billing
              </Link>
            </li>
            <li>
              <Link href="/help" className="block rounded-lg border border-transparent px-3 py-2 text-sm text-stone-500 hover:bg-stone-100">
                Help
              </Link>
            </li>
          </ul>
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
