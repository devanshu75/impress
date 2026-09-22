"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Puzzle,
  Mail,
  Scroll,
  Award,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { FloatingDecorations } from "@/components/common/FloatingDecorations";

export default function HomePage() {
  const rooms = [
    {
      icon: Clock,
      title: "The Hall of Days",
      desc: "Live animated counter of the exact days, hours, and laughs you've shared.",
      color: "from-[#FFB38A] to-[#FF6B9D]",
    },
    {
      icon: Layers,
      title: "Polaroid Scrapbook",
      desc: "Handcrafted photo cards with slight tilts, washi tape, and handwritten captions.",
      color: "from-[#FFD6E7] to-[#C8B6FF]",
    },
    {
      icon: Sparkles,
      title: "Scratch-To-Reveal",
      desc: "Interactive foil card. They rub with their finger to reveal a secret memory.",
      color: "from-[#8FE3CF] to-[#8ED8F8]",
    },
    {
      icon: Puzzle,
      title: "The Memory Puzzle",
      desc: "A broken photo they have to piece back together before unlocking the payoff.",
      color: "from-[#8B7CF6] to-[#C8B6FF]",
    },
    {
      icon: Mail,
      title: "The Sealed Letter",
      desc: "Arrives sealed with digital wax. They tap the seal to unfold your personal letter.",
      color: "from-[#FF6B9D] to-[#E94F87]",
    },
    {
      icon: Scroll,
      title: "The Rulebook & Signature",
      desc: "Tick your friendship rules and sign with their finger on a live canvas pad.",
      color: "from-[#FFD166] to-[#FFB38A]",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FFF9FC] bg-paper-grain selection:bg-[#FFD6E7] selection:text-[#E94F87] overflow-x-hidden">
      <FloatingDecorations density="medium" />

      {/* Top Navbar */}
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#E94F87] flex items-center justify-center text-white shadow-xs">
            <Heart size={16} className="fill-white" />
          </div>
          <span className="font-extrabold text-xl text-[#292536] tracking-tight">
            Amiverse<span className="text-[#FF6B9D]">.</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/m/demo"
            onClick={() => sound.playPop()}
            className="text-xs font-semibold text-[#777183] hover:text-[#E94F87] transition-colors px-3 py-2 rounded-full hover:bg-white/70"
          >
            Try Demo
          </Link>
          <Link
            href="/create/friendship"
            onClick={() => sound.playPop()}
            className="btn-cute-primary text-xs px-4 py-2"
          >
            <span>Create Gift</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-12 pb-20 text-center">
        {/* Cute Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F1DDE7] text-[#E94F87] text-xs font-bold shadow-xs mb-6"
        >
          <Sparkles size={14} className="text-[#FFB38A]" />
          <span>Not a flat greeting card · An interactive 9-room museum</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-[#292536] tracking-tight leading-[1.12] mb-6 max-w-2xl mx-auto"
        >
          Build your best friend a{" "}
          <span className="bg-gradient-to-r from-[#FF6B9D] via-[#8B7CF6] to-[#E94F87] bg-clip-text text-transparent">
            tiny digital world.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#777183] max-w-xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Because simple texts get buried and flat cards get thrown away. Craft a
          personalized memory museum filled with Polaroids, scratch-offs, puzzles,
          and a sealed letter from the heart.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/create/friendship"
            onClick={() => sound.playPop()}
            className="btn-cute-primary text-base px-8 py-4 w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            <span>Start creating for free</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/m/demo"
            onClick={() => sound.playChime()}
            className="btn-cute-secondary text-base px-8 py-4 w-full sm:w-auto bg-white"
          >
            <Sparkles size={16} className="text-[#FFB38A]" />
            <span>Experience sample museum</span>
          </Link>
        </motion.div>

        {/* Hero Interactive Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#F1DDE7] shadow-xl text-left"
        >
          <div className="w-24 h-5 bg-[#FFD166]/70 absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-1 rounded-2xs" />

          <div className="flex items-center justify-between border-b border-[#F1DDE7] pb-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#777183] block">
                Special Delivery Preview
              </span>
              <h2 className="text-xl font-bold text-[#292536]">
                Alex&apos;s Tiny Friendship Museum
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#E94F87] bg-[#FFF0F6] px-3 py-1 rounded-full">
              Alex + Sam ♡
            </span>
          </div>

          {/* Mini Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#FFF9FC] p-3 rounded-2xl border border-[#F1DDE7]">
              <span className="text-2xl block mb-1">⏳</span>
              <span className="text-xs font-bold text-[#292536] block">
                1,192 Days
              </span>
              <span className="text-[10px] text-[#777183]">Counter</span>
            </div>

            <div className="bg-[#FFF9FC] p-3 rounded-2xl border border-[#F1DDE7]">
              <span className="text-2xl block mb-1">📸</span>
              <span className="text-xs font-bold text-[#292536] block">
                Polaroids
              </span>
              <span className="text-[10px] text-[#777183]">Scrapbook</span>
            </div>

            <div className="bg-[#FFF9FC] p-3 rounded-2xl border border-[#F1DDE7]">
              <span className="text-2xl block mb-1">🧩</span>
              <span className="text-xs font-bold text-[#292536] block">
                Photo Puzzle
              </span>
              <span className="text-[10px] text-[#777183]">Interactive</span>
            </div>

            <div className="bg-[#FFF9FC] p-3 rounded-2xl border border-[#F1DDE7]">
              <span className="text-2xl block mb-1">💌</span>
              <span className="text-xs font-bold text-[#292536] block">
                Wax Seal
              </span>
              <span className="text-[10px] text-[#777183]">Personal Note</span>
            </div>
          </div>
        </motion.div>

        {/* Museum Rooms Showcase */}
        <section className="mt-28 mb-20 text-left">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#777183] font-bold block mb-1">
              Inside Every Museum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#292536] tracking-tight">
              A 9-room adventure they explore room by room
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rooms.map((room, idx) => {
              const Icon = room.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-[#F1DDE7] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${room.color} shadow-xs`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-lg text-[#292536] mb-2">
                      {room.title}
                    </h3>
                    <p className="text-xs text-[#777183] leading-relaxed">
                      {room.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cute Friendship Quote Callout */}
        <section className="bg-gradient-to-br from-[#FFF0F6] to-[#F3EEFF] p-8 sm:p-12 rounded-3xl border border-[#F1DDE7] text-center my-16">
          <span className="text-3xl block mb-3">🌸</span>
          <p className="text-xl sm:text-2xl font-handwriting text-[#292536] max-w-lg mx-auto mb-4">
            &ldquo;There are friends, there is family, and then there are friends
            who become family.&rdquo;
          </p>
          <Link
            href="/create/friendship"
            onClick={() => sound.playPop()}
            className="btn-cute-primary text-sm px-6 py-3 cursor-pointer mt-2"
          >
            <span>Surprise them today</span>
            <Heart size={14} className="fill-white" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F1DDE7] py-8 text-center text-xs text-[#777183] relative z-10 bg-white/40">
        <p className="font-medium">
          Amiverse ♡ Made with love for lifelong friendships
        </p>
        <p className="text-[11px] text-[#777183]/70 mt-1">
          Works seamlessly on iPhone, Android, tablets, and desktop
        </p>
      </footer>
    </div>
  );
}
