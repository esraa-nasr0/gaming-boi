"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { GoPeople } from "react-icons/go";

// تعريف أنواع البيانات
interface GameImage {
  image: string;
  id?: number;
}

interface Game {
  id: number;
  name: string;
  released: string;
  reviews_count: number;
}

interface ImageSwitcherProps {
  images: GameImage[];
  game: Game;
}

const ImageSwitcher = ({ images, game }: ImageSwitcherProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (images?.length || 1));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [images?.length]);

  return (
    <div className="flex flex-col gap-4 py-3 items-center px-6 rounded-xl bg-main overflow-hidden">
      <div className="flex items-center gap-2 justify-between w-full">
        <h1 className="text-base text-white">{game.name}</h1>
        <p className="text-xs text-muted-foreground mt-1">Released {game.released}</p>
      </div>
      
      <div className="w-80 h-36 rounded-xl overflow-hidden relative">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image, index) => (
            <motion.div
              key={image.id || index}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              className="absolute inset-0"
              style={{ zIndex: activeIndex === index ? 1 : 0 }}
            >
              <Image
                fill
                src={image.image}
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
        Review count {game.reviews_count}
      </p>
    </div>
  );
};

export default ImageSwitcher;