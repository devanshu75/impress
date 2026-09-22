"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Plus,
  RotateCcw,
  Check,
  Eye,
  MessageSquare,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface StepWhyTheyMatterProps {
  whyTheyMatter: string;
  recipientName: string;
  onChangeWhyTheyMatter: (val: string) => void;
  onNext: () => void;
}

interface PresetCategory {
  label: string;
  emoji: string;
  text: string;
}

export const StepWhyTheyMatter: React.FC<StepWhyTheyMatterProps> = ({
  whyTheyMatter,
  recipientName,
  onChangeWhyTheyMatter,
  onNext,
}) => {
  const maxChars = 1200;
  const currentLength = whyTheyMatter.length;
  const targetName = recipientName.trim() || "they";

  const [customTagInput, setCustomTagInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Curated presets tailored for different friendship dynamics
  const presetTemplates: PresetCategory[] = [
    {
      label: "Emergency Contact",
      emoji: "🚨",
      text: `You never let me spiral alone, and you always tell me when I'm being an idiot. You laugh at my worst jokes, you've seen me at my absolute lowest and stayed, and you make even the most boring days fun. You are my emergency contact in every sense of the word. Forever grateful to have you in my corner. ♡`,
    },
    {
      label: "Heartfelt & Deep",
      emoji: "🌸",
      text: `Because in a world that constantly moves too fast, talking to you feels like exhaling. You're the first person I want to text when life gets overwhelming or when something unbelievable happens. Thank you for showing up for the quiet Tuesdays just as fiercely as the chaotic weekends.`,
    },
    {
      label: "The Chaos Duo",
      emoji: "⚡",
      text: `Because two unhinged minds sharing one collective thought is dangerous, and I wouldn't trade it for anything. From questionable late-night decisions to laughing so hard our stomachs hurt in places we were supposed to be quiet, there's nobody else I'd rather cause absolute chaos with.`,
    },
    {
      label: "Day-One / Lifelong",
      emoji: "🧸",
      text: `You've seen every awkward phase, listened to every rant, and never once judged my worst ideas. Having you in my corner makes every challenge feel manageable and every ordinary day feel like an adventure.`,
    },
    {
      label: "Comfort Person",
      emoji: "☕",
      text: `Because some people are just home in human form. You have this magical ability to make any bad day feel lighter just by being around. Forever grateful to have you in my corner. ♡`,
    },
  ];

  // Quick one-line inspiration sparks
  const [promptSparks, setPromptSparks] = useState<string[]>([
    "You never let me spiral alone.",
    "You tell me when I am being an idiot.",
    "You laugh at my worst jokes.",
    "You are my emergency contact.",
    "You have seen me at my worst.",
    "You make boring days fun.",
    "Always answers the phone when life gets heavy.",
    "Never judges my weirdest impulses.",
  ]);

  const handleApplyPreset = (presetText: string) => {
    sound.playSparkle();
    onChangeWhyTheyMatter(presetText);
  };

  const handleAppendSpark = (spark: string) => {
    sound.playPop();
    const separator = whyTheyMatter.trim() ? " " : "";
    const updated = `${whyTheyMatter.trim()}${separator}${spark}`;
    if (updated.length <= maxChars) {
      onChangeWhyTheyMatter(updated);
    }
  };

  const handleAddCustomTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const tag = customTagInput.trim();
    if (!tag) return;

    sound.playPop();
    if (!promptSparks.includes(tag)) {
      setPromptSparks((prev) => [tag, ...prev]);
    }
    // Also append to textarea
    handleAppendSpark(tag);
    setCustomTagInput("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl block mb-2">🌸</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          What makes {targetName} your person?
        </h2>
        <p className="text-[#777183] text-sm">
          Speak from the heart. You can type freely, add custom reason tags, or click any preset to customize!
        </p>
      </motion.div>

      {/* Preset Cards Carousel / Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#777183] flex items-center gap-1">
            <Sparkles size={13} className="text-[#FFB38A]" />
            <span>Ready-made Vibe Templates (Click to fill)</span>
          </span>
          {whyTheyMatter && (
            <button
              type="button"
              onClick={() => onChangeWhyTheyMatter("")}
              className="text-[11px] font-semibold text-[#777183] hover:text-[#E94F87] transition-colors cursor-pointer"
            >
              Clear text
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {presetTemplates.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.text)}
              className="p-3 rounded-2xl bg-white border border-[#F1DDE7] hover:border-[#FF6B9D] hover:bg-[#FFF0F6] text-left transition-all shadow-2xs group cursor-pointer"
            >
              <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">
                {preset.emoji}
              </span>
              <span className="text-xs font-bold text-[#292536] block group-hover:text-[#E94F87]">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Editor Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-xs mb-6">
        <div className="relative">
          <textarea
            rows={6}
            maxLength={maxChars}
            placeholder={`Tell ${targetName} why their presence is irreplaceable in your life...\n\n(e.g., You're the one person who always understands my chaos, never judges my questionable 2 AM thoughts, and makes ordinary days feel magical...)`}
            value={whyTheyMatter}
            onChange={(e) => onChangeWhyTheyMatter(e.target.value)}
            className="w-full p-4 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#FF6B9D] focus:ring-3 focus:ring-[#FF6B9D]/15 transition-all text-base leading-relaxed resize-y font-sans"
          />

          <div className="flex items-center justify-between mt-2 px-1 text-xs">
            <span className="text-[#777183] flex items-center gap-1 font-medium">
              <Heart size={13} className="text-[#FF6B9D] fill-[#FF6B9D]" />
              Speaks right to their heart
            </span>
            <span
              className={`font-semibold ${
                currentLength > maxChars * 0.9
                  ? "text-[#E94F87]"
                  : "text-[#777183]"
              }`}
            >
              {currentLength} / {maxChars}
            </span>
          </div>
        </div>

        {/* Custom Tag Input Form */}
        <div className="mt-5 pt-4 border-t border-[#F1DDE7]/60">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#777183] mb-2">
            Add Your Own Custom Reasons / Tags
          </label>
          <form onSubmit={handleAddCustomTag} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="e.g. Makes the best late-night pasta, Always has my back..."
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#F1DDE7] bg-[#FFF9FC] text-sm text-[#292536] focus:outline-none focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/15"
            />
            <button
              type="submit"
              disabled={!customTagInput.trim()}
              className="btn-cute-primary text-xs px-4 py-2.5 cursor-pointer disabled:opacity-50"
            >
              <Plus size={14} />
              <span>Add to note</span>
            </button>
          </form>

          {/* Prompt sparks list */}
          <div className="flex flex-wrap gap-2">
            {promptSparks.map((spark, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAppendSpark(spark)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#FFF0F6] border border-[#F1DDE7] text-[#292536] hover:border-[#FF6B9D] hover:text-[#E94F87] transition-all cursor-pointer text-left"
              >
                + &ldquo;{spark}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Museum Card Preview Toggle */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setShowPreview(!showPreview);
          }}
          className="text-xs font-semibold text-[#8B7CF6] hover:text-[#E94F87] flex items-center gap-1.5 mx-auto cursor-pointer"
        >
          <Eye size={14} />
          <span>{showPreview ? "Hide Museum Card Preview" : "Preview how it looks in their museum"}</span>
        </button>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="relative bg-[#FFFDF9] rounded-3xl p-6 border border-[#F1DDE7] shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-4 bg-[#FFB38A]/70 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-2 rounded-2xs" />
                <div className="flex items-center justify-between border-b border-[#F1DDE7] pb-2 mb-3">
                  <span className="text-xs uppercase tracking-widest text-[#777183] font-bold">
                    Why You&apos;re My Person
                  </span>
                  <Heart size={14} className="fill-[#FF6B9D] text-[#FF6B9D]" />
                </div>
                <p className="text-sm text-[#292536] leading-relaxed italic whitespace-pre-wrap">
                  &ldquo;{whyTheyMatter || "Tell them why their presence makes life so much sweeter..."}&rdquo;
                </p>
                <div className="mt-3 pt-2 border-t border-[#F1DDE7]/50 text-right">
                  <span className="text-xs font-handwriting text-[#8B7CF6] font-bold">
                    — From your best friend ♡
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Choose friendship photos</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
