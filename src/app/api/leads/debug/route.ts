import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await list();
    return NextResponse.json({
      count: result.blobs.length,
      blobs: result.blobs.map((b) => ({
        pathname: b.pathname,
        url: b.url,
        downloadUrl: b.downloadUrl,
        size: b.size,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
