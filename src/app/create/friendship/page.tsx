import { Metadata } from "next";
import { FriendshipCreator } from "@/components/creator/FriendshipCreator";

export const metadata: Metadata = {
  title: "Build a Friendship Museum ♡ Amiverse",
  description: "Create a personalized digital world for your best friend with photos, secret scratch-off, puzzle, sealed letter, and rules.",
};

export default function CreateFriendshipPage() {
  return (
    <div className="relative min-h-screen">
      <FriendshipCreator />
    </div>
  );
}
