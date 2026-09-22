export type PuzzleDifficulty = "easy" | "medium" | "hard";

export interface FriendshipPhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface FriendshipRule {
  id: string;
  text: string;
}

export interface FriendshipGift {
  id: string;
  creatorName: string;
  recipientName: string;
  friendshipDate?: string;
  howWeMet?: string;
  vibe?: string;
  whyTheyMatter?: string;
  photos: FriendshipPhoto[];
  puzzleDifficulty: PuzzleDifficulty;
  puzzlePhotoIndex?: number;
  scratchPhotoIndex?: number;
  letter?: string;
  rules: FriendshipRule[];
  createdAt: string;
}

export interface VibeOption {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  accent: string;
}

export const VIBE_OPTIONS: VibeOption[] = [
  {
    id: "chaos-duo",
    title: "Chaos Duo",
    subtitle: "Two unhinged brains sharing one collective thought",
    emoji: "⚡",
    gradient: "from-[#FFB38A] to-[#FF6B9D]",
    accent: "#FF6B9D",
  },
  {
    id: "soul-sisters",
    title: "Soul Sisters",
    subtitle: "Telepathic connection & unconditional comfort",
    emoji: "🌸",
    gradient: "from-[#FFD6E7] to-[#C8B6FF]",
    accent: "#E94F87",
  },
  {
    id: "adventure-buddies",
    title: "Adventure Buddies",
    subtitle: "Always saying 'yes' to impulsive late night quests",
    emoji: "🏕️",
    gradient: "from-[#8FE3CF] to-[#8ED8F8]",
    accent: "#2A9D8F",
  },
  {
    id: "partners-in-crime",
    title: "Partners in Crime",
    subtitle: "Who else would help you hide the emotional evidence?",
    emoji: "🕵️‍♀️",
    gradient: "from-[#8B7CF6] to-[#C8B6FF]",
    accent: "#8B7CF6",
  },
  {
    id: "comfort-person",
    title: "Comfort Person",
    subtitle: "A warm cup of tea on a stormy exhausting day",
    emoji: "☕",
    gradient: "from-[#FFD166] to-[#FFB38A]",
    accent: "#E76F51",
  },
  {
    id: "childhood-besties",
    title: "Childhood Besties",
    subtitle: "Saw every awkward haircut and still stayed by your side",
    emoji: "🧸",
    gradient: "from-[#FFD6E7] to-[#FFB38A]",
    accent: "#FF6B9D",
  },
  {
    id: "long-distance-legends",
    title: "Long-Distance Legends",
    subtitle: "Thousands of miles away, but seconds away in FaceTime",
    emoji: "✈️",
    gradient: "from-[#8ED8F8] to-[#C8B6FF]",
    accent: "#8B7CF6",
  },
  {
    id: "the-unstoppables",
    title: "The Unstoppables",
    subtitle: "Together we can literally solve any crisis or conquer the world",
    emoji: "✨",
    gradient: "from-[#FFD166] to-[#8FE3CF]",
    accent: "#2A9D8F",
  },
];

export const DEFAULT_RULES: FriendshipRule[] = [
  { id: "r-1", text: "Never let each other fight bad days alone." },
  { id: "r-2", text: "Random spontaneous food dates are non-negotiable." },
  { id: "r-3", text: "Bad decisions require at least two signatures." },
  { id: "r-4", text: "This friendship is permanent with zero cancellation fees." },
];
