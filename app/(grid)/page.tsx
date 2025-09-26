import Hero from "../components/Hero";
import { getGamesByIds, searchGames } from "../api/api";
import Image from "next/image";
import SwiperCards from "../components/SwiperCards";
import Link from "next/link";
import GamesSlider from "../components/GamesSlider";

export default async function Home() {
  const data = await searchGames("action", 1, [], 20, 3600);

  const ps5 = await searchGames(
    "",
    1,
    [
      {filterName:"platforms" , option:"187"},
      {
        filterName:"ordering",
        option:"-metacritic",
      }
    ],
    9
  );
  const pc = await searchGames("", 1 , [{filterName:"platforms" , option:"4"}], 10)

  const games: Game[] = data?.data?.results ?? []; 
  const customeGame = await getGamesByIds(["799265" , "58550" , "2462" , "494384" , "452642" , "452634"])

  return (
    <main >
      <Hero />
      <GamesSlider title="Top Games For PS5" games={ps5.data.results}/>
      <GamesSlider title="Top Games " games={games}/>
      <GamesSlider big slidesPerView={2} title="PLAYSTATION EXCLUSIVES" games={customeGame.map((game)=> game.data)}/>
        <GamesSlider slidesPerView={4} title="TOP PC GAMES" games={pc.data.results}/>
    </main>
  );
}
