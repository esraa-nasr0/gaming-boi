import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const GameSkeleton = ({ number = 10 }: { number?: number }) => {
  return Array.from({ length: number }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col gap-3 rounded-3xl 
                 bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 
                 backdrop-blur-xl shadow-lg p-4"
    >
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[70%] rounded-md" />
        <Skeleton className="h-4 w-[30%] rounded-md" />
      </div>
    </div>
  ));
};

export default GameSkeleton;
