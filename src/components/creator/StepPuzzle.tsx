"use client";

import React from "react";
import { motion } from "framer-motion";
import { Puzzle, ArrowRight, Sparkles } from "lucide-react";
import { FriendshipPhoto, PuzzleDifficulty } from "@/lib/types";
import { sound } from "@/lib/sound";
import { PhotoPuzzle } from "../puzzle/PhotoPuzzle";

interface StepPuzzleProps {
  photos: FriendshipPhoto[];
  puzzleDifficulty: PuzzleDifficulty;
  puzzlePhotoIndex: number;
  onChangeDifficulty: (diff: PuzzleDifficulty) => void;
  onSelectPuzzlePhoto: (index: number) => void;
  onNext: () => void;
}

export const StepPuzzle: React.FC<StepPuzzleProps> = ({
  photos,
  puzzleDifficulty,
  puzzlePhotoIndex,
  onChangeDifficulty,
  onSelectPuzzlePhoto,
  onNext,
}) => {
  const activePhoto =
    photos[puzzlePhotoIndex] || photos[0] || {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    };

  const difficultyOptions: { id: PuzzleDifficulty; label: string; desc: string; grid: string }[] = [
    { id: "easy", label: "Easy", desc: "4 pieces (2×2)", grid: "2×2" },
    { id: "medium", label: "Medium", desc: "9 pieces (3×3)", grid: "3×3" },
    { id: "hard", label: "Challenging", desc: "16 pieces (4×4)", grid: "4×4" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl block mb-2">🧩</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          Friendship Photo Puzzle
        </h2>
        <p className="text-[#777183] text-sm">
          Your friend will have to put this memory back together to unlock its secret!
        </p>
      </motion.div>

      {/* Difficulty Selector */}
      <div className="bg-white p-5 rounded-3xl border border-[#F1DDE7] shadow-xs mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-3">
          Select Difficulty
        </label>
        <div className="grid grid-cols-3 gap-3">
          {difficultyOptions.map((opt) => {
            const isSelected = puzzleDifficulty === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  onChangeDifficulty(opt.id);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FFF0F6] border-[#FF6B9D] text-[#E94F87] font-bold shadow-xs ring-2 ring-[#FF6B9D]/20"
                    : "border-[#F1DDE7] text-[#777183] hover:bg-[#FFF9FC]"
                }`}
              >
                <div className="text-sm font-bold">{opt.label}</div>
                <div className="text-[11px] opacity-80">{opt.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Photo Picker */}
        <div className="mt-5 pt-4 border-t border-[#F1DDE7]/60">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#292536] mb-2.5">
            Choose which photo to turn into the puzzle
          </label>
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  onSelectPuzzlePhoto(idx);
                }}
                className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  puzzlePhotoIndex === idx
                    ? "border-[#8B7CF6] ring-2 ring-[#8B7CF6]/30 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt="Puzzle selection"
                  className="w-full h-full object-cover"
                />
                {puzzlePhotoIndex === idx && (
                  <div className="absolute inset-0 bg-[#8B7CF6]/20 flex items-center justify-center text-white">
                    <Puzzle size={16} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Interactive Puzzle Simulator */}
      <div className="bg-[#FFF0F6]/50 p-6 rounded-3xl border border-[#F1DDE7] text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#8B7CF6] text-xs font-bold mb-4 shadow-2xs border border-[#F1DDE7]">
          <Sparkles size={13} />
          <span>Interactive Test Preview</span>
        </div>
        <PhotoPuzzle
          photoUrl={activePhoto.url}
          difficulty={puzzleDifficulty}
          key={`${activePhoto.url}-${puzzleDifficulty}`}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Write personal letter</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
