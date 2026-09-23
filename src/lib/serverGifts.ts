import fs from "fs";
import path from "path";
import os from "os";
import { FriendshipGift, DEFAULT_RULES } from "./types";
import { DEMO_GIFT } from "./storage";

const DATA_DIR =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === "production"
    ? path.join(os.tmpdir(), "amiverse_gifts")
    : path.join(process.cwd(), ".data");
const GIFTS_FILE = path.join(DATA_DIR, "gifts.json");

// In-memory cache map
const memoryCache = new Map<string, FriendshipGift>();
let initialized = false;

function ensureInitialized() {
  if (initialized) return;
  initialized = true;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(GIFTS_FILE)) {
      const raw = fs.readFileSync(GIFTS_FILE, "utf-8");
      const obj = JSON.parse(raw);
      for (const [key, val] of Object.entries(obj)) {
        memoryCache.set(key, val as FriendshipGift);
      }
    }
  } catch (err) {
    console.warn("[serverGifts] Initialization warning:", err);
  }
}

export async function getServerGift(id: string): Promise<FriendshipGift | null> {
  ensureInitialized();
  if (id === "demo") return DEMO_GIFT;
  if (memoryCache.has(id)) return memoryCache.get(id)!;

  // Try fetching from Bytebin persistent cloud storage
  try {
    const res = await fetch(`https://bytebin.lucko.me/${encodeURIComponent(id)}`, {
      headers: { "User-Agent": "amiverse-gift-sync" },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.recipientName || data.creatorName)) {
        memoryCache.set(id, data as FriendshipGift);
        return data as FriendshipGift;
      }
    }
  } catch (err) {
    // Pastes.dev fallback
    try {
      const res = await fetch(`https://api.pastes.dev/${encodeURIComponent(id)}`, {
        headers: { "User-Agent": "amiverse-gift-sync" },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.recipientName || data.creatorName)) {
          memoryCache.set(id, data as FriendshipGift);
          return data as FriendshipGift;
        }
      }
    } catch {}
  }

  return null;
}

export async function saveServerGift(gift: FriendshipGift): Promise<string | null> {
  ensureInitialized();
  memoryCache.set(gift.id, gift);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const record: Record<string, FriendshipGift> = {};
    for (const [k, v] of memoryCache.entries()) {
      record[k] = v;
    }
    fs.writeFileSync(GIFTS_FILE, JSON.stringify(record, null, 2), "utf-8");
  } catch (err) {
    // Might fail in read-only / serverless container filesystems
  }

  // Sync to Bytebin persistent cloud storage
  try {
    const res = await fetch("https://bytebin.lucko.me/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "amiverse-gift-sync",
      },
      body: JSON.stringify(gift),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.key) {
        memoryCache.set(data.key, gift);
        return data.key;
      }
    }
  } catch (err) {
    console.warn("[serverGifts] Bytebin sync error:", err);
  }

  return null;
}

