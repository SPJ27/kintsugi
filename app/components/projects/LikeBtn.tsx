"use client";
import { likeUnlike } from "@/actions/engagement";
import { Heart } from "lucide-react";
import React, { useState } from "react";

const LikeBtn = ({
  projectId,
  hasCurrentUserLiked,
  likeCount,
}: {
  projectId: number;
  hasCurrentUserLiked: boolean;
  likeCount: number;
}) => {
  const [hasLiked, setHasLiked] = useState<boolean>(hasCurrentUserLiked);
  const [count, setCount] = useState<number>(likeCount);

  return (
    <button
      onClick={async () => {
        const next = !hasLiked
        setHasLiked(next)
        setCount((c) => c + (next ? 1 : -1))
        await likeUnlike(projectId)
      }}
      className="mx-2 flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl cursor-pointer border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]"
    >
      <Heart
    className={`transition-all duration-200 ease-out text-[#f0c14d] ${
    hasLiked ? "fill-[#f0c14d] scale-110" : "fill-transparent scale-100"
        }`}
      />
      <span className="text-base">{count}</span>
    </button>
  );
};

export default LikeBtn;