import { db } from "@/lib/db";
import { venues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AdminVenueQueue } from "@/components/AdminVenueQueue";

export default async function AdminPage() {
  const pending = await db.select().from(venues).where(eq(venues.status, "pending")).orderBy(venues.createdAt);
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-800">Venue approval queue</h1>
      <p className="mt-1 text-stone-600">
        Approve or reject applications. Venues manage their own profiles—you only control listing status.
      </p>
      <AdminVenueQueue pending={pending} />
    </div>
  );
}
