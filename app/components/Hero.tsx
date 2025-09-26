import React from 'react'
import SwiperCards from './SwiperCards'
import Image from "next/image";
import Cardinfo from './Cardinfo';

function Hero() {
  return (
    <div className="relative py-10 px-6 md:px-12 lg:px-20 bg-gradient-to-b text-white">
      <SwiperCards
        className="h-[28rem] md:h-[32rem]"
        paginationImge
        items={[
          {
            card: (
              <section className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl group">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="/spidervideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20  transition-colors" />
                <Cardinfo
                  desc="Lorem ipsum dolor sit amet consectetur..."
                  title="Spider-Man is great"
                  btnClasses="bg-gradient-to-r from-red-600 to-red-400 mt-3 hover:from-red-500 hover:to-red-300 transition-colors"
                  image="/news1title.webp"
                />
              </section>
            ),
            src: "/poster.webp",
          },
          {
            card: (
              <section className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl group">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                >
                  <source
                    src="/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <Cardinfo
                  desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsa mollitia voluptas beatae exercitationem."
                  title="Call of Duty Black Ops"
                  btnClasses="bg-gradient-to-r from-cyan-600 to-blue-400 mt-3 hover:from-cyan-500 hover:to-blue-300 transition-colors"
                  image="/iconcyber.webp"
                />
              </section>
            ),
            src: "/background.jpg",
          },
          {
            card: (
              <section className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl group">
                <Image
                  src="/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.webp"
                  alt="hero"
                  fill
                  className="object-cover absolute w-full h-full inset-0 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20  transition-colors" />
                <Cardinfo
                  desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsa mollitia voluptas beatae exercitationem."
                  title="Epic Adventure"
                  btnClasses="bg-gradient-to-r from-purple-600 to-pink-400 mt-3 hover:from-purple-500 hover:to-pink-300 transition-colors"
                  image="/iconcyber.webp"
                />
              </section>
            ),
            src: "/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp",
          },
          {
            card: (
              <section className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl group">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                >
                  <source
                    src="/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20  transition-colors" />
                <Cardinfo
                  desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsa mollitia voluptas beatae exercitationem."
                  title="Cyberpunk 2077"
                  btnClasses="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-400 hover:to-orange-300 transition-colors"
                  image="/news1title.webp"
                />
              </section>
            ),
            src: "/bg2.jpg",
          },
        ]}
      />
    </div>
  )
}

export default Hero
