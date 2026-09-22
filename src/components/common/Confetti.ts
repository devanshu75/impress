import confetti from "canvas-confetti";

export function fireCuteConfetti(options?: { count?: number; originY?: number }) {
  const count = options?.count ?? 60;
  const originY = options?.originY ?? 0.65;

  // Gentle pastel palette matching our brand tokens
  const colors = ["#FF6B9D", "#C8B6FF", "#8FE3CF", "#FFD166", "#FFB38A"];

  try {
    confetti({
      particleCount: count,
      spread: 70,
      origin: { y: originY },
      colors,
      disableForReducedMotion: true,
      ticks: 200,
      shapes: ["circle", "square"],
      scalar: 0.9,
    });
  } catch (e) {
    // Graceful fallback if canvas is not accessible
  }
}
