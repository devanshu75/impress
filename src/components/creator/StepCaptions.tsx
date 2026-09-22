"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageSquareHeart } from "lucide-react";
import { FriendshipPhoto } from "@/lib/types";
import { sound } from "@/lib/sound";

interface StepCaptionsProps {
  photos: FriendshipPhoto[];
  onChangePhotoCaption: (index: number, caption: string) => void;
  onNext: () => void;
}

export const StepCaptions: React.FC<StepCaptionsProps> = ({
  photos,
  onChangePhotoCaption,
  onNext,
}) => {
  const suggestions = [
    "That one weekend 😂",
    "Literally no plan.",
    "Core memory unlocked.",
    "Unstoppable chaos.",
    "Golden hour magic ✨",
    "Crying from laughing so hard.",
  ];

  const handleApplySuggestion = (index: number, text: string) => {
    sound.playPop();
    onChangePhotoCaption(index, text);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-3xl block mb-2">✍️</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          Handwritten captions
        </h2>
        <p className="text-[#777183] text-sm">
          Write a cute little note under each Polaroid photo just like a real scrapbook.
        </p>
      </motion.div>

      <div className="space-y-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-3xl bg-white border border-[#F1DDE7] shadow-xs"
          >
            {/* Polaroid Preview */}
            <div className="w-28 sm:w-32 aspect-square rounded-xl overflow-hidden shrink-0 border border-[#F1DDE7] bg-[#FFF0F6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt="Memory preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption Input */}
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#777183] uppercase tracking-wider">
                  Memory #{index + 1}
                </span>
                <MessageSquareHeart size={15} className="text-[#FF6B9D]" />
              </div>

              <input
                type="text"
                placeholder="Write a sweet or funny caption..."
                value={photo.caption || ""}
                maxLength={60}
                onChange={(e) => onChangePhotoCaption(index, e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-xl font-handwriting text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/15 transition-all"
              />

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.slice(index % 3, (index % 3) + 3).map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleApplySuggestion(index, sug)}
                    className="text-[11px] font-handwriting px-2.5 py-0.5 rounded-full bg-[#FFF0F6] text-[#292536] hover:text-[#E94F87] hover:border-[#FF6B9D] border border-transparent transition-colors cursor-pointer"
                  >
                    &ldquo;{sug}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Configure friendship puzzle</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
