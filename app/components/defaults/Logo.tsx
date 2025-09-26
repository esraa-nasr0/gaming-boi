import Link from 'next/link'
import React from 'react'

function Logo() {
  return (<>
  <Link className='font-semibold my-2  md:text-2xl lg:text-3xl flex gap-2' href={'/'}>
  <h1 className='text-fuchsia-500 '>Gaming</h1>
  <span>Boi</span>
  </Link>
  </>
  )
}

export default Logo