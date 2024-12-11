import React from 'react'

import Canchas from './Canchas'
import FormReservas from '../components/FormReservas'
import FormReservas2 from '../components/FormReservas2'


function Reservas() {
  return (
    
    <div className="flex flex-col md:flex-row w-full mx auto">
      {/* Componente Canchas ocupa el 100% en pantallas pequeñas y 80% en medianas/grandes */}
      <div className="w-full md:w-5/7 min-w-[900px] max-w-[1200px] ">
        <Canchas />
      </div>

      {/* Componente FormReservas ocupa el 100% en pantallas pequeñas y 20% en medianas/grandes */}
      <div className="w-full md:w-1/5 min-w-[200px] max-w-[300px] mt-4 md:mt-0 ">
        <FormReservas2 />
      </div>
    </div>
  )
}

export default Reservas
