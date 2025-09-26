"use client";

import GameCard from "@/app/components/GameCard";
import { useWishlist } from "@/app/context/wishlistContext";
import { useGetGamesWithIds } from "@/lib/queryFunctions";
import React from "react";
import type { Game, GameApiResponse } from "@/app/types/game";

function Page() {
  const { wishList } = useWishlist();

  // نفترض إن الهوك مرجّع نفس الأسماء دي؛ بنقوّي الأنواع هنا لتفادي any
  const { games, isLoading } = useGetGamesWithIds(wishList) as {
    games: GameApiResponse[];
    isLoading: boolean;
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="px-6 mt-10 text-center">
      <h1
        className="text-transparent bg-clip-text bg-gradient-to-r 
                   from-purple-400 via-fuchsia-400 to-purple-500 
                   text-3xl lg:text-5xl font-extrabold tracking-wide capitalize mb-8"
      >
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games?.map((game: GameApiResponse) => {
          // دمج الاستجابة بحيث نكوّن كائن Game صالح بدون any
          const merged: Game = {
            ...(game.data ?? ({} as Game)),
            id: game.data?.id ?? game.id ?? 0,
            short_screenshots:
              game.screenshots?.results ??
              game.data?.short_screenshots ??
              [],
            // خلي المنصات دايمًا مصفوفة حتى لو مش موجودة في الـ API
            parent_platforms: game.data?.parent_platforms ?? [],
          };

          return (
            <GameCard
              key={merged.id}
              game={merged}
              wishlist
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
