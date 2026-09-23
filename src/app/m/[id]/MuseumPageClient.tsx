"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FriendshipGift } from "@/lib/types";
import {
  getSavedGift,
  saveGift,
  fetchRemoteGift,
  decodeGiftFromShareParam,
  DEMO_GIFT,
} from "@/lib/storage";
import { MuseumExperience } from "@/components/recipient/MuseumExperience";
import { Heart, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

interface MuseumPageClientProps {
  id: string;
}

export const MuseumPageClient: React.FC<MuseumPageClientProps> = ({ id }) => {
  const searchParams = useSearchParams();
  const [gift, setGift] = useState<FriendshipGift | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadGift() {
      // 1. Check if compressed data is in query param (?d= or ?data=)
      const dataParam = searchParams.get("d") || searchParams.get("data");
      if (dataParam) {
        const decoded = decodeGiftFromShareParam(dataParam);
        if (decoded) {
          if (!isCancelled) {
            saveGift(decoded);
            setGift(decoded);
            setLoading(false);
          }
          return;
        }
      }

      // Check URL hash if param was passed in hash
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash;
        const match = hash.match(/[#&](?:d|data)=([^&]+)/);
        if (match && match[1]) {
          const decoded = decodeGiftFromShareParam(decodeURIComponent(match[1]));
          if (decoded) {
            if (!isCancelled) {
              saveGift(decoded);
              setGift(decoded);
              setLoading(false);
            }
            return;
          }
        }
      }

      // 2. Check localStorage by ID (creator or already visited)
      const saved = getSavedGift(id);
      if (saved) {
        if (!isCancelled) {
          setGift(saved);
          setLoading(false);
        }
        return;
      }

      // 3. Demo gift route
      if (id === "demo") {
        if (!isCancelled) {
          setGift(DEMO_GIFT);
          setLoading(false);
        }
        return;
      }

      // 4. Fetch from Server API and Persistent Cloud Storage (Bytebin / Pastes)
      try {
        const remote = await fetchRemoteGift(id);
        if (remote) {
          saveGift(remote);
          if (!isCancelled) {
            setGift(remote);
            setLoading(false);
          }
          return;
        }
      } catch (err) {
        console.warn("Could not fetch remote gift:", err);
      }

      // 5. Not found fallback
      if (!isCancelled) {
        setNotFound(true);
        setLoading(false);
      }
    }

    loadGift();

    return () => {
      isCancelled = true;
    };
  }, [id, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9FC] flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-full bg-[#FFF0F6] border border-[#FF6B9D] flex items-center justify-center animate-pulse mb-3">
          <Heart size={20} className="fill-[#FF6B9D] text-[#FF6B9D]" />
        </div>
        <p className="text-sm font-semibold text-[#292536] mb-1">
          Collecting your memories...
        </p>
        <span className="text-xs text-[#777183]">♡</span>
      </div>
    );
  }

  if (notFound || !gift) {
    return (
      <div className="min-h-screen bg-[#FFF9FC] flex flex-col items-center justify-center text-center p-6">
        <div className="w-14 h-14 rounded-full bg-[#FFF0F6] border border-[#FF6B9D] flex items-center justify-center mb-4 text-[#FF6B9D]">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-2xl font-bold text-[#292536] mb-2">
          Museum Not Found
        </h2>
        <p className="text-sm text-[#777183] max-w-sm mb-6">
          We couldn&apos;t find this friendship museum. The link might be incomplete or missing its memory data.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/create/friendship"
            className="btn-cute-primary text-sm px-6 py-2.5"
          >
            Create Your Own Museum ✨
          </Link>
          <Link
            href="/m/demo"
            className="btn-cute-secondary text-sm px-6 py-2.5 bg-white"
          >
            View Demo Museum
          </Link>
        </div>
      </div>
    );
  }

  return <MuseumExperience gift={gift} />;
};

