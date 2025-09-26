"use client";
import { useGetGames } from "@/lib/queryFunctions";
import { AnimatePresence } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MotionItem from "../defaults/MotionItem";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

// تعريف نوع اللعبة
interface Game {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  // أضف الخصائص الأخرى حسب الحاجة
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { games, isLoading } = useGetGames({ query: search, isDisabled: search === "" });
  const [active, setActive] = useState(false);

  const outsideREF = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        outsideREF.current &&
        e.target instanceof Node &&
        !outsideREF.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(query);
    }, 500);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div
      ref={outsideREF}
      className="w-full flex relative group items-center gap-2 justify-between px-3 md:px-4 border border-input rounded-xl bg-main max-w-2xl mx-auto"
    >
      <SearchIcon className="w-4 h-4 md:w-5 md:h-5 text-fuchsia-300 flex-shrink-0" />
      
      <input
        value={query}
        placeholder="Search games..."
        onChange={(e) => {
          setActive(true);
          setQuery(e.target.value);
        }}
        onFocus={() => setActive(true)}
        className="py-2 md:py-3 text-sm md:text-base w-full bg-transparent text-gray-50 border-none outline-none active:outline-none ring-0 placeholder:text-gray-400"
      />
      
      {query && (
        <XIcon
          onClick={() => {
            setQuery("");
            setSearch("");
            setActive(false);
          }}
          className="w-4 h-4 md:w-5 md:h-5 cursor-pointer text-fuchsia-300 hover:text-fuchsia-400 duration-150 flex-shrink-0"
        />
      )}

      <AnimatePresence>
        {(games?.data || isLoading) && active && (
          <MotionItem
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full top-full z-50 bg-[#222425] rounded-xl md:rounded-2xl shadow-lg border border-white/10 max-h-[50vh] overflow-y-auto left-0 mt-1"
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-white/10 last:border-b-0">
                  <Skeleton className="h-12 w-16 rounded-lg md:h-16 md:w-20 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full max-w-[120px] md:max-w-[150px]" />
                    <Skeleton className="h-3 w-full max-w-[80px] md:max-w-[100px]" />
                  </div>
                </div>
              ))
            ) : games?.data?.results?.length > 0 ? (
              games.data.results.map((game: Game) => (
                <div 
                  key={game.id} 
                  className="hover:bg-fuchsia-600/20 duration-200 border-b border-white/10 last:border-b-0"
                  onClick={() => setActive(false)}
                >
                  <Link href={`/game/${game.id}`} className="flex gap-3 items-center p-3">
                    <div className="rounded-lg relative overflow-hidden w-16 h-12 md:w-20 md:h-16 bg-neutral-900 flex-shrink-0">
                      <Image
                        className="object-cover"
                        src={game.background_image || "/placeholder-game.jpg"}
                        alt={game.name}
                        fill
                        sizes="(max-width: 768px) 64px, 80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm md:text-base truncate">
                        {game.name}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm truncate">
                        {game.released || "TBA"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-300 text-sm md:text-base">
                  No games found for &quot;<span className="text-fuchsia-400">{search}</span>&quot;
                </p>
              </div>
            )}
          </MotionItem>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;