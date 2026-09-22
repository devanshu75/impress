"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { VIBE_OPTIONS } from "@/lib/types";
import { sound } from "@/lib/sound";

interface StepVibeProps {
  selectedVibe: string;
  onSelectVibe: (vibeId: string) => void;
  onNext: () => void;
}

export const StepVibe: React.FC<StepVibeProps> = ({
  selectedVibe,
  onSelectVibe,
  onNext,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-3xl block mb-2">💫</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          What&apos;s your friendship vibe?
        </h2>
        <p className="text-[#777183] text-sm">
          Pick the frequency that defines your dynamic. This styles your friend&apos;s museum room!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VIBE_OPTIONS.map((vibe) => {
          const isSelected = selectedVibe === vibe.id;

          return (
            <motion.div
              key={vibe.id}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playPop();
                onSelectVibe(vibe.id);
              }}
              className={`relative cursor-pointer p-4 rounded-3xl border transition-all duration-200 ${
                isSelected
                  ? "bg-white border-[#FF6B9D] shadow-md ring-2 ring-[#FF6B9D]/30"
                  : "bg-white/70 hover:bg-white border-[#F1DDE7] shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${vibe.gradient} shadow-xs`}
                >
                  <span>{vibe.emoji}</span>
                </div>

                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-bold text-[#292536] text-base">
                      {vibe.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#777183] leading-relaxed">
                    {vibe.subtitle}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3.5 top-3.5 w-6 h-6 rounded-full bg-[#E94F87] text-white flex items-center justify-center shadow-xs"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Why they matter</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
