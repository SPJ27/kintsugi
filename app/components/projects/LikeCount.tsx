"use client";

const LikeCount = ({ likeCount }: { likeCount: number }) => {
  return (
    <div className="mx-2 flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-[#f0c14d] bg-[#2A1A08] px-4 py-1 text-xl text-[#f0c14d]">
      <span className="text-base">{likeCount} Likes</span>
    </div>
  );
};

export default LikeCount;
