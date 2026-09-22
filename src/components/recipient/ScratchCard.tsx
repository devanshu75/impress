"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import { fireCuteConfetti } from "../common/Confetti";

interface ScratchCardProps {
  photoUrl: string;
  caption?: string;
  onRevealedComplete?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  photoUrl,
  caption,
  onRevealedComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  // Draw initial scratch foil on canvas
  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Cute pastel silver/pink foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#E9D5FF");
    gradient.addColorStop(0.5, "#FCE7F3");
    gradient.addColorStop(1, "#FED7AA");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil pattern / stars
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 35; i++) {
      const x = (i * 37) % width;
      const y = (i * 29) % height;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centered foil text
    ctx.fillStyle = "#6B7280";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch with finger or mouse ✨", width / 2, height / 2 - 12);

    ctx.fillStyle = "#E94F87";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("Hidden Memory Inside ♡", width / 2, height / 2 + 14);
  }, []);

  // Resize canvas to match display size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (!isRevealed) {
        initFoil();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initFoil, isRevealed]);

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Erase foil with round brush
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percent occasionally
    if (Math.random() > 0.6) {
      calculateProgress(ctx, canvas.width, canvas.height);
    }
  };

  const calculateProgress = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    try {
      const sampleStep = 8;
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
        totalSampled++;
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = (transparentPixels / totalSampled) * 100;
      setScratchProgress(Math.floor(percent));

      if (percent > 45 && !isRevealed) {
        setIsRevealed(true);
        sound.playSparkle();
        fireCuteConfetti({ count: 35, originY: 0.6 });
        if (onRevealedComplete) onRevealedComplete();
      }
    } catch (e) {}
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    sound.playPop();
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  // Touch handlers with passive prevention on canvas
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsScratching(true);
      sound.playPop();
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => setIsScratching(false);

  return (
    <div className="py-4 sm:py-6 px-4 max-w-lg mx-auto text-center">
      <div className="mb-5">
        <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
          Room 4 · The Secret Vault
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] tracking-tight">
          Scratch to Reveal ♡
        </h3>
        <p className="text-xs text-[#777183] mt-1">
          There&apos;s a secret memory hidden under the foil. Rub to unlock!
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-square w-full max-w-xs sm:max-w-sm mx-auto rounded-3xl overflow-hidden shadow-lg border-4 border-white select-none bg-[#FFF9FC]"
      >
        {/* Underneath Memory Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt="Hidden revealed memory"
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Revealed Badge & Caption */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 inset-x-3 bg-white/90 backdrop-blur-xs p-3 rounded-2xl shadow-sm border border-[#F1DDE7] text-center z-20"
            >
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E94F87] mb-0.5">
                <Sparkles size={12} />
                <span>Memory Unlocked!</span>
              </div>
              <p className="font-handwriting text-lg text-[#292536] leading-tight">
                {caption || "A moment we will never forget ✨"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper text / scratch indicator */}
      {!isRevealed ? (
        <p className="text-[11px] text-[#777183] mt-3 font-medium">
          {scratchProgress > 0 ? `${scratchProgress}% revealed` : "Rub with finger or mouse"}
        </p>
      ) : (
        <p className="text-xs text-[#E94F87] font-semibold mt-3 flex items-center justify-center gap-1">
          <Sparkles size={13} />
          <span>Secret memory uncovered! Proceed to the next room.</span>
        </p>
      )}
    </div>
  );
};
