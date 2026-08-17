import { NextResponse } from "next/server";

/** Converts a stored `data:image/...;base64,...` URL into a real image HTTP response. */
export function dataUrlResponse(dataUrl: string | null): NextResponse {
  if (!dataUrl) return new NextResponse(null, { status: 404 });
  const match = dataUrl.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!match) return new NextResponse(null, { status: 404 });
  const [, contentType, base64] = match;
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
