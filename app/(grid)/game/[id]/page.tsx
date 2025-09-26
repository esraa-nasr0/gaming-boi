import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import Image from "next/image";
import React from "react";

type screenshots = {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const gameData = await getGame(id);

  console.log("GAME DATA:", gameData);
  console.log("SCREENSHOTS:", gameData.screenshots?.results);

  if (!gameData) {
    return <div className="text-white text-center mt-20">Game not found</div>;
  }

  const data = gameData.data;
  const screenshots = gameData.screenshots?.results || [];
  const similar = gameData.similar?.results || [];

  // بديل بسيط للتأكد من ظهور الصور
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
        {data.background_image && (
          <div className="rounded-xl overflow-hidden h-96 w-full relative">
            <Image
              src={data.background_image}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* السكرين شوت */}
        {screenshots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((screenshot: screenshots , index: number) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden h-64 relative"
              >
                <Image
                  src={screenshot.image}
                  alt={`${data.name} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Game Header */}
        <div className="text-center">
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r 
                   from-fuchsia-400 via-pink-400 to-purple-500 
                   text-3xl lg:text-5xl font-extrabold tracking-wide capitalize mb-8"
          >
            {data.name}
          </h1>
          <div className="text-gray-300">
            Released:{" "}
            <span className="text-pink-400">{data.released}</span> | Rating:{" "}
            <span className="text-pink-400">{data.rating}/5</span> | Ratings
            count: <span className="text-pink-400">{data.ratings_count}</span>
          </div>
        </div>

        {/* Screenshots Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
          <SimpleImageGallery />
        </div>

        {/* Swiper Gallery */}
        {screenshots.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Swiper Gallery
            </h2>
            <SwiperCards
              slidesPerView={1}
              className="h-full"
              items={screenshots.map((s: screenshots, i: number) => ({
                card: (
                  <div
                    key={`screenshot-${i}`}
                    className="rounded-xl overflow-hidden h-96 w-full relative"
                  >
                    <Image
                      src={s.image}
                      alt={data.name}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ),
                src: s.image,
              }))}
            />
          </div>
        )}

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
          <div className="text-center text-gray-400 py-8">
            No similar games found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;


/*
you learned 
crud operations (wishlist)
authentication
authorization and protection
setting cookies , delete cookies , mutate them 
frontend optimization debouncing 
fetching data from server page 
server actions 
tanstak query caching 
sliders with animations framer motion
resusability 
filtring 
searching 
middlware
connecting with database 
handling forms and its submission
creating mongoose models and connecting with data base
handling file uploads with cloudinary 
setting up custom hooks 
sync local storage with state 

rest :
review a game
wishlist in single game page 

reply 
*/