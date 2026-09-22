"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingDecorationsProps {
  density?: "low" | "medium" | "high";
  className?: string;
}

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({
  density = "medium",
  className = "",
}) => {
  const items = [
    { emoji: "✨", x: "8%", y: "15%", duration: 4.5, delay: 0 },
    { emoji: "💖", x: "88%", y: "18%", duration: 5.2, delay: 0.8 },
    { emoji: "⭐", x: "12%", y: "75%", duration: 4.8, delay: 1.2 },
    { emoji: "🌸", x: "85%", y: "80%", duration: 5.5, delay: 0.5 },
    { emoji: "☁️", x: "4%", y: "45%", duration: 6.0, delay: 1.5 },
    { emoji: "🎀", x: "92%", y: "50%", duration: 5.0, delay: 2.0 },
    { emoji: "💫", x: "50%", y: "6%", duration: 4.2, delay: 0.3 },
    { emoji: "🌷", x: "35%", y: "90%", duration: 5.8, delay: 1.8 },
    { emoji: "💌", x: "65%", y: "92%", duration: 4.9, delay: 2.3 },
  ];

  const count = density === "low" ? 4 : density === "medium" ? 6 : items.length;
  const activeItems = items.slice(0, count);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {activeItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-xl md:text-2xl opacity-70 filter drop-shadow-sm"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: ["0px", "-16px", "0px"],
            rotate: [0, index % 2 === 0 ? 12 : -12, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};
