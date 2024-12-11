import React from 'react'
import { useLocation } from 'react-router-dom';


import Canchas from './Canchas'
import FormReservas from '../components/FormReservas'
import FormReservas2 from '../components/FormReservas2'


function Reservas(props) {

  // Utiliza useLocation para acceder a las props pasadas
  const location = useLocation();


  // Obtiene la fecha actual
  const fechaActual = new Date();
  const opcionesFormato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFormato);

  let fechaReserva = location.state && location.state.selectedDate ? location.state.selectedDate : fechaFormateada

      // Registra las props en la consola
      // console.log(location.state);

  return (
    
    <div className="text-center text-lg">
            <h2 className="text-lg	 " >  
              Disponibilidad para el día { fechaReserva }
            </h2>

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
    </div>
  )
}

export default Reservas
