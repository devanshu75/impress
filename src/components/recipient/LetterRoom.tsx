"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Envelope } from "../letter/Envelope";

interface LetterRoomProps {
  recipientName: string;
  creatorName: string;
  letterText: string;
}

export const LetterRoom: React.FC<LetterRoomProps> = ({
  recipientName,
  creatorName,
  letterText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`py-4 sm:py-6 px-4 max-w-xl mx-auto text-center transition-colors duration-700 ${
        isOpen ? "bg-[#FFF0F6]/40 rounded-3xl" : ""
      }`}
    >
      <div className="mb-3">
        <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
          Room 6 · The Reading Room
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] tracking-tight">
          You have one very important letter. 💌
        </h3>
        <p className="text-xs text-[#777183] mt-1">
          Sealed with wax. Only your hands are allowed to break it.
        </p>
      </div>

      <div className="pt-2">
        <Envelope
          recipientName={recipientName}
          creatorName={creatorName}
          letterText={letterText}
          onOpenStateChange={setIsOpen}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-[#777183] font-medium mt-3"
      >
        {isOpen ? "Tap letter paper to read in full" : "Tap the heart wax seal to break open"}
      </motion.p>
    </div>
  );
};
