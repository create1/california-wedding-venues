"use client";

import { useRouter } from "next/navigation";

type Venue = {
  id: string;
  name: string;
  slug: string;
  status: string;
  regionId: string | null;
  city: string | null;
  description: string | null;
  createdAt: Date;
};

export function AdminVenueQueue({ pending }: { pending: Venue[] }) {
  const router = useRouter();

  async function approve(venueId: string) {
    await fetch("/api/admin/venue/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ venueId }) });
    router.refresh();
  }
  async function reject(venueId: string, reason?: string) {
    await fetch("/api/admin/venue/reject", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ venueId, reason }) });
    router.refresh();
  }

  if (pending.length === 0) {
    return <p className="mt-6 text-stone-500">No pending venues.</p>;
  }

  return (
    <ul className="mt-6 space-y-4">
      {pending.map((v) => (
        <li key={v.id} className="card p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-medium text-stone-800">{v.name}</p>
              <p className="text-sm text-stone-500">{v.regionId} · {v.city ?? "—"} · {new Date(v.createdAt).toLocaleDateString()}</p>
              {v.description && <p className="mt-2 line-clamp-2 text-sm text-stone-600">{v.description}</p>}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => approve(v.id)} className="btn-primary text-sm">Approve</button>
              <button type="button" onClick={() => reject(v.id)} className="btn-secondary text-sm">Reject</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
