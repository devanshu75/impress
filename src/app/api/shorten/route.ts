import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const originalUrl = body?.url as string | undefined;

    if (!originalUrl) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`,
        {
          method: "GET",
          signal: AbortSignal.timeout(3500),
        }
      );

      if (response.ok) {
        const shortUrl = await response.text();
        if (shortUrl && shortUrl.startsWith("http")) {
          return NextResponse.json({ shortUrl: shortUrl.trim() });
        }
      }
    } catch (apiErr) {
      console.warn("[api/shorten] Remote shortener fallback:", apiErr);
    }

    // Fallback gracefully to original short route URL
    return NextResponse.json({ shortUrl: originalUrl });
  } catch (error) {
    console.error("[api/shorten] Error:", error);
    return NextResponse.json({ error: "Shortener failed" }, { status: 500 });
  }
}
