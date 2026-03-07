"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const REGIONS = [
  { id: "bay-area", name: "Bay Area" },
  { id: "central-coast", name: "Central Coast" },
  { id: "central-valley", name: "Central Valley" },
  { id: "desert", name: "Desert" },
  { id: "inland-empire", name: "Inland Empire" },
  { id: "los-angeles", name: "Los Angeles" },
  { id: "north-coast", name: "North Coast" },
  { id: "orange-county", name: "Orange County" },
  { id: "san-diego", name: "San Diego" },
  { id: "wine-country", name: "Wine Country" },
];

const STYLES = [
  { id: "vineyard", name: "Vineyard / Winery" },
  { id: "beach", name: "Beach / Coastal" },
  { id: "barn", name: "Barn / Ranch" },
  { id: "garden", name: "Garden" },
  { id: "estate", name: "Estate / Mansion" },
  { id: "hotel", name: "Hotel / Resort" },
  { id: "rustic", name: "Rustic" },
  { id: "modern", name: "Modern / Industrial" },
  { id: "lodge", name: "Lodge / Mountain" },
  { id: "historic", name: "Historic" },
  { id: "rooftop", name: "Rooftop" },
  { id: "other", name: "Other" },
];

export function VenueSignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (photoFiles.length < 8) {
      setError("Please upload at least 8 photos.");
      setLoading(false);
      return;
    }
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB - under Vercel 4.5MB limit
    const tooBig = photoFiles.find((f) => f.size > MAX_FILE_SIZE);
    if (tooBig) {
      setError("One or more photos are over 3MB. Please use smaller images (under 3MB each).");
      setLoading(false);
      return;
    }
    let photoUrls: string[];
    const toUpload = Math.min(photoFiles.length, 8);
    try {
      const urls: string[] = [];
      for (let i = 0; i < toUpload; i++) {
        setError(`Uploading photo ${i + 1} of ${toUpload}…`);
        const form = new FormData();
        form.append("photo", photoFiles[i]!);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        if (uploadRes.status === 413) {
          throw new Error(`Photo ${i + 1} is too large (max 3MB). Resize or use smaller images.`);
        }
        if (!uploadRes.ok) {
          const d = await uploadRes.json().catch(() => ({}));
          const msg = d.detail ? `${d.error}: ${d.detail}` : (d.error || "Upload failed");
          throw new Error(`Photo ${i + 1}: ${msg}`);
        }
        const data = await uploadRes.json();
        if (data.url) urls.push(data.url);
      }
      setError("");
      photoUrls = urls;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed. Use images under 3MB each.");
      setLoading(false);
      return;
    }
    const styleIds = fd.getAll("styleIds") as string[];
    if (styleIds.length === 0) {
      setError("Please select at least one style.");
      setLoading(false);
      return;
    }
    const body = {
      email: fd.get("email"),
      password: fd.get("password"),
      name: fd.get("name"),
      venueName: fd.get("venueName"),
      tagline: fd.get("tagline"),
      description: fd.get("description"),
      regionId: fd.get("regionId"),
      city: fd.get("city"),
      address: fd.get("address"),
      state: "CA",
      zip: fd.get("zip"),
      website: fd.get("website"),
      phone: fd.get("phone"),
      contactEmail: fd.get("contactEmail") || fd.get("email"),
      capacityMin: fd.get("capacityMin") ? parseInt(String(fd.get("capacityMin")), 10) : null,
      capacityMax: fd.get("capacityMax") ? parseInt(String(fd.get("capacityMax")), 10) : null,
      priceMin: fd.get("priceMin") ? parseInt(String(fd.get("priceMin")).replace(/\D/g, ""), 10) : null,
      priceMax: fd.get("priceMax") ? parseInt(String(fd.get("priceMax")).replace(/\D/g, ""), 10) : null,
      photoUrls,
      styleIds,
    };
    const res = await fetch("/api/venue/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? "Signup failed. Please try again.");
      setLoading(false);
      return;
    }
    router.push("/venue/dashboard?welcome=1");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-stone-800">Your account</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" name="email" type="email" required className="input mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input id="password" name="password" type="password" required minLength={8} className="input mt-1" />
            <p className="mt-1 text-xs text-stone-500">At least 8 characters.</p>
          </div>
          <div>
            <label htmlFor="name" className="label">Your name</label>
            <input id="name" name="name" type="text" className="input mt-1" placeholder="Jane Smith" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-stone-800">Venue details</h2>
        <p className="mt-1 text-sm text-stone-500">Your listing will be reviewed within 48 hours. You can edit everything after approval.</p>
        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="venueName" className="label">Venue name *</label>
            <input id="venueName" name="venueName" type="text" required className="input mt-1" />
          </div>
          <div>
            <label htmlFor="tagline" className="label">Short tagline (optional)</label>
            <input id="tagline" name="tagline" type="text" maxLength={200} className="input mt-1" placeholder="A stunning vineyard in Napa" />
          </div>
          <div>
            <label htmlFor="description" className="label">Description (max 300 characters for free tier) *</label>
            <textarea id="description" name="description" required maxLength={300} rows={4} className="input mt-1" />
            <p className="mt-1 text-xs text-stone-500">You can add more after upgrading.</p>
          </div>
          <div>
            <label htmlFor="regionId" className="label">Region *</label>
            <select id="regionId" name="regionId" required className="input mt-1">
              <option value="">Select region</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="city" className="label">City</label>
              <input id="city" name="city" type="text" className="input mt-1" />
            </div>
            <div>
              <label htmlFor="zip" className="label">ZIP</label>
              <input id="zip" name="zip" type="text" className="input mt-1" />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="label">Address (optional, for display)</label>
            <input id="address" name="address" type="text" className="input mt-1" />
          </div>
          <div>
            <label className="label">Style (select at least one) *</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <label key={s.id} className="flex items-center gap-2 rounded border border-stone-300 px-3 py-2 text-sm">
                  <input type="checkbox" name="styleIds" value={s.id} className="rounded" />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="capacityMin" className="label">Min capacity</label>
              <input id="capacityMin" name="capacityMin" type="number" min={1} className="input mt-1" />
            </div>
            <div>
              <label htmlFor="capacityMax" className="label">Max capacity</label>
              <input id="capacityMax" name="capacityMax" type="number" min={1} className="input mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="priceMin" className="label">Price from ($)</label>
              <input id="priceMin" name="priceMin" type="number" min={0} className="input mt-1" placeholder="5000" />
            </div>
            <div>
              <label htmlFor="priceMax" className="label">Price to ($)</label>
              <input id="priceMax" name="priceMax" type="number" min={0} className="input mt-1" placeholder="15000" />
            </div>
          </div>
          <div>
            <label htmlFor="website" className="label">Website</label>
            <input id="website" name="website" type="url" className="input mt-1" placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="phone" className="label">Phone</label>
            <input id="phone" name="phone" type="tel" className="input mt-1" />
          </div>
          <div>
            <label htmlFor="contactEmail" className="label">Contact email for leads</label>
            <input id="contactEmail" name="contactEmail" type="email" className="input mt-1" placeholder="Same as account email if blank" />
          </div>
          <div>
            <label className="label">Photos (upload at least 8) *</label>
            <p className="mt-1 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
              Use images <strong>under 3MB each</strong> or uploads may fail. Resize large photos on your phone or computer first.
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="input mt-2"
              onChange={(e) => setPhotoFiles(Array.from(e.target.files ?? []))}
            />
            <p className="mt-1 text-xs text-stone-500">
              {photoFiles.length} selected. JPEG, PNG, WebP or GIF. You can change these in your dashboard after approval.
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Creating account…" : "Create account & submit for review"}
      </button>
    </form>
  );
}
