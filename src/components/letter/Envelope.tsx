"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { sound } from "@/lib/sound";

interface EnvelopeProps {
  recipientName: string;
  creatorName: string;
  letterText: string;
  isOpenDefault?: boolean;
  onOpenStateChange?: (isOpen: boolean) => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  recipientName,
  creatorName,
  letterText,
  isOpenDefault = false,
  onOpenStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const [isReadingFull, setIsReadingFull] = useState(false);

  const handleToggle = () => {
    sound.playPaperRustle();
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onOpenStateChange) onOpenStateChange(nextState);
    if (nextState) {
      sound.playSparkle();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6">
      {/* Outer Envelope Wrapper */}
      <div className="relative w-72 sm:w-80 h-52 sm:h-56 cursor-pointer select-none" onClick={handleToggle}>
        {/* Shadow */}
        <div className="absolute inset-x-4 bottom-0 h-6 bg-black/10 rounded-full blur-md" />

        {/* The Letter Paper (slides upward when opened) */}
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? -90 : 0,
            scale: isOpen ? 1.02 : 0.95,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (isOpen) {
              e.stopPropagation();
              sound.playPop();
              setIsReadingFull(true);
            }
          }}
          className={`absolute left-4 right-4 top-4 bottom-4 bg-[#FFFDF9] rounded-xl border border-[#F1DDE7] shadow-md p-4 flex flex-col overflow-hidden z-10 transition-shadow ${
            isOpen ? "hover:shadow-lg cursor-pointer" : ""
          }`}
        >
          {/* Subtle paper lines */}
          <div className="flex items-center justify-between border-b border-[#F1DDE7]/70 pb-2 mb-2">
            <span className="text-[10px] font-bold text-[#777183] uppercase tracking-wider">
              Dear {recipientName || "Friend"},
            </span>
            <Sparkles size={11} className="text-[#FF6B9D]" />
          </div>

          <p className="text-xs font-handwriting text-[#292536] line-clamp-4 leading-relaxed flex-1">
            {letterText || "Write something sweet from the bottom of your heart..."}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-[#F1DDE7]/50 mt-1">
            <span className="text-[10px] text-[#777183] font-handwriting">
              With love, {creatorName || "Me"} ♡
            </span>
            {isOpen && (
              <span className="text-[9px] font-bold text-[#E94F87] bg-[#FFF0F6] px-2 py-0.5 rounded-full">
                Tap to read
              </span>
            )}
          </div>
        </motion.div>

        {/* Envelope Body (Front Pocket) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F6] to-[#FFE2ED] rounded-2xl border-2 border-[#F1DDE7] shadow-sm z-20 flex flex-col justify-between overflow-hidden pointer-events-none">
          {/* Decorative stamp in top right */}
          <div className="absolute top-3 right-3 w-8 h-10 border-2 border-dashed border-[#FF6B9D]/60 rounded-xs flex items-center justify-center bg-white/70 rotate-3">
            <Heart size={14} className="fill-[#FF6B9D] text-[#FF6B9D]" />
          </div>

          {/* Postal label */}
          <div className="p-4 pt-8">
            <p className="text-[10px] uppercase tracking-widest text-[#777183] font-bold">
              Special Delivery For:
            </p>
            <p className="text-sm font-bold text-[#292536]">
              {recipientName || "Alex"}
            </p>
          </div>

          {/* Bottom Fold Lines styling */}
          <div className="h-10 bg-gradient-to-t from-[#FFD6E7]/50 to-transparent flex items-end justify-center pb-2">
            <span className="text-[10px] font-semibold text-[#E94F87]">
              {isOpen ? "Tap envelope to close" : "Tap wax seal to open"}
            </span>
          </div>
        </div>

        {/* Wax Seal / Button */}
        <motion.div
          animate={{ scale: isOpen ? 0.9 : 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#E94F87] shadow-md border-2 border-white flex items-center justify-center text-white"
        >
          <Heart size={18} className="fill-white" />
        </motion.div>
      </div>

      {/* Full Letter Modal when tapped */}
      <AnimatePresence>
        {isReadingFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsReadingFull(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#F1DDE7] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Cute Washi Tape at Top */}
              <div className="w-24 h-5 bg-[#FFD166]/80 absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-1 rounded-2xs" />

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setIsReadingFull(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF0F6] text-[#777183] hover:text-[#E94F87] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>

              <div className="border-b border-[#F1DDE7] pb-4 mb-4">
                <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
                  A personal note
                </span>
                <h3 className="text-2xl font-bold text-[#292536]">
                  Dearest {recipientName || "Friend"},
                </h3>
              </div>

              <div className="text-xl sm:text-2xl font-handwriting text-[#292536] leading-relaxed whitespace-pre-wrap py-2">
                {letterText || "No letter text written yet."}
              </div>

              <div className="mt-8 pt-4 border-t border-[#F1DDE7] flex items-center justify-between">
                <span className="text-lg font-handwriting text-[#E94F87]">
                  Always & forever, {creatorName || "Me"} ♡
                </span>
                <button
                  type="button"
                  onClick={() => setIsReadingFull(false)}
                  className="btn-cute-primary text-xs px-4 py-2"
                >
                  Close letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
