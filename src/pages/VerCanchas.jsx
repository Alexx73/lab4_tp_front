import React from 'react'


import ListaCanchas from './ListaCanchas'
import FormReservas from '../components/FormCanchas'

function VerCanchas() {
  
  return (
    <div className="text-center text-lg">
            <h2 className="text-lg	 " >  
              Lista de Canchas Disponibles
            </h2>

    <div className="flex flex-col md:flex-row w-full mx auto">
      {/* Componente Canchas ocupa el 100% en pantallas pequeñas y 80% en medianas/grandes */}
      <div className="w-full md:w-5/7 min-w-[900px] max-w-[1200px] ">
        <ListaCanchas />
      </div>

      {/* Componente FormReservas ocupa el 100% en pantallas pequeñas y 20% en medianas/grandes */}
      <div className="w-full md:w-1/5 min-w-[200px] max-w-[300px] mt-4 md:mt-0 ">
        <FormReservas />
      </div>
    </div>
    </div>
  )
}

export default VerCanchas