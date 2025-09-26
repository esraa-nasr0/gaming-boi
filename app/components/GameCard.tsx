import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import AddToWishList from "./AddToWishList";
import ImageSwitcher from "./ImageSwitcher";

const GameCard = ({ game, wishlist, screenBig = false }: { game: Game; wishlist?: boolean; screenBig: boolean }) => {
  return (
    <HoverCard>
      <div
        className="relative flex flex-col items-start gap-4 group 
                   rounded-3xl overflow-hidden 
                   bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 
                   backdrop-blur-xl shadow-lg hover:shadow-fuchsia-500/30 
                   transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] 
                   border border-transparent hover:border-fuchsia-400/30"
      >
        <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
          <div>
            <div className="relative flex flex-col gap-2">
              {/* صورة اللعبة */}
              <div className="w-full h-64 relative overflow-hidden">
                <Image
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={game.background_image}
                  alt={game.name}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* اسم اللعبة */}
              <Link
                href={`/game/${game.id}`}
                className="text-base font-bold text-white drop-shadow-md 
                           group-hover:text-fuchsia-300 transition-colors duration-300 px-4"
              >
                {game.name}
              </Link>

              {/* المنصات */}
              <div className="mt-2 flex items-center gap-2 px-4 text-gray-300">
                {game.parent_platforms.map((platform, i) => (
                  <p key={`platform-${platform.platform.id}-${i}`} className="text-lg">
                    {platform.platform.slug === "pc" ? (
                      <FaSteam className="hover:text-white transition-colors duration-300" />
                    ) : platform.platform.slug.includes("playstation") ? (
                      <FaPlaystation className="text-blue-500 hover:text-blue-400 transition-colors duration-300" />
                    ) : platform.platform.slug.includes("xbox") ? (
                      <FaXbox className="text-green-500 hover:text-green-400 transition-colors duration-300" />
                    ) : null}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        {/* زرار الـ Wishlist */}
        {wishlist && (
          <div className="absolute top-3 left-3 z-10 text-white">
            <AddToWishList plus gameId={game.id.toString()} />
          </div>
        )}
      </div>

      <HoverCardContent
        align="center"
        className="w-full bg-gradient-to-br from-zinc-900/90 to-zinc-800/60 
                   backdrop-blur-xl rounded-3xl shadow-lg border border-fuchsia-400/20"
      >
      {game.short_screenshots && (
  <ImageSwitcher game={game} images={game.short_screenshots} />
)}
     </HoverCardContent>
    </HoverCard>
  );
};

export default GameCard;
