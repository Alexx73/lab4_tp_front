import React from 'react'

function Libre(props) {
  return (
    <div className="cursor-pointer" onClick={() => alert(props.cancha + "\n" + props.horas + " a " +  (props.horas+ 1) +  " horas")} >
       <svg className="w-5 h-5 text-green-500 text-lg " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>   
                      
    </div>
  )
}

export default Libre