import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Blob SDK works reliably in Node

// Stay under Vercel 4.5MB request limit (multipart overhead): max 3MB per file
const MAX_SIZE = 3 * 1024 * 1024; // 3 MB per file
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
      return NextResponse.json({ error: "File too large (max 3MB per photo)" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type (use JPEG, PNG, WebP, GIF)" }, { status: 400 });
    }
    const ext = file.name.split(".").pop() || "jpg";
    const name = `venues/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    // Use arrayBuffer for serverless compatibility (File can be tricky in Edge)
    const body = await file.arrayBuffer();
    const blob = await put(name, body, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed", detail: message }, { status: 500 });
  }
}
