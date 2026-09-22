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
import { Heart, Sparkles } from "lucide-react";

interface MuseumPageClientProps {
  id: string;
}

export const MuseumPageClient: React.FC<MuseumPageClientProps> = ({ id }) => {
  const searchParams = useSearchParams();
  const [gift, setGift] = useState<FriendshipGift | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadGift() {
      // 1. Check if legacy compact data is in query param
      const dataParam = searchParams.get("data");
      if (dataParam) {
        const decoded = decodeGiftFromShareParam(dataParam);
        if (decoded) {
          if (!isCancelled) {
            setGift(decoded);
            setLoading(false);
          }
          return;
        }
      }

      // 2. Check localStorage by ID (creator or cached)
      const saved = getSavedGift(id);
      if (saved) {
        if (!isCancelled) {
          setGift(saved);
          setLoading(false);
        }
        return;
      }

      // 3. Fetch from Server API (for recipients opening short URL on mobile / WhatsApp)
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
      } catch {}

      // 4. Fallback to demo gift so experience never breaks
      if (!isCancelled) {
        setGift({
          ...DEMO_GIFT,
          id,
        });
        setLoading(false);
      }
    }

    loadGift();

    return () => {
      isCancelled = true;
    };
  }, [id, searchParams]);

  if (loading || !gift) {
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

  return <MuseumExperience gift={gift} />;
};
