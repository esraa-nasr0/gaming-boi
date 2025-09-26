"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { GoPeople } from "react-icons/go";
import type { Game, Screenshot } from "../types/game";

type GameWithCounts = Game & { reviews_count?: number };

interface ImageSwitcherProps {
  images: Screenshot[];   // [{ id, image }]
  game: GameWithCounts;   // نفس Game المستخدم في GameCard
}

const ImageSwitcher = ({ images, game }: ImageSwitcherProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const len = images?.length ?? 0;

  useEffect(() => {
    if (!len) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % len);
    }, 2000);
    return () => clearInterval(interval);
  }, [len]);

  const reviewCount = game.reviews_count ?? game.ratings_count ?? 0;

  return (
    <div className="flex flex-col gap-4 py-3 items-center px-6 rounded-xl bg-main overflow-hidden">
      <div className="flex items-center gap-2 justify-between w-full">
        <h1 className="text-base text-white">{game.name}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Released {game.released ?? "-"}
        </p>
      </div>

      <div className="w-80 h-36 rounded-xl overflow-hidden relative">
        {len > 0 ? (
          images.map((img, index) => (
            <motion.div
              key={img.id ?? index}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              className="absolute inset-0"
              style={{ zIndex: activeIndex === index ? 1 : 0 }}
            >
              <Image
                fill
                sizes="320px"
                src={img.image}
                alt={`${game.name} screenshot ${index + 1}`}
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No images available</span>
          </div>
        )}
      </div>

      <p className="text-sm flex items-center gap-2 self-start text-muted-foreground mt-1">
        <GoPeople />
        Reviews {reviewCount}
      </p>
    </div>
  );
};

export default ImageSwitcher;
