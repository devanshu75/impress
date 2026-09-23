"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Copy,
  ExternalLink,
  Check,
  Sparkles,
  Heart,
  Send,
  Link2,
} from "lucide-react";
import { FriendshipGift } from "@/lib/types";
import {
  encodeGiftToShareUrl,
  saveGift,
  saveGiftRemote,
  shortenUrl,
} from "@/lib/storage";
import { sound } from "@/lib/sound";
import { fireCuteConfetti } from "../common/Confetti";
import Link from "next/link";

interface StepPreviewProps {
  gift: FriendshipGift;
}

export const StepPreview: React.FC<StepPreviewProps> = ({ gift }) => {
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [useTinyUrl, setUseTinyUrl] = useState(false);
  const [cloudId, setCloudId] = useState<string | null>(null);

  // Direct resilient link: origin/m/id with embedded data parameter if compact
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const directUrl = encodeGiftToShareUrl(gift, origin, cloudId || undefined);

  // Auto-sync gift to server and persistent cloud storage
  useEffect(() => {
    saveGift(gift);
    let isCancelled = false;

    saveGiftRemote(gift).then((res) => {
      if (!isCancelled && res.cloudKey) {
        setCloudId(res.cloudKey);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [gift]);

  // Try to generate an ultra-compact TinyURL if public origin is present
  useEffect(() => {
    if (!origin) return;

    let isCancelled = false;
    shortenUrl(directUrl)
      .then((res) => {
        if (!isCancelled && res && res !== directUrl) {
          setShortUrl(res);
        }
      })
      .catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [directUrl, origin]);

  // Active share URL (TinyURL if available & explicitly toggled, otherwise direct clean URL)
  const activeShareUrl = (useTinyUrl && shortUrl) ? shortUrl : directUrl;

  const handleCopyLink = async () => {
    sound.playSparkle();
    fireCuteConfetti({ count: 40 });
    saveGift(gift);
    saveGiftRemote(gift);

    try {
      await navigator.clipboard.writeText(activeShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      // Fallback
    }
  };

  const handleShareNative = async () => {
    sound.playPop();
    saveGift(gift);
    saveGiftRemote(gift);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A tiny digital world for ${gift.recipientName} ♡`,
          text: `Someone built a secret friendship museum especially for you:`,
          url: activeShareUrl,
        });
      } catch (e) {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 rounded-full bg-[#FFF0F6] border-2 border-[#FF6B9D] flex items-center justify-center mx-auto mb-3 shadow-md">
          <Heart size={32} className="fill-[#FF6B9D] text-[#FF6B9D]" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#292536] mb-2 tracking-tight">
          Their museum is ready! ✨
        </h2>
        <p className="text-[#777183] text-sm max-w-md mx-auto">
          You made something truly unforgettable for {gift.recipientName}. Send it to them as a surprise link.
        </p>
      </motion.div>

      {/* Museum Blueprint Summary Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-sm mb-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#F1DDE7] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#777183]">
            Museum Blueprint
          </span>
          <span className="text-xs font-semibold text-[#E94F87] bg-[#FFF0F6] px-2.5 py-0.5 rounded-full">
            All 9 rooms curated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Bestie</span>
            <span className="font-bold text-[#292536] truncate block">{gift.recipientName}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Vibe</span>
            <span className="font-bold text-[#8B7CF6] truncate block">{gift.vibe || "Chaos Duo"}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Memories</span>
            <span className="font-bold text-[#2A9D8F] block">{gift.photos.length} Polaroids</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Puzzle</span>
            <span className="font-bold text-[#FFB38A] capitalize block">{gift.puzzleDifficulty}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Personal Letter</span>
            <span className="font-bold text-[#E94F87] block">Sealed with wax</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF9FC] border border-[#F1DDE7]">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Rules</span>
            <span className="font-bold text-[#292536] block">{gift.rules.length} Promises</span>
          </div>
        </div>
      </div>

      {/* Share Actions Box */}
      <div className="bg-gradient-to-br from-[#FFF0F6] to-[#F3EEFF] p-6 rounded-3xl border border-[#F1DDE7] shadow-sm mb-8 text-center">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-widest text-[#777183] font-bold">
            Short Shareable Link
          </span>
          {shortUrl && (
            <button
              type="button"
              onClick={() => setUseTinyUrl((prev) => !prev)}
              className="text-[11px] font-semibold text-[#8B7CF6] hover:text-[#FF6B9D] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{useTinyUrl ? "TinyURL active" : "Direct link"}</span>
              <Sparkles size={11} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#F1DDE7] mb-3 shadow-2xs">
          <input
            type="text"
            readOnly
            value={activeShareUrl}
            className="flex-1 px-3 text-xs text-[#292536] bg-transparent outline-none truncate font-mono select-all font-semibold"
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="btn-cute-primary text-xs px-4 py-2 shrink-0 cursor-pointer shadow-xs"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>

        <p className="text-[11px] text-[#777183] mb-4">
          ✨ Ultra-short &amp; clean — easily shared on WhatsApp, iMessage, or Instagram without breaking!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareNative}
            className="btn-cute-secondary text-xs px-4 py-2.5 cursor-pointer bg-white"
          >
            <Share2 size={14} />
            <span>Share via Phone</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Hey ${gift.recipientName}! I made a tiny secret world just for us. Open it here: ${activeShareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPop()}
            className="btn-cute-secondary text-xs px-5 py-2.5 cursor-pointer bg-white text-[#25D366] border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/5 font-bold shadow-xs flex items-center gap-2"
          >
            <Send size={14} />
            <span>Send on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Preview as Friend CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={directUrl}
          onClick={() => {
            sound.playChime();
            saveGift(gift);
          }}
          target="_blank"
          className="btn-cute-primary text-base px-8 py-4 w-full sm:w-auto text-center"
        >
          <span>Preview as {gift.recipientName || "Friend"}</span>
          <ExternalLink size={18} />
        </Link>
      </div>
    </div>
  );
};
