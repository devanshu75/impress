"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Plus, Award, Check } from "lucide-react";
import { sound } from "@/lib/sound";
import { fireCuteConfetti } from "../common/Confetti";
import Link from "next/link";

interface CertificateRoomProps {
  recipientName: string;
  creatorName: string;
  friendshipDate?: string;
  onReplay: () => void;
}

export const CertificateRoom: React.FC<CertificateRoomProps> = ({
  recipientName,
  creatorName,
  friendshipDate,
  onReplay,
}) => {
  useEffect(() => {
    fireCuteConfetti({ count: 70, originY: 0.5 });
  }, []);

  const formattedDate = React.useMemo(() => {
    const d = friendshipDate ? new Date(friendshipDate) : new Date();
    return d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [friendshipDate]);

  return (
    <div className="py-4 sm:py-6 px-4 max-w-xl mx-auto text-center">
      {/* Emotional Payoff */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-3xl mb-2">🌸</div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] mb-2 tracking-tight leading-snug">
          And that&apos;s our little story.
        </h3>
        <p className="text-sm sm:text-base text-[#777183] leading-relaxed max-w-md mx-auto italic mb-2">
          Different days. <br />
          Different places. <br />
          Same friendship.
        </p>
        <p className="text-xs sm:text-sm font-bold text-[#E94F87] flex items-center justify-center gap-1">
          <span>Here&apos;s to everything we haven&apos;t done yet.</span>
          <Heart size={14} className="fill-[#FF6B9D] text-[#FF6B9D]" />
        </p>
      </motion.div>

      {/* Official Certificate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#F1DDE7] shadow-xl text-center overflow-hidden mb-8"
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FF6B9D]/50 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FF6B9D]/50 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FF6B9D]/50 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FF6B9D]/50 rounded-br-lg" />

        {/* Top Seal */}
        <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#FFD166] to-[#FFB38A] text-white flex items-center justify-center mx-auto mb-2 shadow-md">
          <Award size={26} />
        </div>

        <p className="text-[10px] uppercase tracking-widest text-[#777183] font-bold mb-1">
          Official Digital Keepsake
        </p>

        <h4 className="text-2xl sm:text-3xl font-extrabold text-[#292536] tracking-tight mb-3">
          Friendship Certificate
        </h4>

        <div className="py-3 border-y border-[#F1DDE7]/70 my-3 space-y-1.5">
          <p className="text-[11px] text-[#777183] uppercase tracking-wider font-medium">
            Certified Between
          </p>

          <div className="text-2xl sm:text-3xl font-black text-[#E94F87] tracking-tight flex items-center justify-center gap-2">
            <span>{recipientName || "Alex"}</span>
            <span className="text-[#8B7CF6]">&</span>
            <span>{creatorName || "Sam"}</span>
          </div>

          <p className="text-[11px] font-bold text-[#8B7CF6] tracking-widest uppercase pt-0.5">
            Status: Forever Friends ♡
          </p>
        </div>

        <p className="text-xs text-[#777183] leading-relaxed max-w-sm mx-auto mb-3">
          Renewed indefinitely, with no option to cancel, valid across all universes and timelines.
        </p>

        <div className="flex items-center justify-between text-[11px] text-[#777183] pt-2 border-t border-[#F1DDE7]/40">
          <span>Est. {formattedDate}</span>
          <span className="flex items-center gap-1 text-[#E94F87] font-semibold">
            <Check size={12} strokeWidth={3} /> Verified Bond
          </span>
        </div>
      </motion.div>

      {/* Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onReplay();
          }}
          className="btn-cute-secondary text-xs sm:text-sm px-5 py-2.5 w-full sm:w-auto"
        >
          <RotateCcw size={14} />
          <span>Replay experience</span>
        </button>

        <Link
          href="/create/friendship"
          onClick={() => sound.playPop()}
          className="btn-cute-primary text-xs sm:text-sm px-5 py-2.5 w-full sm:w-auto"
        >
          <Plus size={14} />
          <span>Make one for your friend</span>
        </Link>
      </div>

      <p className="mt-6 text-xs text-[#777183] font-handwriting text-base">
        Made with love & care · Amiverse ♡
      </p>
    </div>
  );
};
