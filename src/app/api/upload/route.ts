import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB per file
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Upload not configured" }, { status: 503 });
    }
    const formData = await req.formData();
    const files = formData.getAll("photos") as File[];
    if (!files?.length) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file?.size || file.size > MAX_SIZE) {
        return NextResponse.json({ error: "File too large or invalid (max 5MB each)" }, { status: 400 });
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type (use JPEG, PNG, WebP, GIF)" }, { status: 400 });
      }
      const ext = file.name.split(".").pop() || "jpg";
      const name = `venues/${Date.now()}-${i}.${ext}`;
      const blob = await put(name, file, { access: "public" });
      urls.push(blob.url);
    }
    return NextResponse.json({ urls });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
