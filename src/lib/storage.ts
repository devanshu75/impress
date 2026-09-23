import { FriendshipGift, DEFAULT_RULES } from "./types";
import LZString from "lz-string";

export const SAMPLE_PHOTOS = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    caption: "That golden hour where we laughed until our stomachs hurt 🌅",
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    caption: "Spontaneous iced coffee run with zero regrets ☕✨",
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80",
    caption: "Literally the chaos duo in our natural habitat 😂",
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80",
    caption: "Late night talks that healed things we never talked about 🌙",
  },
];

export const DEMO_GIFT: FriendshipGift = {
  id: "demo",
  creatorName: "Maya",
  recipientName: "Alex",
  friendshipDate: "2021-06-18",
  howWeMet: "We met in the hallway arguing over who stole the last chocolate muffin. 5 minutes later we were inseparable.",
  vibe: "chaos-duo",
  whyTheyMatter: "Because in a world that constantly moves too fast, being with you feels like exhaling. You pick up the phone at 2 AM, you never judge my questionable impulses, and you make ordinary days feel like a movie.",
  photos: SAMPLE_PHOTOS,
  puzzleDifficulty: "easy",
  puzzlePhotoIndex: 1,
  scratchPhotoIndex: 2,
  letter: "Dearest Alex,\n\nI was sitting today thinking about how rare it is to find someone whose weird matches your exact frequency. Thank you for showing up for the quiet Tuesdays just as fiercely as the chaotic weekends. Thank you for being the first person I want to text when something absurd happens.\n\nNo matter what city we end up in or how crazy life gets, you will always be my person. Forever grateful for you.\n\nWith all my love,\nMaya ♡",
  rules: DEFAULT_RULES,
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY_GIFTS = "amiverse_gifts_v1";
const STORAGE_KEY_DRAFT = "amiverse_creator_draft_v1";

export function getSavedGift(id: string): FriendshipGift | null {
  if (id === "demo") {
    return DEMO_GIFT;
  }
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_GIFTS);
    if (raw) {
      const parsed: Record<string, FriendshipGift> = JSON.parse(raw);
      if (parsed[id]) return parsed[id];
    }
  } catch (err) {
    console.warn("Failed to load gift from local storage:", err);
  }

  return null;
}

export function saveGift(gift: FriendshipGift): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GIFTS);
    const gifts: Record<string, FriendshipGift> = raw ? JSON.parse(raw) : {};
    gifts[gift.id] = gift;
    localStorage.setItem(STORAGE_KEY_GIFTS, JSON.stringify(gifts));
  } catch (err) {
    console.error("Failed to save gift:", err);
  }
}

export function saveCreatorDraft(draft: Partial<FriendshipGift>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
  } catch (err) {
    console.warn("Failed to save draft:", err);
  }
}

export function getCreatorDraft(): Partial<FriendshipGift> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read draft:", err);
  }
  return null;
}

export function clearCreatorDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_DRAFT);
}

export function giftToCompact(gift: FriendshipGift) {
  return {
    i: gift.id,
    c: gift.creatorName,
    r: gift.recipientName,
    d: gift.friendshipDate,
    m: gift.howWeMet,
    v: gift.vibe,
    w: gift.whyTheyMatter,
    p: gift.photos,
    pd: gift.puzzleDifficulty,
    pi: gift.puzzlePhotoIndex ?? 0,
    si: gift.scratchPhotoIndex ?? 1,
    l: gift.letter,
    rl: gift.rules,
    ca: gift.createdAt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compactToGift(compact: any): FriendshipGift {
  return {
    id: compact.i || `gift-${Date.now().toString(36)}`,
    creatorName: compact.c || "",
    recipientName: compact.r || "",
    friendshipDate: compact.d || "",
    howWeMet: compact.m || "",
    vibe: compact.v || "chaos-duo",
    whyTheyMatter: compact.w || "",
    photos: Array.isArray(compact.p) ? compact.p : [],
    puzzleDifficulty: compact.pd || "easy",
    puzzlePhotoIndex: compact.pi ?? 0,
    scratchPhotoIndex: compact.si ?? 1,
    letter: compact.l || "",
    rules: Array.isArray(compact.rl) ? compact.rl : DEFAULT_RULES,
    createdAt: compact.ca || new Date().toISOString(),
  };
}

export function compressGiftToParam(gift: FriendshipGift): string {
  try {
    const compact = giftToCompact(gift);
    const jsonStr = JSON.stringify(compact);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.warn("Failed to compress gift:", err);
    return "";
  }
}

/**
 * Generate a clean, resilient shareable URL for the gift.
 * If the payload is reasonably compact (< 2500 chars), embeds ?d= so the recipient
 * can instantly load the exact custom data with 0ms network latency and 100% offline reliability.
 */
export function encodeGiftToShareUrl(gift: FriendshipGift, origin: string, cloudId?: string): string {
  const base = origin ? origin.replace(/\/$/, "") : "";
  const idToUse = cloudId || gift.id;
  const compressed = compressGiftToParam(gift);

  // If compressed data fits safely within standard URL length limits (< 2500 chars),
  // include ?d= so the recipient can load the entire museum with 0ms network latency.
  if (compressed && compressed.length < 2500) {
    return `${base}/m/${idToUse}?d=${compressed}`;
  }

  // If large (e.g. lots of custom photos), rely on persistent ID
  return `${base}/m/${idToUse}`;
}

export async function saveGiftRemote(gift: FriendshipGift): Promise<{ success: boolean; cloudKey?: string }> {
  saveGift(gift);

  let cloudKey: string | undefined = undefined;

  // 1. POST to /api/gifts
  try {
    const res = await fetch("/api/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gift }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.cloudKey) {
        cloudKey = data.cloudKey;
      }
    }
  } catch (err) {
    console.warn("Could not sync gift to /api/gifts:", err);
  }

  // 2. Client fallback direct upload to Bytebin if cloudKey wasn't returned
  if (!cloudKey) {
    try {
      const res = await fetch("https://bytebin.lucko.me/post", {
        method: "POST",
        headers: { "Content-Type": "application/json", "User-Agent": "amiverse-gift-sync" },
        body: JSON.stringify(gift),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.key) {
          cloudKey = data.key;
        }
      }
    } catch {
      // Pastes.dev secondary fallback
      try {
        const res = await fetch("https://api.pastes.dev/post", {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "amiverse-gift-sync" },
          body: JSON.stringify(gift),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.key) {
            cloudKey = data.key;
          }
        }
      } catch {}
    }
  }

  if (cloudKey) {
    // Also save in localStorage under the cloudKey so creator has it under both keys
    saveGift({ ...gift, id: cloudKey });
  }

  return { success: true, cloudKey };
}

export async function fetchRemoteGift(id: string): Promise<FriendshipGift | null> {
  // 1. Try local server API
  try {
    const res = await fetch(`/api/gifts/${encodeURIComponent(id)}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.gift) return data.gift;
    }
  } catch (err) {
    console.warn("Could not fetch gift from /api/gifts:", err);
  }

  // 2. Fallback: try Bytebin directly
  try {
    const res = await fetch(`https://bytebin.lucko.me/${encodeURIComponent(id)}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.recipientName || data.creatorName || data.r || data.c)) {
        return data.recipientName ? data : compactToGift(data);
      }
    }
  } catch {}

  // 3. Fallback: try Pastes.dev directly
  try {
    const res = await fetch(`https://api.pastes.dev/${encodeURIComponent(id)}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.recipientName || data.creatorName || data.r || data.c)) {
        return data.recipientName ? data : compactToGift(data);
      }
    }
  } catch {}

  return null;
}

export async function shortenUrl(url: string): Promise<string> {
  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) return url;
    const data = await res.json();
    return data?.shortUrl || url;
  } catch {
    return url;
  }
}

export function decodeGiftFromShareParam(dataParam: string): FriendshipGift | null {
  if (!dataParam) return null;

  // 1. Try LZString decompression
  try {
    const lzDecoded = LZString.decompressFromEncodedURIComponent(dataParam);
    if (lzDecoded) {
      const parsed = JSON.parse(lzDecoded);
      if (parsed && (parsed.r !== undefined || parsed.c !== undefined || parsed.i !== undefined)) {
        return compactToGift(parsed);
      }
    }
  } catch {}

  // 2. Try URI-decoded LZString (if double encoded)
  try {
    const unescaped = decodeURIComponent(dataParam);
    const lzDecoded = LZString.decompressFromEncodedURIComponent(unescaped);
    if (lzDecoded) {
      const parsed = JSON.parse(lzDecoded);
      if (parsed && (parsed.r !== undefined || parsed.c !== undefined || parsed.i !== undefined)) {
        return compactToGift(parsed);
      }
    }
  } catch {}

  // 3. Try legacy base64 json (decodeURIComponent + atob)
  try {
    const jsonStr = decodeURIComponent(atob(dataParam));
    const compact = JSON.parse(jsonStr);
    return compactToGift(compact);
  } catch {}

  // 4. Try raw atob base64
  try {
    const cleanB64 = dataParam.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = atob(cleanB64);
    const compact = JSON.parse(jsonStr);
    return compactToGift(compact);
  } catch {}

  // 5. Try direct JSON parse
  try {
    const parsed = JSON.parse(dataParam);
    return compactToGift(parsed);
  } catch {}

  return null;
}

