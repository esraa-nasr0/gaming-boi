"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ReactNode } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCards({
  items,
  paginationImge,
  className,
  slidesPerView,
}: {
  items: { src: string; card: ReactNode }[];
  paginationImge?: boolean;
  className?: string;
  slidesPerView?: number;
}) {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        className={`w-full ${className || "h-100"}`}  // ✅ w-full (مش w-[full])
        navigation
        pagination={{ clickable: true }}
        slidesPerView={slidesPerView || 1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={20}
      >
        {items.map(({ card }, i) => (
          <SwiperSlide key={i}>{card}</SwiperSlide>
        ))}
      </Swiper>

      {paginationImge && (
        <div className="flex gap-4 mt-4">
          {items.map(({ src }, i) => (
            <div
              key={i}
              className="w-full h-40 cursor-pointer hover:-translate-y-5 z-10 hover:opacity-90 duration-200 rounded-xl overflow-hidden max-w-lg relative"
            >
              {src ? (
                <Image alt="img-pagination" src={src} fill sizes="200px" className="object-cover rounded-lg" />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
