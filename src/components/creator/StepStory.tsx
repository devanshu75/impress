"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Compass, ArrowRight, Clock, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

interface StepStoryProps {
  friendshipDate: string;
  howWeMet: string;
  onChangeDate: (val: string) => void;
  onChangeHowWeMet: (val: string) => void;
  onNext: () => void;
}

export const StepStory: React.FC<StepStoryProps> = ({
  friendshipDate,
  howWeMet,
  onChangeDate,
  onChangeHowWeMet,
  onNext,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    try {
      dateInputRef.current?.showPicker?.();
    } catch {
      dateInputRef.current?.focus();
    }
  };

  // Calculate days together if date is provided
  const calculateDays = () => {
    if (!friendshipDate) return 0;
    const start = new Date(friendshipDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 0 : diff;
  };

  const daysCount = calculateDays();

  const formatDateDisplay = (dStr: string) => {
    if (!dStr) return "Pick a date";
    try {
      const d = new Date(dStr);
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dStr;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-3xl block mb-2">⏳</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          When did your story begin?
        </h2>
        <p className="text-[#777183] text-sm">
          Every legendary duo has a moment that sparked the whole journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Form Fields */}
        <div className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-2">
              Friendship Start Date
            </label>
            <div className="relative group">
              <input
                ref={dateInputRef}
                type="date"
                value={friendshipDate}
                onChange={(e) => onChangeDate(e.target.value)}
                onClick={handleOpenPicker}
                className="cute-date-input w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-[#292536] focus:outline-none focus:border-[#FF6B9D] focus:ring-3 focus:ring-[#FF6B9D]/15 transition-all text-sm cursor-pointer font-medium"
              />
              <div
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FF6B9D] group-hover:scale-110 active:scale-95 transition-transform pointer-events-none flex items-center justify-center"
              >
                <Calendar size={18} />
              </div>
            </div>
            <p className="mt-1 text-[11px] text-[#777183]">
              Rough estimate is completely fine!
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-2">
              How did you two meet?
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="e.g. In 9th grade biology when you accidentally dropped your beaker, or during a random late-night Discord call..."
                value={howWeMet}
                onChange={(e) => onChangeHowWeMet(e.target.value)}
                maxLength={200}
                className="w-full px-4 py-3 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#8B7CF6] focus:ring-3 focus:ring-[#8B7CF6]/15 transition-all text-sm resize-none"
              />
              <Compass
                size={16}
                className="absolute right-3.5 bottom-3 text-[#8B7CF6]"
              />
            </div>
          </div>
        </div>

        {/* Cute Timeline Preview */}
        <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#FFF9FC] to-[#FFF0F6] border border-[#F1DDE7] shadow-xs text-center">
          <div className="w-16 h-4 bg-[#8FE3CF]/70 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-1 rounded-xs" />

          <p className="text-[11px] uppercase tracking-widest text-[#777183] font-bold mb-3">
            Friendship Timeline
          </p>

          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs font-medium text-[#777183]">
              The day it all started
            </span>
            <span className="text-xs text-[#E94F87]">↓</span>
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#F1DDE7] shadow-xs font-bold text-sm text-[#292536] flex items-center gap-1.5">
              <Clock size={14} className="text-[#FF6B9D]" />
              <span>{formatDateDisplay(friendshipDate)}</span>
            </div>
            <span className="text-xs text-[#8B7CF6]">↓</span>
            <span className="text-xs font-bold text-[#8B7CF6] tracking-wide">
              Still going strong...
            </span>
          </div>

          {daysCount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-5 pt-4 border-t border-[#F1DDE7]/70 w-full"
            >
              <div className="inline-flex items-center gap-1 text-xs text-[#E94F87] font-semibold">
                <Sparkles size={13} />
                <span>
                  {daysCount.toLocaleString()} days of unconditional chaos
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Pick friendship vibe</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
