"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Puzzle,
  Sparkles,
  ArrowRight,
  Plus,
  RefreshCw,
  Eye,
} from "lucide-react";
import { FriendshipPhoto } from "@/lib/types";
import { SAMPLE_PHOTOS } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface StepPhotosProps {
  photos: FriendshipPhoto[];
  puzzlePhotoIndex: number;
  scratchPhotoIndex: number;
  onChangePhotos: (photos: FriendshipPhoto[]) => void;
  onSelectPuzzlePhoto: (index: number) => void;
  onSelectScratchPhoto: (index: number) => void;
  onNext: () => void;
}

async function compressImageFile(file: File, maxWidth = 800, quality = 0.72): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve("");
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve((reader.result as string) || "");
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve((reader.result as string) || "");
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const StepPhotos: React.FC<StepPhotosProps> = ({
  photos,
  puzzlePhotoIndex,
  scratchPhotoIndex,
  onChangePhotos,
  onSelectPuzzlePhoto,
  onSelectScratchPhoto,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const rotations = [-2.5, 2, -1.8, 2.5, -2, 1.5, -1.2, 2.2];

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (imageFiles.length === 0) return;

    sound.playPop();
    setIsCompressing(true);

    try {
      const compressedUrls = await Promise.all(
        imageFiles.map((file) => compressImageFile(file))
      );

      const newPhotos: FriendshipPhoto[] = compressedUrls
        .filter((url) => Boolean(url))
        .map((url) => ({
          id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          url,
          caption: "A core memory with you ♡",
        }));

      if (newPhotos.length > 0) {
        onChangePhotos([...photos, ...newPhotos]);
      }
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDeletePhoto = (index: number) => {
    sound.playPop();
    const updated = photos.filter((_, i) => i !== index);
    onChangePhotos(updated);
    if (puzzlePhotoIndex >= updated.length) {
      onSelectPuzzlePhoto(Math.max(0, updated.length - 1));
    }
  };

  const handleLoadSamplePhotos = () => {
    sound.playSparkle();
    onChangePhotos(SAMPLE_PHOTOS);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl block mb-2">📸</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          Add your favorite memories
        </h2>
        <p className="text-[#777183] text-sm">
          Upload 4 to 8 photos. One becomes a secret scratch-off, and one turns into a puzzle they solve!
        </p>
      </motion.div>

      {/* Preset helper bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#777183]">
          {photos.length} photos added (4-8 recommended)
        </span>
        <button
          type="button"
          onClick={handleLoadSamplePhotos}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7CF6] hover:text-[#7665E8] bg-white px-3 py-1.5 rounded-full border border-[#F1DDE7] shadow-xs cursor-pointer transition-colors"
        >
          <RefreshCw size={12} />
          <span>Load sample aesthetic photos</span>
        </button>
      </div>

      {/* Upload Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all duration-200 mb-8 ${
          isDragging
            ? "border-[#FF6B9D] bg-[#FFF0F6]"
            : "border-[#F1DDE7] hover:border-[#FF6B9D] bg-white/60 hover:bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <div className="w-12 h-12 rounded-2xl bg-[#FFF0F6] text-[#FF6B9D] flex items-center justify-center mx-auto mb-3 shadow-xs">
          {isCompressing ? (
            <RefreshCw size={22} className="animate-spin" />
          ) : (
            <Upload size={22} />
          )}
        </div>
        <p className="text-sm font-bold text-[#292536] mb-1">
          {isCompressing
            ? "Optimizing photos for seamless sharing..."
            : "Click or drop photos here"}
        </p>
        <p className="text-xs text-[#777183]">
          {isCompressing
            ? "Compressing lightly to ensure fast link loading ✨"
            : "JPG, PNG, WebP up to 10MB each"}
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {photos.map((photo, index) => {
            const rot = rotations[index % rotations.length];
            const isPuzzle = puzzlePhotoIndex === index;
            const isScratch = scratchPhotoIndex === index;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ rotate: `${rot}deg` }}
                className="relative bg-white p-2.5 pb-5 rounded-lg shadow-sm border border-[#F1DDE7] group transition-transform hover:z-20 hover:scale-105"
              >
                {/* Washi tape header */}
                <div className="w-12 h-3.5 bg-[#FFD166]/60 absolute -top-1.5 left-1/2 -translate-x-1/2 -rotate-1 rounded-2xs" />

                {/* Photo Image */}
                <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#FFF9FC] mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption || "Friendship memory"}
                    className="w-full h-full object-cover"
                  />

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(index);
                    }}
                    aria-label="Delete photo"
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[#E94F87]"
                  >
                    <Trash2 size={12} />
                  </button>

                  {/* Badges for Puzzle and Scratch */}
                  <div className="absolute bottom-1.5 left-1.5 flex flex-col gap-1">
                    {isPuzzle && (
                      <span className="bg-[#8B7CF6] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Puzzle size={10} />
                        Puzzle
                      </span>
                    )}
                    {isScratch && (
                      <span className="bg-[#E94F87] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles size={10} />
                        Secret Scratch
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive assignment buttons */}
                <div className="flex items-center justify-between gap-1 mt-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      onSelectPuzzlePhoto(index);
                    }}
                    className={`flex-1 py-1 rounded-md font-semibold transition-colors ${
                      isPuzzle
                        ? "bg-[#8B7CF6] text-white"
                        : "bg-[#F3EEFF] text-[#8B7CF6] hover:bg-[#8B7CF6]/20"
                    }`}
                  >
                    🧩 Puzzle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      onSelectScratchPhoto(index);
                    }}
                    className={`flex-1 py-1 rounded-md font-semibold transition-colors ${
                      isScratch
                        ? "bg-[#E94F87] text-white"
                        : "bg-[#FFF0F6] text-[#E94F87] hover:bg-[#FF6B9D]/20"
                    }`}
                  >
                    ✨ Scratch
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Continue */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          disabled={photos.length === 0}
          className={`btn-cute-primary cursor-pointer ${
            photos.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>Write memory captions</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
