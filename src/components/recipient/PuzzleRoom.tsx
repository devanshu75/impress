"use client";

import React, { useState } from "react";
import { PhotoPuzzle } from "../puzzle/PhotoPuzzle";
import { PuzzleDifficulty } from "@/lib/types";

interface PuzzleRoomProps {
  photoUrl: string;
  difficulty: PuzzleDifficulty;
  onSolve?: () => void;
}

export const PuzzleRoom: React.FC<PuzzleRoomProps> = ({
  photoUrl,
  difficulty,
  onSolve,
}) => {
  const [solved, setSolved] = useState(false);

  return (
    <div className="py-4 sm:py-6 px-4 max-w-lg mx-auto text-center">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
          Room 5 · The Restoration Desk
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] tracking-tight">
          Can you put this back together? 🧩
        </h3>
        <p className="text-xs text-[#777183] mt-1">
          This photo broke into pieces. Tap two pieces to swap and fix it!
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-6 rounded-3xl border border-[#F1DDE7] shadow-sm">
        <PhotoPuzzle
          photoUrl={photoUrl}
          difficulty={difficulty}
          onSolve={() => {
            setSolved(true);
            if (onSolve) onSolve();
          }}
          isRecipientView={true}
        />
      </div>
    </div>
  );
};
