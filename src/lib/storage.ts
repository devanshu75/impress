import { FriendshipGift, DEFAULT_RULES } from "./types";

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

/**
 * Generate a clean, short shareable URL for the gift
 */
export function encodeGiftToShareUrl(gift: FriendshipGift, origin: string): string {
  const base = origin ? origin.replace(/\/$/, "") : "";
  return `${base}/m/${gift.id}`;
}

export async function saveGiftRemote(gift: FriendshipGift): Promise<boolean> {
  saveGift(gift);
  try {
    const res = await fetch("/api/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gift }),
    });
    return res.ok;
  } catch (err) {
    console.warn("Could not sync gift to server:", err);
    return false;
  }
}

export async function fetchRemoteGift(id: string): Promise<FriendshipGift | null> {
  try {
    const res = await fetch(`/api/gifts/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.gift || null;
  } catch (err) {
    console.warn("Could not fetch gift from server:", err);
    return null;
  }
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
  try {
    const jsonStr = decodeURIComponent(atob(dataParam));
    const compact = JSON.parse(jsonStr);
    return {
      id: compact.i,
      creatorName: compact.c,
      recipientName: compact.r,
      friendshipDate: compact.d,
      howWeMet: compact.m,
      vibe: compact.v,
      whyTheyMatter: compact.w,
      photos: compact.p || [],
      puzzleDifficulty: compact.pd || "easy",
      puzzlePhotoIndex: compact.pi ?? 0,
      scratchPhotoIndex: compact.si ?? 1,
      letter: compact.l,
      rules: compact.rl || DEFAULT_RULES,
      createdAt: new Date().toISOString(),
    };
  } catch (e) {
    console.warn("Could not decode share data param", e);
    return null;
  }
}
