import { Suspense } from "react";
import { Metadata } from "next";
import { MuseumPageClient } from "./MuseumPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "A Tiny World Created for You ♡ Amiverse",
    description: "Someone built you an interactive friendship museum. Open your sealed gift.",
  };
}

export default async function MuseumPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9FC] flex flex-col items-center justify-center text-center p-6">
          <div className="w-10 h-10 rounded-full bg-[#FFF0F6] border border-[#FF6B9D] flex items-center justify-center animate-pulse mb-2 text-[#FF6B9D]">
            ♡
          </div>
          <p className="text-xs text-[#777183]">Loading your museum...</p>
        </div>
      }
    >
      <MuseumPageClient id={id} />
    </Suspense>
  );
}
