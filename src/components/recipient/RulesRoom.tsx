"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Edit3, RotateCcw, ArrowRight } from "lucide-react";
import { FriendshipRule } from "@/lib/types";
import { sound } from "@/lib/sound";
import { fireCuteConfetti } from "../common/Confetti";

interface RulesRoomProps {
  rules: FriendshipRule[];
  recipientName: string;
  creatorName: string;
  onSignedComplete?: () => void;
}

export const RulesRoom: React.FC<RulesRoomProps> = ({
  rules,
  recipientName,
  creatorName,
  onSignedComplete,
}) => {
  const [agreedIds, setAgreedIds] = useState<string[]>([]);
  const [hasSigned, setHasSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Toggle rule agreement
  const handleToggleRule = (id: string) => {
    sound.playPop();
    setAgreedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Canvas signature logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#292536";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const allAgreed = agreedIds.length === rules.length;

  return (
    <div className="py-4 sm:py-6 px-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
          Room 7 · The Covenants
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#292536] tracking-tight">
          The Friendship Rulebook 📜
        </h3>
        <p className="text-xs text-[#777183] mt-1">
          Tick each promise and sign with your finger below.
        </p>
      </div>

      {/* Rules list */}
      <div className="space-y-2.5 mb-6">
        {rules.map((rule, index) => {
          const isAgreed = agreedIds.includes(rule.id);

          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleToggleRule(rule.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                isAgreed
                  ? "bg-[#FFF0F6] border-[#FF6B9D] shadow-xs"
                  : "bg-white border-[#F1DDE7] hover:border-[#FF6B9D]/50 shadow-2xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#E94F87]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-[#292536]">
                  {rule.text}
                </span>
              </div>

              {/* Checkbox button */}
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                  isAgreed
                    ? "bg-[#E94F87] text-white"
                    : "border-2 border-[#F1DDE7] bg-white text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Finger Signature Pad */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F1DDE7] shadow-sm text-center">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#292536] flex items-center gap-1.5">
            <Edit3 size={14} className="text-[#FF6B9D]" />
            <span>Sign with your finger or mouse</span>
          </span>

          {hasSigned && (
            <button
              type="button"
              onClick={clearSignature}
              className="text-[11px] font-semibold text-[#777183] hover:text-[#E94F87] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="relative border-2 border-dashed border-[#F1DDE7] rounded-2xl bg-[#FFFDF9] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={340}
            height={100}
            onMouseDown={(e) => startDrawing(e.clientX, e.clientY)}
            onMouseMove={(e) => draw(e.clientX, e.clientY)}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              if (e.touches[0])
                startDrawing(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (e.touches[0])
                draw(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={stopDrawing}
            style={{ touchAction: "none" }}
            className="w-full h-[100px] cursor-crosshair"
          />

          {!hasSigned && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-[#777183]/50 font-handwriting text-lg">
              Sign here... ✍️
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-[#777183]">
          <span>
            {allAgreed ? "All promises ticked! ✓" : `Ticked ${agreedIds.length}/${rules.length}`}
          </span>
          <span className="font-semibold text-[#292536]">
            {recipientName} & {creatorName}
          </span>
        </div>
      </div>

      {allAgreed && hasSigned && onSignedComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center"
        >
          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              fireCuteConfetti({ count: 60 });
              onSignedComplete();
            }}
            className="btn-cute-primary w-full py-3.5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Seal Our Covenant & Open Certificate ✨</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
