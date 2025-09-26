import Link from 'next/link'
import React from 'react'
import SwiperCards from './SwiperCards'
import Image from 'next/image'
import AddToWishList from './AddToWishList'

function GamesSlider({ games, title, slidesPerView, big }:{ games: Game[], title: string, slidesPerView?: number, big?: boolean }) {
  return (
    <div className="mt-10 px-6">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 
                     text-3xl lg:text-5xl font-extrabold tracking-wide capitalize mb-8 ml-6">
        {title}
      </h1>

      <SwiperCards
        slidesPerView={slidesPerView || 4}
        items={games.map((game, index) => ({
          src: game.background_image,
          card: big ? (
            // ضع الـ key على العنصر الأعلى هنا
            <div
              key={String(game.id ?? index)}
              className="flex items-center rounded-3xl overflow-hidden 
                         bg-gradient-to-br from-zinc-900/80 to-zinc-800/40
                         backdrop-blur-xl shadow-lg hover:shadow-fuchsia-500/30 
                         transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] 
                         border border-transparent hover:border-fuchsia-400/30"
            >
              {/* ... محتوى الـ big card كما كان */}
              <div className="flex flex-col py-6 px-8 gap-6 w-[60%] items-start">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text 
                               bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500
                               drop-shadow-lg">
                  {game.name}
                </h1>
                <p className="line-clamp-4 text-gray-200 leading-relaxed text-sm md:text-base">
                  {game.description_raw}
                </p>
              </div>

              <div className="w-[40%] h-80 relative overflow-hidden">
                <Image
                  src={game.background_image}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>
            </div>
          ) : (
            // ضع الـ key هنا أيضاً على العنصر الأعلى
            <div key={String(game.id ?? index)} className='relative'>
              <Link href={`/game/${game.id}`}>
                <div
                  className=" cursor-pointer group rounded-3xl overflow-hidden 
                             bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 
                             backdrop-blur-xl shadow-lg hover:shadow-fuchsia-500/30 
                             transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
                >
                  <div className="relative w-full h-96">
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="text-white text-xl lg:text-2xl font-bold drop-shadow-md group-hover:text-fuchsia-300 transition-colors">
                      {game.name}
                    </h1>
                    <p className="text-sm text-gray-300 mt-2 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        ⭐ <span>{game.rating}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        📅 <span>{game.released}</span>
                      </span>
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-fuchsia-400/40 transition-colors" />
                </div>
              </Link>

              <div className='absolute top-2 left-4 text-white '>
                <AddToWishList plus gameId={String(game.id)} />
              </div>
            </div>
          )
        }))}
      />
    </div>
  )
}

export default GamesSlider
