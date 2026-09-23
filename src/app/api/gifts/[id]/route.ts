import { NextResponse } from "next/server";
import { getServerGift } from "@/lib/serverGifts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing gift id" }, { status: 400 });
    }

    const gift = await getServerGift(id);
    if (!gift) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    return NextResponse.json({ gift });
  } catch (error) {
    console.error("[api/gifts/[id] GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve gift" },
      { status: 500 }
    );
  }
}
