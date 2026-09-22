"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { sound } from "@/lib/sound";
import { FloatingDecorations } from "../common/FloatingDecorations";

interface MuseumEntranceProps {
  recipientName: string;
  creatorName: string;
  onEnter: () => void;
}

export const MuseumEntrance: React.FC<MuseumEntranceProps> = ({
  recipientName,
  creatorName,
  onEnter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    sound.playChime();
    onEnter();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#FFF9FC] flex flex-col items-center justify-start sm:justify-center p-6 text-center overflow-y-auto select-none"
    >
      <FloatingDecorations density="high" />

      {/* Subtle radial glow in background */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFD6E7]/40 via-[#D9D2FF]/30 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-sm w-full py-8 my-auto"
      >
        {/* Animated Top Sparkle */}
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-6 text-[#FFD166] drop-shadow-xs"
        >
          ✦
        </motion.div>

        {/* Small greeting */}
        <p className="text-xs uppercase tracking-widest text-[#777183] font-bold mb-2">
          Special Delivery
        </p>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-black text-[#292536] tracking-tight leading-snug mb-3">
          Someone made <br />
          <span className="bg-gradient-to-r from-[#FF6B9D] via-[#8B7CF6] to-[#E94F87] bg-clip-text text-transparent">
            something special
          </span>{" "}
          <br />
          for you.
        </h1>

        {/* Dedicated for text */}
        <p className="text-sm font-medium text-[#777183] mb-6">
          Created for <strong className="text-[#E94F87] font-bold">{recipientName || "you"}</strong>{" "}
          {creatorName ? `by ${creatorName}` : ""}
        </p>

        {/* Pulsing Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-[#FFF0F6] border border-[#FF6B9D]/40 flex items-center justify-center text-[#FF6B9D] mb-8 shadow-xs"
        >
          <Heart size={18} className="fill-[#FF6B9D]" />
        </motion.div>

        {/* Open Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="btn-cute-primary text-base px-8 py-4 cursor-pointer shadow-lg hover:shadow-xl w-full max-w-[200px]"
        >
          <Sparkles size={16} />
          <span>Open it</span>
          <Heart size={14} className="fill-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};
