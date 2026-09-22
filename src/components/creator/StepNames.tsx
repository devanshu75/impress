"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, User, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface StepNamesProps {
  recipientName: string;
  creatorName: string;
  onChangeRecipient: (val: string) => void;
  onChangeCreator: (val: string) => void;
  onNext: () => void;
}

export const StepNames: React.FC<StepNamesProps> = ({
  recipientName,
  creatorName,
  onChangeRecipient,
  onChangeCreator,
  onNext,
}) => {
  const isValid = recipientName.trim().length > 0 && creatorName.trim().length > 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center mb-8"
      >
        <span className="text-3xl block mb-2">🎀</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          Who&apos;s this little gift for?
        </h2>
        <p className="text-[#777183] text-sm">
          We&apos;ll engrave both your names onto their personalized museum plaque.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Fields */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-xs space-y-5"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-2">
              Their Name (Your Bestie)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Alex"
                value={recipientName}
                maxLength={30}
                onChange={(e) => onChangeRecipient(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#FF6B9D] focus:ring-3 focus:ring-[#FF6B9D]/15 transition-all text-base"
              />
              <Heart
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FF6B9D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-2">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Sam"
                value={creatorName}
                maxLength={30}
                onChange={(e) => onChangeCreator(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#8B7CF6] focus:ring-3 focus:ring-[#8B7CF6]/15 transition-all text-base"
              />
              <User
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B7CF6]"
              />
            </div>
          </div>
        </motion.div>

        {/* Live Badge Preview */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-[#FFF0F6] to-[#F3EEFF] border border-[#F1DDE7] shadow-sm text-center min-h-[220px]"
        >
          <div className="w-20 h-5 bg-[#FFD166]/70 absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-1 rounded-xs shadow-2xs" />
          <Sparkles size={18} className="text-[#FFB38A] mb-2" />

          <p className="text-xs uppercase tracking-widest text-[#777183] font-medium mb-1">
            Made especially for
          </p>

          <AnimatePresence mode="wait">
            <motion.h3
              key={recipientName || "empty-recipient"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-2xl font-black text-[#E94F87] tracking-tight mb-3"
            >
              {recipientName.trim() ? recipientName : "Your Best Friend"}
            </motion.h3>
          </AnimatePresence>

          <p className="text-xs uppercase tracking-widest text-[#777183] font-medium mb-1">
            from
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={creatorName || "empty-creator"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-lg font-bold text-[#8B7CF6] flex items-center justify-center gap-1.5"
            >
              <span>{creatorName.trim() ? creatorName : "You"}</span>
              <Heart size={14} className="fill-[#FF6B9D] text-[#FF6B9D]" />
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          disabled={!isValid}
          className={`btn-cute-primary cursor-pointer ${
            !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>Continue to our story</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
