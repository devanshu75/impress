"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FriendshipGift } from "@/lib/types";
import { MuseumEntrance } from "./MuseumEntrance";
import { FriendshipCounter } from "./FriendshipCounter";
import { VibeRoom } from "./VibeRoom";
import { MemoryGallery } from "./MemoryGallery";
import { ScratchCard } from "./ScratchCard";
import { PuzzleRoom } from "./PuzzleRoom";
import { LetterRoom } from "./LetterRoom";
import { RulesRoom } from "./RulesRoom";
import { CertificateRoom } from "./CertificateRoom";
import { FloatingDecorations } from "../common/FloatingDecorations";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface MuseumExperienceProps {
  gift: FriendshipGift;
}

const ROOM_CONFIGS = [
  { step: 1, title: "The Hall of Days", tag: "Room 1 · History" },
  { step: 2, title: "The Frequency", tag: "Room 2 · Vibe & Heart" },
  { step: 3, title: "The Scrapbook", tag: "Room 3 · Gallery" },
  { step: 4, title: "The Secret Vault", tag: "Room 4 · Mystery" },
  { step: 5, title: "The Restoration Desk", tag: "Room 5 · Photo Puzzle" },
  { step: 6, title: "The Reading Room", tag: "Room 6 · Sealed Letter" },
  { step: 7, title: "The Covenants", tag: "Room 7 · Rulebook" },
  { step: 8, title: "The Grand Certificate", tag: "Room 8 · Keepsake" },
];

export const MuseumExperience: React.FC<MuseumExperienceProps> = ({ gift }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(1);
  const totalRooms = ROOM_CONFIGS.length;

  // Scratch photo selection fallback
  const scratchPhoto =
    gift.photos[gift.scratchPhotoIndex ?? 1] ||
    gift.photos[0] || {
      url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800",
      caption: "Our secret chaotic moment ✨",
    };

  // Puzzle photo selection fallback
  const puzzlePhoto =
    gift.photos[gift.puzzlePhotoIndex ?? 0] ||
    gift.photos[0] || {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    };

  // Scroll to top on room change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentRoom, hasEntered]);

  const handleNextRoom = () => {
    sound.playPop();
    setCurrentRoom((prev) => Math.min(totalRooms, prev + 1));
  };

  const handlePrevRoom = () => {
    sound.playPop();
    setCurrentRoom((prev) => Math.max(1, prev - 1));
  };

  const handleReplay = () => {
    sound.playSparkle();
    setCurrentRoom(1);
    setHasEntered(false);
  };

  const safeRoom = Math.max(1, Math.min(currentRoom, totalRooms));
  const currentRoomInfo = ROOM_CONFIGS[safeRoom - 1] || ROOM_CONFIGS[0];

  return (
    <div className="relative min-h-screen bg-[#FFF9FC] bg-paper-grain selection:bg-[#FFD6E7] selection:text-[#E94F87] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <MuseumEntrance
            key="entrance"
            recipientName={gift.recipientName}
            creatorName={gift.creatorName}
            onEnter={() => {
              setHasEntered(true);
              setCurrentRoom(1);
            }}
          />
        ) : (
          <motion.div
            key="room-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col justify-between w-full"
          >
            <FloatingDecorations density="low" />

            {/* Room Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#FFF9FC]/90 backdrop-blur-md border-b border-[#F1DDE7]/70 py-3 px-4 shadow-2xs">
              <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
                {/* Back button */}
                <button
                  type="button"
                  onClick={handlePrevRoom}
                  disabled={safeRoom <= 1}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    safeRoom > 1
                      ? "text-[#292536] hover:text-[#E94F87] hover:bg-white cursor-pointer shadow-2xs"
                      : "opacity-25 cursor-not-allowed text-[#777183]"
                  }`}
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">Previous Room</span>
                </button>

                {/* Room Title & Step Counter */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-[#E94F87] uppercase">
                    <span>{currentRoomInfo?.tag ?? `Room ${safeRoom}`}</span>
                    <span className="text-[#777183]">·</span>
                    <span className="text-[#777183]">
                      {safeRoom}/{totalRooms}
                    </span>
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#292536] truncate max-w-[200px] sm:max-w-xs">
                    {currentRoomInfo?.title ?? "Friendship Experience"}
                  </h2>
                </div>

                {/* Next button */}
                {safeRoom < totalRooms ? (
                  <button
                    type="button"
                    onClick={handleNextRoom}
                    className="btn-cute-primary text-xs px-3.5 py-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Next Room</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <div className="w-16" />
                )}
              </div>

              {/* Progress Track */}
              <div className="max-w-3xl mx-auto mt-2 w-full h-1 bg-[#FFF0F6] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF6B9D] via-[#8B7CF6] to-[#8FE3CF]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.round((safeRoom / totalRooms) * 100)}%`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </header>

            {/* Room Main Content with Slide Transitions */}
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-4 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeRoom}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="w-full"
                >
                  {/* ROOM 1: Friendship Counter */}
                  {safeRoom === 1 && (
                    <div className="space-y-4">
                      <div className="text-center pt-2">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#777183] block mb-1">
                          Dedicated for {gift.recipientName} from {gift.creatorName || "your bestie"} ♡
                        </span>
                      </div>
                      <FriendshipCounter
                        startDate={gift.friendshipDate}
                        recipientName={gift.recipientName}
                      />
                    </div>
                  )}

                  {/* ROOM 2: Vibe & Heartfelt Note */}
                  {safeRoom === 2 && (
                    <VibeRoom
                      vibeId={gift.vibe}
                      whyTheyMatter={gift.whyTheyMatter}
                      howWeMet={gift.howWeMet}
                      recipientName={gift.recipientName}
                      creatorName={gift.creatorName}
                    />
                  )}

                  {/* ROOM 3: Memory Polaroid Scrapbook */}
                  {safeRoom === 3 && (
                    <MemoryGallery photos={gift.photos} />
                  )}

                  {/* ROOM 4: Secret Scratch Card */}
                  {safeRoom === 4 && (
                    <ScratchCard
                      photoUrl={scratchPhoto.url}
                      caption={scratchPhoto.caption}
                    />
                  )}

                  {/* ROOM 5: Photo Puzzle */}
                  {safeRoom === 5 && (
                    <PuzzleRoom
                      photoUrl={puzzlePhoto.url}
                      difficulty={gift.puzzleDifficulty}
                    />
                  )}

                  {/* ROOM 6: Sealed Envelope & Letter */}
                  {safeRoom === 6 && (
                    <LetterRoom
                      recipientName={gift.recipientName}
                      creatorName={gift.creatorName}
                      letterText={gift.letter || ""}
                    />
                  )}

                  {/* ROOM 7: Friendship Rulebook & Signature */}
                  {safeRoom === 7 && (
                    <RulesRoom
                      rules={gift.rules}
                      recipientName={gift.recipientName}
                      creatorName={gift.creatorName}
                      onSignedComplete={handleNextRoom}
                    />
                  )}

                  {/* ROOM 8: Official Friendship Certificate */}
                  {safeRoom === 8 && (
                    <CertificateRoom
                      recipientName={gift.recipientName}
                      creatorName={gift.creatorName}
                      friendshipDate={gift.friendshipDate}
                      onReplay={handleReplay}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Bottom Room Navigation Bar */}
            {safeRoom < totalRooms && (
              <footer className="sticky bottom-0 z-30 bg-gradient-to-t from-[#FFF9FC] via-[#FFF9FC]/95 to-transparent pt-4 pb-6 px-4">
                <div className="max-w-md mx-auto flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevRoom}
                    disabled={safeRoom <= 1}
                    className={`btn-cute-secondary text-xs px-4 py-2.5 bg-white ${
                      safeRoom <= 1 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextRoom}
                    className="btn-cute-primary text-sm px-6 py-3 flex-1 justify-center shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>
                      {safeRoom === 1
                        ? "Enter Room 2: Our Vibe"
                        : safeRoom === 2
                        ? "Enter Room 3: The Scrapbook"
                        : safeRoom === 3
                        ? "Enter Room 4: The Secret Vault"
                        : safeRoom === 4
                        ? "Enter Room 5: The Puzzle"
                        : safeRoom === 5
                        ? "Enter Room 6: Sealed Letter"
                        : safeRoom === 6
                        ? "Enter Room 7: The Rulebook"
                        : "Enter Room 8: The Certificate"}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </footer>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
