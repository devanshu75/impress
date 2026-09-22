"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";

export const SoundToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(sound.isMuted);
  }, []);

  const handleToggle = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#F1DDE7] text-[#777183] hover:text-[#E94F87] hover:border-[#FF6B9D] shadow-sm transition-all duration-200 text-xs font-medium ${className}`}
    >
      {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#FF6B9D]" />}
      <span>{muted ? "Sound Off" : "Sound On"}</span>
    </button>
  );
};
