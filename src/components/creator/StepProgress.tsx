"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onBack: () => void;
  canGoBack: boolean;
  savedIndicator?: boolean;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  onBack,
  canGoBack,
  savedIndicator = true,
}) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3 sticky top-0 bg-[#FFF9FC]/90 backdrop-blur-md z-30 transition-all border-b border-[#F1DDE7]/60">
      <div className="flex items-center justify-between gap-3">
        {/* Back Button */}
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          disabled={!canGoBack}
          aria-label="Previous step"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            canGoBack
              ? "text-[#292536] hover:text-[#E94F87] hover:bg-white hover:shadow-xs cursor-pointer"
              : "opacity-30 cursor-not-allowed text-[#777183]"
          }`}
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        {/* Step Numbers & Title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-[#777183] uppercase">
            <span className="text-[#E94F87]">
              {String(currentStep).padStart(2, "0")}
            </span>
            <span className="text-[#F1DDE7]">/</span>
            <span>{String(totalSteps).padStart(2, "0")}</span>
          </div>
          <span className="text-xs font-medium text-[#292536] max-w-[180px] sm:max-w-xs truncate text-center">
            {stepTitle}
          </span>
        </div>

        {/* Auto-saved badge */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-[#2A9D8F]">
          {savedIndicator && (
            <>
              <CheckCircle2 size={13} className="text-[#2A9D8F]" />
              <span className="hidden sm:inline">Saved</span>
            </>
          )}
        </div>
      </div>

      {/* Playful progress bar */}
      <div className="mt-2.5 w-full h-1.5 bg-[#FFF0F6] rounded-full overflow-hidden border border-[#F1DDE7]/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FF6B9D] via-[#C8B6FF] to-[#8FE3CF]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
