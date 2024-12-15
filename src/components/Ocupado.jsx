import React from 'react'
import { TiTick } from "react-icons/ti";

function Ocupado() {
  return (
    <div>
      {/* <TiTick className='w-10 h-10 text-red-500  '/> */}
        <svg className="w-5 h-5 text-red-500 text-lg " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </div>
  )
}

export default Ocupado