"use client"

import GameCard from '@/app/components/GameCard'
import { useWishlist } from '@/app/context/wishlistContext'
import { useGetGamesWithIds } from '@/lib/queryFunctions'
import React from 'react'

function Page() {
  const { wishList } = useWishlist()
  const { games, isLoading } = useGetGamesWithIds(wishList)
  console.log(games)

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>
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
        {games?.map((game: any) => (
          <GameCard
            key={game.data?.id || game.id}
            game={{
  ...game.data,
  short_screenshots: game.screenshots?.results || []
}}

            wishlist
            screenBig={false}
          />
        ))}
      </div>
    </div>
  )
}

export default Page
