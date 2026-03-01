import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// Keep under Vercel 4.5MB request limit: one file per request, max 4MB
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB per file
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Upload not configured. Add BLOB_READ_WRITE_TOKEN in Vercel." }, { status: 503 });
    }
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    if (!file?.size) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 4MB per photo)" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type (use JPEG, PNG, WebP, GIF)" }, { status: 400 });
    }
    const ext = file.name.split(".").pop() || "jpg";
    const name = `venues/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    const blob = await put(name, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
