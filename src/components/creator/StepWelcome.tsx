"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { FloatingDecorations } from "../common/FloatingDecorations";

interface StepWelcomeProps {
  onNext: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-8">
      <FloatingDecorations density="high" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Cute Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF0F6] border border-[#F1DDE7] text-[#E94F87] text-xs font-semibold tracking-wide mb-6 shadow-xs">
          <Sparkles size={14} className="text-[#FFB38A]" />
          <span>Tiny Digital Friendship Capsule</span>
          <Heart size={12} className="fill-[#FF6B9D] text-[#FF6B9D]" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#292536] tracking-tight leading-[1.15] mb-4">
          Let&apos;s make something <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF6B9D] via-[#8B7CF6] to-[#E94F87] bg-clip-text text-transparent">
            they&apos;ll never forget.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-[#777183] max-w-md mx-auto mb-8 font-normal leading-relaxed">
          Create a tiny digital world for your favorite person. Filled with memories, secrets, puzzles, and a letter from the heart.
        </p>

        {/* Cute Scrapbook Teaser Card */}
        <motion.div
          whileHover={{ rotate: 1 }}
          className="relative mb-10 w-64 bg-white p-3 pt-4 rounded-xl shadow-md border border-[#F1DDE7] transform -rotate-1 transition-transform"
        >
          <div className="w-16 h-4 bg-[#FFD166]/80 absolute -top-2 left-1/2 -translate-x-1/2 rotate-2 shadow-xs rounded-xs" />
          <div className="bg-[#FFF9FC] rounded-lg p-3 text-center border border-[#F1DDE7]/50">
            <span className="text-3xl block mb-1">🎁 💌 🧸</span>
            <p className="text-xs font-semibold text-[#292536]">
              Not just a card.
            </p>
            <p className="text-[11px] text-[#777183]">
              A 9-room interactive memory museum.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary text-base px-8 py-4 cursor-pointer group"
        >
          <span>Start creating</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        <p className="mt-4 text-xs text-[#777183]">
          Takes ~3 minutes · Works seamlessly on mobile & desktop
        </p>
      </motion.div>
    </div>
  );
};
