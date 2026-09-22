"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Compass } from "lucide-react";
import { VIBE_OPTIONS } from "@/lib/types";

interface VibeRoomProps {
  vibeId?: string;
  whyTheyMatter?: string;
  howWeMet?: string;
  recipientName: string;
  creatorName: string;
}

export const VibeRoom: React.FC<VibeRoomProps> = ({
  vibeId = "chaos-duo",
  whyTheyMatter,
  howWeMet,
  recipientName,
  creatorName,
}) => {
  const currentVibe =
    VIBE_OPTIONS.find((v) => v.id === vibeId) || VIBE_OPTIONS[0];

  return (
    <div className="py-4 sm:py-6 px-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* Vibe Badge Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-3xl p-6 border border-[#F1DDE7] shadow-sm flex flex-col items-center text-center justify-center"
        >
          <div className="w-16 h-4 bg-[#8FE3CF]/70 absolute -top-2 left-1/2 -translate-x-1/2 rotate-1 rounded-2xs" />

          <span className="text-[10px] uppercase tracking-widest text-[#777183] font-bold mb-3">
            Room 2 · The Frequency
          </span>

          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 bg-gradient-to-br ${currentVibe.gradient} shadow-md`}
          >
            {currentVibe.emoji}
          </div>

          <h3 className="text-2xl font-black text-[#292536] mb-1 tracking-tight">
            {currentVibe.title}
          </h3>

          <p className="text-xs text-[#777183] leading-relaxed max-w-xs mb-4">
            {currentVibe.subtitle}
          </p>

          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E94F87] bg-[#FFF0F6] px-3 py-1 rounded-full">
            <Sparkles size={12} />
            <span>Certified Official Vibe</span>
          </div>
        </motion.div>

        {/* Heartfelt Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-[#FFFDF9] rounded-3xl p-6 border border-[#F1DDE7] shadow-sm flex flex-col justify-between"
        >
          <div className="w-16 h-4 bg-[#FFB38A]/70 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-2 rounded-2xs" />

          <div>
            <div className="flex items-center justify-between border-b border-[#F1DDE7] pb-2.5 mb-3">
              <span className="text-xs uppercase tracking-widest text-[#777183] font-bold">
                Why You&apos;re My Person
              </span>
              <Heart size={15} className="text-[#FF6B9D] fill-[#FF6B9D]" />
            </div>

            <div className="max-h-72 overflow-y-auto pr-1">
              <p className="text-sm text-[#292536] leading-relaxed mb-4 italic whitespace-pre-wrap">
                &ldquo;{whyTheyMatter || "Because life simply makes sense when you are around."}&rdquo;
              </p>
            </div>

            {howWeMet && (
              <div className="bg-[#FFF9FC] p-3 rounded-2xl border border-[#F1DDE7]/60 text-xs text-[#777183] mt-2">
                <span className="font-bold text-[#292536] flex items-center gap-1 mb-1">
                  <Compass size={12} className="text-[#8B7CF6]" />
                  How we started:
                </span>
                <p className="line-clamp-3 whitespace-pre-wrap">{howWeMet}</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1DDE7]/50 text-right">
            <span className="text-xs font-handwriting text-[#8B7CF6] font-bold">
              — {creatorName || "Your bestie"} ♡
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
