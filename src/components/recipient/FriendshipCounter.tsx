"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Clock, Sparkles, Coffee, Smile } from "lucide-react";

interface FriendshipCounterProps {
  startDate?: string;
  recipientName: string;
}

export const FriendshipCounter: React.FC<FriendshipCounterProps> = ({
  startDate,
  recipientName,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [displayCount, setDisplayCount] = useState(0);

  // Compute total days
  const targetDays = React.useMemo(() => {
    if (!startDate) return 1000;
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(1, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 1000 : diff;
  }, [startDate]);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // 2 seconds count-up

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * targetDays);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayCount(targetDays);
      }
    };

    requestAnimationFrame(animateCount);
  }, [targetDays]);

  const approxHours = (targetDays * 24).toLocaleString();
  const approxCoffees = Math.max(12, Math.floor(targetDays * 0.4)).toLocaleString();
  const approxGiggles = Math.max(100, Math.floor(targetDays * 5.2)).toLocaleString();

  return (
    <div
      ref={ref}
      className="relative py-4 sm:py-6 px-4 max-w-xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#F1DDE7] shadow-sm"
      >
        {/* Washi Tape Header */}
        <div className="w-24 h-5 bg-[#FFD166]/70 absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-1 rounded-2xs" />

        <div className="flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-[#777183] font-bold mb-3">
          <Clock size={13} className="text-[#FF6B9D]" />
          <span>The Hall of Days</span>
        </div>

        <p className="text-sm sm:text-base font-semibold text-[#777183] mb-1">
          You and I have been best friends for
        </p>

        {/* Big Animated Counter */}
        <div className="py-2">
          <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-[#FF6B9D] via-[#8B7CF6] to-[#E94F87] bg-clip-text text-transparent">
            {displayCount.toLocaleString()}
          </span>
          <span className="block text-lg sm:text-xl font-black text-[#292536] mt-0.5">
            days
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-[#E94F87] flex items-center justify-center gap-1.5 mt-1 mb-5">
          <span>and counting</span>
          <Heart size={14} className="fill-[#FF6B9D] text-[#FF6B9D]" />
        </p>

        {/* Playful Stats Chips */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F1DDE7]/60">
          <div className="bg-[#FFF0F6] p-2.5 rounded-2xl">
            <Sparkles size={14} className="text-[#FF6B9D] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#292536] block">
              {approxHours}
            </span>
            <span className="text-[10px] text-[#777183] block">hours together</span>
          </div>

          <div className="bg-[#FFF9FC] p-2.5 rounded-2xl border border-[#F1DDE7]">
            <Coffee size={14} className="text-[#FFB38A] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#292536] block">
              ~{approxCoffees}
            </span>
            <span className="text-[10px] text-[#777183] block">drink runs</span>
          </div>

          <div className="bg-[#F3EEFF] p-2.5 rounded-2xl">
            <Smile size={14} className="text-[#8B7CF6] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#292536] block">
              ~{approxGiggles}
            </span>
            <span className="text-[10px] text-[#777183] block">unhinged laughs</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
