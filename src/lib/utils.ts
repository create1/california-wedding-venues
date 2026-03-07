import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function nanoid(size = 21): string {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  let id = "";
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  for (let i = 0; i < size; i++) id += alphabet[bytes[i]! % 36];
  return id;
}

export function formatPrice(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

/** Use proxy for private Vercel Blob URLs so they can be displayed in img src. */
export function getPhotoDisplayUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith(".private.blob.vercel-storage.com") && u.protocol === "https:") {
      return `/api/photo?url=${encodeURIComponent(url)}`;
    }
  } catch {
    // ignore
  }
  return url;
}

export function getTierLimit(tier: string, key: keyof typeof import("./constants").TIER_LIMITS.free) {
  const limits = require("./constants").TIER_LIMITS as Record<string, Record<string, number | boolean>>;
  const t = limits[tier] ?? limits.free;
  return t[key];
}
