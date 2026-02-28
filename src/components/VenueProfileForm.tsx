"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Limits = {
  maxPhotos: number;
  maxVideos: number;
  maxDescriptionChars: number;
  maxCustomSections?: number;
};

type VenueRow = {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  regionId: string | null;
  city: string | null;
  address: string | null;
  state: string | null;
  zip: string | null;
  website: string | null;
  phone: string | null;
  contactEmail: string | null;
  capacityMin: number | null;
  capacityMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  priceNotes: string | null;
  photoUrls: string[];
  videoUrls: string[];
  customSections: { title: string; body: string }[];
  socialLinks: Record<string, string>;
  specialOffers: string | null;
};

const REGIONS = [
  "bay-area", "central-coast", "central-valley", "desert", "inland-empire",
  "los-angeles", "north-coast", "orange-county", "san-diego", "wine-country",
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

export function VenueProfileForm({
  venue,
  selectedStyleIds,
  limits,
  tier,
}: {
  venue: VenueRow;
  selectedStyleIds: string[];
  limits: Limits;
  tier: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>(venue.photoUrls.length ? venue.photoUrls : [""]);
  const [videoUrls, setVideoUrls] = useState<string[]>(venue.videoUrls.length ? venue.videoUrls : limits.maxVideos ? [""] : []);
  const [customSections, setCustomSections] = useState(venue.customSections.length ? venue.customSections : limits.maxCustomSections ? [{ title: "", body: "" }] : []);

  function addPhoto() {
    if (photoUrls.length >= limits.maxPhotos) return;
    setPhotoUrls([...photoUrls, ""]);
  }
  function removePhoto(i: number) {
    setPhotoUrls(photoUrls.filter((_, j) => j !== i));
  }
  function addVideo() {
    if (videoUrls.length >= limits.maxVideos) return;
    setVideoUrls([...videoUrls, ""]);
  }
  function removeVideo(i: number) {
    setVideoUrls(videoUrls.filter((_, j) => j !== i));
  }
  function addCustomSection() {
    if ((limits.maxCustomSections ?? 0) <= customSections.length) return;
    setCustomSections([...customSections, { title: "", body: "" }]);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const photos = (fd.getAll("photoUrls") as string[]).map((s) => s.trim()).filter(Boolean);
    if (photos.length > limits.maxPhotos) {
      setError(`Maximum ${limits.maxPhotos} photos for your plan.`);
      setSaving(false);
      return;
    }
    const videos = (fd.getAll("videoUrls") as string[]).map((s) => s.trim()).filter(Boolean);
    if (videos.length > limits.maxVideos) {
      setError(`Maximum ${limits.maxVideos} videos for your plan.`);
      setSaving(false);
      return;
    }
    const desc = (fd.get("description") as string) ?? "";
    if (desc.length > limits.maxDescriptionChars) {
      setError(`Description must be ${limits.maxDescriptionChars} characters or fewer.`);
      setSaving(false);
      return;
    }
    const sections: { title: string; body: string }[] = [];
    const titles = fd.getAll("csTitle") as string[];
    const bodies = fd.getAll("csBody") as string[];
    for (let i = 0; i < Math.min(titles.length, limits.maxCustomSections ?? 0); i++) {
      if (titles[i]?.trim() || bodies[i]?.trim()) {
        sections.push({ title: titles[i]?.trim() ?? "", body: bodies[i]?.trim() ?? "" });
      }
    }
    const body = {
      name: fd.get("name"),
      tagline: fd.get("tagline"),
      description: fd.get("description"),
      regionId: fd.get("regionId"),
      city: fd.get("city"),
      address: fd.get("address"),
      zip: fd.get("zip"),
      website: fd.get("website") || null,
      phone: fd.get("phone") || null,
      contactEmail: fd.get("contactEmail") || null,
      capacityMin: fd.get("capacityMin") ? parseInt(String(fd.get("capacityMin")), 10) : null,
      capacityMax: fd.get("capacityMax") ? parseInt(String(fd.get("capacityMax")), 10) : null,
      priceMin: fd.get("priceMin") ? parseInt(String(fd.get("priceMin")).replace(/\D/g, ""), 10) : null,
      priceMax: fd.get("priceMax") ? parseInt(String(fd.get("priceMax")).replace(/\D/g, ""), 10) : null,
      priceNotes: fd.get("priceNotes") || null,
      photoUrls: photos,
      videoUrls: videos,
      customSections: sections,
      socialLinks: {
        instagram: (fd.get("instagram") as string)?.trim() || undefined,
        facebook: (fd.get("facebook") as string)?.trim() || undefined,
      },
      specialOffers: fd.get("specialOffers") || null,
      styleIds: fd.getAll("styleIds") as string[],
    };
    const res = await fetch("/api/venue/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? "Could not save.");
      setSaving(false);
      return;
    }
    router.refresh();
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Basic info</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="label">Venue name *</label>
            <input id="name" name="name" type="text" required defaultValue={venue.name} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="tagline" className="label">Tagline</label>
            <input id="tagline" name="tagline" type="text" defaultValue={venue.tagline ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="description" className="label">Description ({limits.maxDescriptionChars} chars max)</label>
            <textarea id="description" name="description" maxLength={limits.maxDescriptionChars} rows={5} defaultValue={venue.description ?? ""} className="input mt-1" />
            <p className="mt-1 text-xs text-stone-500">Upgrade your plan for a longer description.</p>
          </div>
          <div>
            <label htmlFor="regionId" className="label">Region *</label>
            <select id="regionId" name="regionId" required defaultValue={venue.regionId ?? ""} className="input mt-1">
              <option value="">Select region</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="label">City</label>
              <input id="city" name="city" type="text" defaultValue={venue.city ?? ""} className="input mt-1" />
            </div>
            <div>
              <label htmlFor="zip" className="label">ZIP</label>
              <input id="zip" name="zip" type="text" defaultValue={venue.zip ?? ""} className="input mt-1" />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="label">Address (optional)</label>
            <input id="address" name="address" type="text" defaultValue={venue.address ?? ""} className="input mt-1" />
          </div>
          <div>
            <label className="label">Style (at least one)</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <label key={s.id} className="flex items-center gap-2 rounded border border-stone-300 px-3 py-2 text-sm">
                  <input type="checkbox" name="styleIds" value={s.id} defaultChecked={selectedStyleIds.includes(s.id)} className="rounded" />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Capacity & pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="capacityMin" className="label">Min capacity</label>
            <input id="capacityMin" name="capacityMin" type="number" min={1} defaultValue={venue.capacityMin ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="capacityMax" className="label">Max capacity</label>
            <input id="capacityMax" name="capacityMax" type="number" min={1} defaultValue={venue.capacityMax ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="priceMin" className="label">Price from ($)</label>
            <input id="priceMin" name="priceMin" type="number" min={0} defaultValue={venue.priceMin ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="priceMax" className="label">Price to ($)</label>
            <input id="priceMax" name="priceMax" type="number" min={0} defaultValue={venue.priceMax ?? ""} className="input mt-1" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="priceNotes" className="label">Price notes</label>
            <input id="priceNotes" name="priceNotes" type="text" defaultValue={venue.priceNotes ?? ""} className="input mt-1" placeholder="e.g. Varies by season" />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Photos ({photoUrls.filter(Boolean).length} / {limits.maxPhotos})</h2>
        <p className="mt-1 text-sm text-stone-500">Direct image URLs. One per line or field.</p>
        <div className="mt-4 space-y-2">
          {photoUrls.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input name="photoUrls" type="url" defaultValue={url} className="input flex-1" placeholder="https://..." />
              <button type="button" onClick={() => removePhoto(i)} className="btn-secondary shrink-0">Remove</button>
            </div>
          ))}
          {photoUrls.length < limits.maxPhotos && (
            <button type="button" onClick={addPhoto} className="btn-secondary">Add photo</button>
          )}
        </div>
      </div>

      {limits.maxVideos > 0 && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-stone-800">Videos ({videoUrls.filter(Boolean).length} / {limits.maxVideos})</h2>
          <div className="mt-4 space-y-2">
            {videoUrls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input name="videoUrls" type="url" defaultValue={url} className="input flex-1" placeholder="https://youtube.com/..." />
                <button type="button" onClick={() => removeVideo(i)} className="btn-secondary shrink-0">Remove</button>
              </div>
            ))}
            {videoUrls.length < limits.maxVideos && (
              <button type="button" onClick={addVideo} className="btn-secondary">Add video</button>
            )}
          </div>
        </div>
      )}

      {(limits.maxCustomSections ?? 0) > 0 && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-stone-800">Custom sections</h2>
          {customSections.map((sec, i) => (
            <div key={i} className="mt-4 space-y-2">
              <input name="csTitle" type="text" defaultValue={sec.title} className="input" placeholder="Section title" />
              <textarea name="csBody" rows={3} defaultValue={sec.body} className="input" placeholder="Content" />
            </div>
          ))}
          {(limits.maxCustomSections ?? 0) > customSections.length && (
            <button type="button" onClick={addCustomSection} className="btn-secondary mt-4">Add section</button>
          )}
        </div>
      )}

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Contact & links</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="website" className="label">Website</label>
            <input id="website" name="website" type="url" defaultValue={venue.website ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="phone" className="label">Phone</label>
            <input id="phone" name="phone" type="tel" defaultValue={venue.phone ?? ""} className="input mt-1" />
          </div>
          <div>
            <label htmlFor="contactEmail" className="label">Email for lead notifications</label>
            <input id="contactEmail" name="contactEmail" type="email" defaultValue={venue.contactEmail ?? ""} className="input mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="instagram" className="label">Instagram URL</label>
              <input id="instagram" name="instagram" type="url" defaultValue={venue.socialLinks?.instagram ?? ""} className="input mt-1" />
            </div>
            <div>
              <label htmlFor="facebook" className="label">Facebook URL</label>
              <input id="facebook" name="facebook" type="url" defaultValue={venue.socialLinks?.facebook ?? ""} className="input mt-1" />
            </div>
          </div>
          <div>
            <label htmlFor="specialOffers" className="label">Special offers (optional)</label>
            <textarea id="specialOffers" name="specialOffers" rows={2} defaultValue={venue.specialOffers ?? ""} className="input mt-1" />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
