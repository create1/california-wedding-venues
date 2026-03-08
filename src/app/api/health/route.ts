import { NextResponse } from "next/server";

/** Lightweight health check; does not import db or auth. Use to confirm app is running. */
export async function GET() {
  const hasDatabase = Boolean(process.env.DATABASE_URL);
  const hasNextAuth = Boolean(process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL);
  const ok = hasDatabase && hasNextAuth;
  return NextResponse.json(
    {
      ok,
      env: {
        hasDatabase,
        hasNextAuth,
      },
    },
    { status: ok ? 200 : 503 }
  );
}
