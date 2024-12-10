import React from 'react'

import Canchas from './Canchas'
import FormReservas from '../components/FormReservas'
import FormReservas2 from '../components/FormReservas2'


function Reservas() {
  return (
    <div className="flex w-full">
      {/* Componente Canchas ocupa el 80% del ancho */}
      <div className="flex-1 ">
        <Canchas />
      </div>

      {/* Componente FormReservas ocupa el 20% del ancho */}
      <div className="w-1/4">
        <FormReservas2 />
      </div>
    </div>
  )
}

export default Reservas
