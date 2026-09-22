"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, CheckCircle } from "lucide-react";
import { PuzzleDifficulty } from "@/lib/types";
import { sound } from "@/lib/sound";
import { fireCuteConfetti } from "../common/Confetti";

interface PhotoPuzzleProps {
  photoUrl: string;
  difficulty: PuzzleDifficulty;
  onSolve?: () => void;
  isRecipientView?: boolean;
}

export const PhotoPuzzle: React.FC<PhotoPuzzleProps> = ({
  photoUrl,
  difficulty,
  onSolve,
  isRecipientView = false,
}) => {
  const gridSize = difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 4;
  const totalPieces = gridSize * gridSize;

  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize and shuffle
  const initializePuzzle = useCallback(() => {
    const initial = Array.from({ length: totalPieces }, (_, i) => i);
    let shuffled = [...initial];
    let isSame = true;
    while (isSame && totalPieces > 1) {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
      isSame = shuffled.every((val, idx) => val === idx);
    }
    setPieces(shuffled);
    setSelectedPieceIndex(null);
    setIsSolved(false);
    setMoves(0);
  }, [totalPieces]);

  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle, photoUrl, difficulty]);

  const handleTileClick = (clickedPosition: number) => {
    if (isSolved) return;
    sound.playPop();

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(clickedPosition);
    } else {
      if (selectedPieceIndex === clickedPosition) {
        setSelectedPieceIndex(null);
        return;
      }

      // Swap pieces
      const newPieces = [...pieces];
      const temp = newPieces[selectedPieceIndex];
      newPieces[selectedPieceIndex] = newPieces[clickedPosition];
      newPieces[clickedPosition] = temp;

      setPieces(newPieces);
      setSelectedPieceIndex(null);
      setMoves((prev) => prev + 1);

      // Check if solved
      const solved = newPieces.every((val, idx) => val === idx);
      if (solved) {
        setIsSolved(true);
        sound.playChime();
        fireCuteConfetti({ count: 50, originY: 0.6 });
        if (onSolve) onSolve();
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Controls & Moves */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-semibold text-[#777183] flex items-center gap-1">
          <Sparkles size={13} className="text-[#FFB38A]" />
          <span>Moves: {moves}</span>
        </span>

        <button
          type="button"
          onClick={() => {
            sound.playPop();
            initializePuzzle();
          }}
          className="text-xs font-medium text-[#777183] hover:text-[#E94F87] flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#F1DDE7] shadow-2xs cursor-pointer"
        >
          <RotateCcw size={11} />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Puzzle Board */}
      <div
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF0F6] border-4 border-white shadow-md p-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "3px",
        }}
      >
        {pieces.map((originalIndex, currentPosition) => {
          const isSelected = selectedPieceIndex === currentPosition;
          const isCorrect = originalIndex === currentPosition;

          const row = Math.floor(originalIndex / gridSize);
          const col = originalIndex % gridSize;
          const bgX = (col / (gridSize - 1)) * 100;
          const bgY = (row / (gridSize - 1)) * 100;

          return (
            <motion.div
              key={`${currentPosition}-${originalIndex}`}
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={() => handleTileClick(currentPosition)}
              className={`relative cursor-pointer rounded-lg overflow-hidden select-none transition-all duration-150 ${
                isSelected
                  ? "ring-4 ring-[#FF6B9D] scale-95 z-20 shadow-md"
                  : isSolved
                  ? "ring-0"
                  : "hover:scale-[1.02] active:scale-95"
              }`}
              style={{
                backgroundImage: `url(${photoUrl})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${bgX}% ${bgY}%`,
              }}
            >
              {!isSolved && isCorrect && (
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#8FE3CF]/90 shadow-2xs" />
              )}
            </motion.div>
          );
        })}

        {/* Celebration Overlay */}
        <AnimatePresence>
          {isSolved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFF0F6] border border-[#FF6B9D] flex items-center justify-center mb-3 shadow-xs">
                <CheckCircle size={28} className="text-[#E94F87]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#292536] mb-1">
                YOU DID IT! ♡
              </h3>
              <p className="text-xs text-[#777183] max-w-xs mb-4">
                Some memories just fit together perfectly.
              </p>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  initializePuzzle();
                }}
                className="btn-cute-secondary text-xs px-4 py-2"
              >
                Solve again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-[#777183] text-center mt-3 font-medium">
        {isSolved
          ? "✨ Memory restored perfectly!"
          : "Tap a piece, then tap another piece to swap them"}
      </p>
    </div>
  );
};
