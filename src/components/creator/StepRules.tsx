"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ArrowRight, Sparkles, Scroll } from "lucide-react";
import { FriendshipRule } from "@/lib/types";
import { sound } from "@/lib/sound";

interface StepRulesProps {
  rules: FriendshipRule[];
  onChangeRules: (rules: FriendshipRule[]) => void;
  onNext: () => void;
}

export const StepRules: React.FC<StepRulesProps> = ({
  rules,
  onChangeRules,
  onNext,
}) => {
  const [newRuleText, setNewRuleText] = useState("");

  const handleAddRule = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newRuleText.trim()) return;

    sound.playPop();
    const newRule: FriendshipRule = {
      id: `rule-${Date.now()}`,
      text: newRuleText.trim(),
    };
    onChangeRules([...rules, newRule]);
    setNewRuleText("");
  };

  const handleDeleteRule = (id: string) => {
    sound.playPop();
    onChangeRules(rules.filter((r) => r.id !== id));
  };

  const handleUpdateRuleText = (id: string, text: string) => {
    onChangeRules(
      rules.map((r) => (r.id === id ? { ...r, text } : r))
    );
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="text-3xl block mb-2">📜</span>
        <h2 className="text-3xl font-bold text-[#292536] mb-2 tracking-tight">
          The Friendship Rulebook
        </h2>
        <p className="text-[#777183] text-sm">
          The holy covenants of your friendship. Your friend will have to agree and sign them at the end!
        </p>
      </motion.div>

      {/* Rules Cards List */}
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative p-4 rounded-2xl bg-white border border-[#F1DDE7] shadow-xs flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F6] text-[#E94F87] font-extrabold text-xs flex items-center justify-center shrink-0 border border-[#FF6B9D]/30">
                #{String(index + 1).padStart(2, "0")}
              </div>

              <input
                type="text"
                value={rule.text}
                onChange={(e) => handleUpdateRuleText(rule.id, e.target.value)}
                className="flex-1 text-sm font-medium text-[#292536] bg-transparent border-none focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => handleDeleteRule(rule.id)}
                aria-label="Delete rule"
                className="w-7 h-7 rounded-lg text-[#777183] hover:text-[#E94F87] hover:bg-[#FFF0F6] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Custom Rule Form */}
      <form onSubmit={handleAddRule} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Add custom rule (e.g. 5-minute debriefs are legally binding)..."
          value={newRuleText}
          onChange={(e) => setNewRuleText(e.target.value)}
          maxLength={100}
          className="flex-1 px-4 py-3 rounded-2xl border border-[#F1DDE7] bg-white text-[#292536] placeholder:text-[#777183]/50 focus:outline-none focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/15 text-sm"
        />
        <button
          type="submit"
          disabled={!newRuleText.trim()}
          className="btn-cute-primary px-4 py-3 text-sm cursor-pointer disabled:opacity-50"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </form>

      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          disabled={rules.length === 0}
          className="btn-cute-primary cursor-pointer"
        >
          <span>Preview recipient museum</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
