// app/(grid)/game/[id]/page.tsx
import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import Image from "next/image";
import React from "react";
import type { Game, Screenshot } from "@/app/types/game";

// API shape للصفحة دي
type ApiGameResponse = {
  data: Game;
  screenshots?: { results: Screenshot[] };
  similar?: { results: Game[] };
};

// ✅ في Next.js 15: params = Promise
type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const gameData = (await getGame(id)) as ApiGameResponse | null;
  if (!gameData) {
    return <div className="text-white text-center mt-20">Game not found</div>;
  }

  const data = gameData.data;
  const screenshots = gameData.screenshots?.results ?? [];
  const similar = gameData.similar?.results ?? [];

  const SimpleImageGallery = () => {
    if (screenshots.length === 0 && !data.background_image) {
      return (
        <div className="rounded-xl overflow-hidden h-96 w-full bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400">No images available</span>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* الصورة الرئيسية */}
        {data.background_image ? (
          <div className="rounded-xl overflow-hidden h-96 w-full relative">
            <Image
              src={data.background_image}
              alt={data.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {/* السكرين شوت */}
        {screenshots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((s, index) => (
              <div key={s.id ?? index} className="rounded-xl overflow-hidden h-64 relative">
                <Image
                  src={s.image}
                  alt={`${data.name} screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="mt-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 text-3xl lg:text-5xl font-extrabold tracking-wide capitalize mb-8">
            {data.name}
          </h1>
          <div className="text-gray-300">
            Released: <span className="text-pink-400">{data.released ?? "-"}</span> | Rating:{" "}
            <span className="text-pink-400">{data.rating ?? "-"}/5</span> | Ratings count:{" "}
            <span className="text-pink-400">{data.ratings_count ?? 0}</span>
          </div>
        </div>

        {/* Screenshots Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
          <SimpleImageGallery />
        </div>

        {/* Swiper Gallery */}
        {screenshots.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Swiper Gallery</h2>
            <SwiperCards
              slidesPerView={1}
              className="h-full"
              items={screenshots.map((s, i) => ({
                card: (
                  <div key={`screenshot-${s.id ?? i}`} className="rounded-xl overflow-hidden h-96 w-full relative">
                    <Image
                      src={s.image}
                      alt={data.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ),
                src: s.image,
              }))}
            />
          </div>
        ) : null}

        {/* Description */}
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">About the Game</h2>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line">
            {data.description_raw || "No description available."}
          </p>
        </div>

        {/* Similar Games */}
        {similar.length > 0 ? (
          <GamesSlider title="Similar Games" games={similar} />
        ) : (
          <div className="text-center text-gray-400 py-8">No similar games found.</div>
        )}
      </div>
    </div>
  );
}
