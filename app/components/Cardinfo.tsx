import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';


function Cardinfo({desc , title , image , textBtn , btnClasses}:{
    desc:string;
    title:string;
    image:string;
    textBtn?:string;
    btnClasses?:string;
}) {
  return (
    <div className='absolute flex flex-col items-start left-20 top-15 max-w-md'>
          <div className='relative w-full h-40 '>
            <Image src={image} alt={`${title}`}  fill className='object-contain'/>
          </div>
          <h1 className='text-white text-2xl font-semibold'>{title}</h1>
          <p className='text-base text-gray-300 '>{desc}
          </p>
          <Button className={`rounded-full   ${btnClasses || "text-gray-50"}`}>{textBtn || "Find out more!"}</Button>
    </div>  )
}

export default Cardinfo