"use client";
import React, { useState } from "react";
import { useGetGames } from "@/lib/queryFunctions";
import GameSkeleton from "./GameSkeleton";
import GameCard from "./GameCard";
import Empty from "./defaults/Empty";
import { PaginationCustom } from "./PaginationCustom";
import { Game } from "../types/game";

// Genre type
interface Genre {
  id: number;
  name: string;
  slug?: string;
}

// props
interface FiltersProps {
  generes: Genre[];
}

// شكل الاستجابة من الهوك
interface GamesListResponse {
  data?: {
    count?: number;
    results?: Game[];
  };
}

const Filters = ({ generes }: FiltersProps) => {
  const [page, setPage] = useState(1);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);

  // قوّي أنواع الهوك عشان TypeScript يفهم شكل الداتا
  const { data: games, isLoading } = useGetGames({
    page,
    filters:
      activeGenres.length > 0
        ? [
            {
              filterName: "genres" as const,
              option: activeGenres.join(","),
            },
          ]
        : [],
  }) as { data?: GamesListResponse["data"]; isLoading: boolean };

  const results: Game[] = games?.results ?? [];
  const totalPages = Math.ceil((games?.count ?? 0) / 21);

  const handleGenreClick = (genreId: number) => {
    setActiveGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* الألعاب */}
      <div className="col-span-12 lg:col-span-9 order-1 lg:order-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <GameSkeleton number={21} />
          ) : results.length > 0 ? (
            results.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                wishlist={false}
              />
            ))
          ) : (
            <Empty message="Sorry, no games found in this page" />
          )}
        </div>
      </div>

      {/* الفلاتر */}
      <div className="col-span-12 lg:col-span-3 order-2 lg:order-2">
        <div className="flex flex-row-reverse lg:flex-col gap-2 bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 backdrop-blur-xl shadow-lg border border-fuchsia-400/20 py-4 px-4 rounded-2xl sticky top-0">
          {generes.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeGenres.includes(genre.id)
                  ? "bg-fuchsia-600 text-white shadow-md"
                  : "bg-zinc-800/50 text-gray-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* الباجيناشن */}
      <div className="col-span-12 order-3">
        <PaginationCustom setPage={setPage} page={page} count={totalPages} />
      </div>
    </div>
  );
};

export default Filters;
