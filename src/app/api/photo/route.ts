import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE_BLOB_HOST = ".private.blob.vercel-storage.com";

/** Stream a private Vercel Blob image so it can be used in img src. */
export async function GET(req: Request) {
  try {
    const urlParam = new URL(req.url).searchParams.get("url");
    if (!urlParam) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    let parsed: URL;
    try {
      parsed = new URL(decodeURIComponent(urlParam));
    } catch {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }
    if (!parsed.hostname.endsWith(PRIVATE_BLOB_HOST) || parsed.protocol !== "https:") {
      return NextResponse.json({ error: "Invalid photo url" }, { status: 400 });
    }
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }
    const blobRes = await fetch(parsed.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!blobRes.ok) {
      return new NextResponse("Not found", { status: 404 });
    }
    const contentType = blobRes.headers.get("content-type") ?? "image/jpeg";
    return new NextResponse(blobRes.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("Photo proxy error:", e);
    return NextResponse.json({ error: "Failed to load photo" }, { status: 500 });
  }
}
