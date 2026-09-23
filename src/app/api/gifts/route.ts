import { NextResponse } from "next/server";
import { saveServerGift } from "@/lib/serverGifts";
import { FriendshipGift } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gift = body?.gift as FriendshipGift | undefined;

    if (!gift || !gift.id) {
      return NextResponse.json(
        { error: "Invalid gift payload" },
        { status: 400 }
      );
    }

    const cloudKey = await saveServerGift(gift);
    return NextResponse.json({ success: true, id: gift.id, cloudKey });
  } catch (error) {
    console.error("[api/gifts POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to store gift" },
      { status: 500 }
    );
  }
}
