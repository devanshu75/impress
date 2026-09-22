"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ZoomIn } from "lucide-react";
import { FriendshipPhoto } from "@/lib/types";
import { sound } from "@/lib/sound";

interface MemoryGalleryProps {
  photos: FriendshipPhoto[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<FriendshipPhoto | null>(null);

  const rotations = [-2.5, 2.2, -1.8, 3.1, -2.8, 1.9, -1.5, 2.7];

  return (
    <div className="py-4 sm:py-6 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
          Room 3 · The Scrapbook
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] tracking-tight">
          Captured in time 📸
        </h3>
        <p className="text-xs text-[#777183] mt-1">
          Tap any Polaroid to look closer.
        </p>
      </div>

      {/* Responsive Gallery: Horizontal swipe on small screens, grid on tablet/desktop */}
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-x-auto pb-6 sm:overflow-visible no-scrollbar snap-x snap-mandatory px-2">
        {photos.map((photo, index) => {
          const rot = rotations[index % rotations.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playPop();
                setActivePhoto(photo);
              }}
              style={{ rotate: `${rot}deg` }}
              className="shrink-0 w-60 sm:w-auto snap-center relative polaroid-card cursor-pointer group"
            >
              {/* Cute Washi Tape at corner */}
              <div
                className={`w-14 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rounded-2xs shadow-2xs ${
                  index % 3 === 0
                    ? "bg-[#FFD166]/70"
                    : index % 3 === 1
                    ? "bg-[#FF6B9D]/40"
                    : "bg-[#C8B6FF]/60"
                }`}
              />

              {/* Photo Image Frame */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-[#FFF9FC] mb-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || "Friendship memory"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle zoom indicator on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn size={18} />
                </div>
              </div>

              {/* Handwritten Caption */}
              <p className="font-handwriting text-lg text-[#292536] text-center leading-snug min-h-[2.5rem] flex items-center justify-center px-1">
                {photo.caption || "A memory that will never fade ♡"}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white p-4 pb-6 rounded-2xl shadow-2xl border-4 border-white"
            >
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setActivePhoto(null);
                }}
                aria-label="Close photo preview"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#E94F87] transition-colors cursor-pointer z-10"
              >
                <X size={16} />
              </button>

              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-lg overflow-hidden bg-black mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption || "Expanded memory"}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center px-2">
                <p className="font-handwriting text-2xl text-[#292536] mb-1">
                  {activePhoto.caption || "Best memory together ♡"}
                </p>
                <span className="text-[11px] text-[#777183] flex items-center justify-center gap-1">
                  <Heart size={11} className="fill-[#FF6B9D] text-[#FF6B9D]" />
                  <span>Permanent core memory</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
