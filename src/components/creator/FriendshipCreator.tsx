"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FriendshipGift, DEFAULT_RULES } from "@/lib/types";
import {
  SAMPLE_PHOTOS,
  saveGift,
  saveCreatorDraft,
  getCreatorDraft,
} from "@/lib/storage";
import { StepProgress } from "./StepProgress";
import { StepWelcome } from "./StepWelcome";
import { StepNames } from "./StepNames";
import { StepStory } from "./StepStory";
import { StepVibe } from "./StepVibe";
import { StepWhyTheyMatter } from "./StepWhyTheyMatter";
import { StepPhotos } from "./StepPhotos";
import { StepCaptions } from "./StepCaptions";
import { StepPuzzle } from "./StepPuzzle";
import { StepLetter } from "./StepLetter";
import { StepRules } from "./StepRules";
import { StepPreview } from "./StepPreview";

const STEP_TITLES = [
  "Welcome",
  "Names",
  "Friendship Story",
  "Friendship Vibe",
  "Why They Matter",
  "Favorite Photos",
  "Handwritten Captions",
  "Photo Puzzle",
  "Personal Letter",
  "Friendship Rules",
  "Museum Preview",
];

export const FriendshipCreator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [gift, setGift] = useState<FriendshipGift>({
    id: `gift-${Date.now().toString(36)}`,
    creatorName: "",
    recipientName: "",
    friendshipDate: "2021-06-18",
    howWeMet: "We bonded over mutual chaos and never looked back.",
    vibe: "chaos-duo",
    whyTheyMatter: "You are the only person who understands my exact brand of unhinged thoughts.",
    photos: SAMPLE_PHOTOS,
    puzzleDifficulty: "easy",
    puzzlePhotoIndex: 1,
    scratchPhotoIndex: 2,
    letter: "Dearest bestie,\n\nLife is just so much brighter with you in it. Thank you for always being you.\n\nWith love ♡",
    rules: DEFAULT_RULES,
    createdAt: new Date().toISOString(),
  });

  // Restore draft on mount
  useEffect(() => {
    const draft = getCreatorDraft();
    if (draft) {
      setGift((prev) => ({
        ...prev,
        ...draft,
        photos: draft.photos && draft.photos.length > 0 ? draft.photos : prev.photos,
        rules: draft.rules && draft.rules.length > 0 ? draft.rules : prev.rules,
      }));
    }
  }, []);

  // Autosave draft on change
  useEffect(() => {
    saveCreatorDraft(gift);
    saveGift(gift);
  }, [gift]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEP_TITLES.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFF9FC] bg-paper-grain flex flex-col justify-between pb-12">
      {/* Step Progress Top Bar */}
      <StepProgress
        currentStep={currentStep}
        totalSteps={STEP_TITLES.length}
        stepTitle={STEP_TITLES[currentStep - 1] || ""}
        onBack={handleBack}
        canGoBack={currentStep > 1}
      />

      {/* Step Content with Animated Transition */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {currentStep === 1 && <StepWelcome onNext={handleNext} />}

            {currentStep === 2 && (
              <StepNames
                recipientName={gift.recipientName}
                creatorName={gift.creatorName}
                onChangeRecipient={(val) =>
                  setGift((g) => ({ ...g, recipientName: val }))
                }
                onChangeCreator={(val) =>
                  setGift((g) => ({ ...g, creatorName: val }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 3 && (
              <StepStory
                friendshipDate={gift.friendshipDate || ""}
                howWeMet={gift.howWeMet || ""}
                onChangeDate={(val) =>
                  setGift((g) => ({ ...g, friendshipDate: val }))
                }
                onChangeHowWeMet={(val) =>
                  setGift((g) => ({ ...g, howWeMet: val }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 4 && (
              <StepVibe
                selectedVibe={gift.vibe || "chaos-duo"}
                onSelectVibe={(vibeId) =>
                  setGift((g) => ({ ...g, vibe: vibeId }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 5 && (
              <StepWhyTheyMatter
                whyTheyMatter={gift.whyTheyMatter || ""}
                recipientName={gift.recipientName}
                onChangeWhyTheyMatter={(val) =>
                  setGift((g) => ({ ...g, whyTheyMatter: val }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 6 && (
              <StepPhotos
                photos={gift.photos}
                puzzlePhotoIndex={gift.puzzlePhotoIndex ?? 0}
                scratchPhotoIndex={gift.scratchPhotoIndex ?? 1}
                onChangePhotos={(photos) => setGift((g) => ({ ...g, photos }))}
                onSelectPuzzlePhoto={(idx) =>
                  setGift((g) => ({ ...g, puzzlePhotoIndex: idx }))
                }
                onSelectScratchPhoto={(idx) =>
                  setGift((g) => ({ ...g, scratchPhotoIndex: idx }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 7 && (
              <StepCaptions
                photos={gift.photos}
                onChangePhotoCaption={(idx, caption) => {
                  const newPhotos = [...gift.photos];
                  newPhotos[idx] = { ...newPhotos[idx], caption };
                  setGift((g) => ({ ...g, photos: newPhotos }));
                }}
                onNext={handleNext}
              />
            )}

            {currentStep === 8 && (
              <StepPuzzle
                photos={gift.photos}
                puzzleDifficulty={gift.puzzleDifficulty}
                puzzlePhotoIndex={gift.puzzlePhotoIndex ?? 0}
                onChangeDifficulty={(diff) =>
                  setGift((g) => ({ ...g, puzzleDifficulty: diff }))
                }
                onSelectPuzzlePhoto={(idx) =>
                  setGift((g) => ({ ...g, puzzlePhotoIndex: idx }))
                }
                onNext={handleNext}
              />
            )}

            {currentStep === 9 && (
              <StepLetter
                letterText={gift.letter || ""}
                recipientName={gift.recipientName}
                creatorName={gift.creatorName}
                onChangeLetter={(val) => setGift((g) => ({ ...g, letter: val }))}
                onNext={handleNext}
              />
            )}

            {currentStep === 10 && (
              <StepRules
                rules={gift.rules}
                onChangeRules={(rules) => setGift((g) => ({ ...g, rules }))}
                onNext={handleNext}
              />
            )}

            {currentStep === 11 && <StepPreview gift={gift} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
