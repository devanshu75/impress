"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { Envelope } from "../letter/Envelope";

interface StepLetterProps {
  letterText: string;
  recipientName: string;
  creatorName: string;
  onChangeLetter: (val: string) => void;
  onNext: () => void;
}

export const StepLetter: React.FC<StepLetterProps> = ({
  letterText,
  recipientName,
  creatorName,
  onChangeLetter,
  onNext,
}) => {
  const defaultSampleLetter = `Dearest ${recipientName || "Alex"},\n\nI was sitting today thinking about how rare it is to find someone whose weird matches your exact frequency. Thank you for showing up for the quiet Tuesdays just as fiercely as the chaotic weekends. Thank you for being the first person I want to text when something absurd happens.\n\nNo matter what city we end up in or how crazy life gets, you will always be my person. Forever grateful for you.\n\nWith all my love,\n${creatorName || "Sam"} ♡`;

  const handleUseTemplate = () => {
    sound.playSparkle();
    onChangeLetter(defaultSampleLetter);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl block mb-2">💌</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          A little something I wanted to say...
        </h2>
        <p className="text-[#777183] text-sm">
          Write them a heartfelt letter. It arrives sealed inside a digital envelope with a wax seal!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Letter Editor */}
        <div className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292536]">
              Your Letter
            </label>
            <button
              type="button"
              onClick={handleUseTemplate}
              className="text-xs font-semibold text-[#8B7CF6] hover:text-[#E94F87] transition-colors cursor-pointer"
            >
              Fill sweet template
            </button>
          </div>

          <textarea
            rows={10}
            placeholder={`Dearest ${recipientName || "Alex"},\n\nWrite whatever has been in your heart...`}
            value={letterText}
            onChange={(e) => onChangeLetter(e.target.value)}
            className="w-full p-4 rounded-2xl border border-[#F1DDE7] bg-[#FFFDF9] text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#FF6B9D] focus:ring-3 focus:ring-[#FF6B9D]/15 transition-all text-sm leading-relaxed resize-none font-sans"
          />

          <p className="mt-2 text-xs text-[#777183] flex items-center gap-1">
            <Heart size={13} className="text-[#FF6B9D] fill-[#FF6B9D]" />
            <span>They must tap the wax seal to break the envelope.</span>
          </p>
        </div>

        {/* Live Interactive Envelope Preview */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-[#FFF0F6] to-[#F3EEFF] border border-[#F1DDE7] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#777183] mb-2 flex items-center gap-1">
            <Sparkles size={12} className="text-[#FFB38A]" />
            <span>Interactive Seal Preview</span>
          </span>

          <Envelope
            recipientName={recipientName}
            creatorName={creatorName}
            letterText={letterText}
          />
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
          <span>Official friendship rules</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
