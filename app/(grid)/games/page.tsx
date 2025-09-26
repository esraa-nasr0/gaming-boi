import Filters from "@/app/components/Filters";
import { APIURL, KEY } from "@/app/constants";
import React from "react";

const page = async () => {
  const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) => res.json());
  const generes = data.results.slice(0, 15);
  console.log(generes);
  return (
    <div className=" mt-4 relative flex flex-col gap-5 mr-6 ml-6 ">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r text-center
                  from-purple-400 via-fuchsia-400 to-purple-500 
                   text-3xl lg:text-5xl font-extrabold tracking-wide capitalize mb-8"
      >Games From Genres</h1>
      <Filters generes={generes} />
    </div>
  );
};

export default page;
