import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cargando from '../components/Cargando';

function VerReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fechaActual = new Date();
   
   

    const date = new Date();
    const formattedDate = date.toLocaleString("es-ES", { month: "long" });
    const year = fechaActual.getFullYear();

  useEffect(() => {
    
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/reservas');

      // Ordenar las canchas por cancha_id y luego por horario ascendente
      const sortedCanchas = response.data.sort((a, b) => {
        if (a.cancha_id === b.cancha_id) {
          // Si los cancha_id son iguales, ordenar por horario
          return new Date(a.horario) - new Date(b.horario); // Asegúrate de que horario sea una fecha válida
        }
        return a.cancha_id - b.cancha_id; // Ordenar por cancha_id
      });

        setReservas(sortedCanchas); // Actualiza las reservas
      } catch (error) {
        setError('Error al obtener las reservas'); // Manejamos el error
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchReservas();
  }, []);

  console.log(reservas)
  if (loading) {
    return <Cargando />;
  }

  if (error) {
    return <div className='min-h-[300px]' >
 <p>{error}</p>;
    </div>
   
  }

  return (

    

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  min-h-[500px]">
        <h3 className='text-xl font-bold text-center mb-2 text-green-600 ' > Reservas para {formattedDate } de { year}</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                       Telefono
                    </th>
                    <th scope="col" className="px-6 py-3">
                       Cancha
                    </th>
                    <th scope="col" className="px-6 py-3">
                        DIa
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Inicio
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fin
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Duracion
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    reservas.map((res) => 
                        <tr key={res.id}  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">              
                    
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {res.id}
                            </th>
                            <td className="px-1 py-4">
                            {res.nombre_contacto}
                            </td>
                            <td className="px-6 py-4">
                               { res.telefono }
                            </td>
                            <td className="px-6 py-4">
                                { res.cancha_id}
                            </td>
                            <td className="px-6 py-4">
                                { res.dia }
                            </td>
                            <td className="px-6 py-4">
                                { res.hora }
                            </td>
                            <td className="px-6 py-4">
                                { res.hora_fin  }
                            </td>
                            <td className="px-6 py-4">
                                { res.duracion >1 ? res.duracion + " horas" : res.duracion + " hora"  }
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</a>
                                <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline">Del</a>

                            </td>
                </tr>
                
                    )
                }
               

                {/* {canchas.map((cancha) => (
            <tr key={cancha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cancha.id}</th>
              <td className="px-1 py-4">{cancha.nombre}</td>
              <td className="px-4 py-4 text-md font-bold">{cancha.techada ? 'Sí' : 'No'}</td>
              <td className="flex px-1 py-4">
                <FaEdit
                  onClick={() => handleEditCancha(cancha)} // Pasa el objeto cancha
                  className="h-6 w-6 text-blue-600 cursor-pointer pl-0.5"
                />
                <MdDeleteForever
                  onClick={() => alert("Borrar id: " + cancha.id)}
                  className="h-6 w-6 text-red-600 cursor-pointer"
                />
              </td>
            </tr>
          ))} */}
                
                
               
            </tbody>
        </table>
    </div>
















    // -------
    // <div className="overflow-x-auto">
    //   <table className="min-w-full">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Nombre</th>
    //         <th>Teléfono</th>
    //         <th>Fecha</th>
    //         <th>Cancha</th>
    //         <th>Hora de Inicio</th>
    //         <th>Hora de Fin</th>
    //         <th>Duración</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {reservas.map(reserva => (
    //         <tr key={reserva.id}>
    //           <td>{reserva.id}</td>
    //           <td>{reserva.nombre_contacto}</td>
    //           <td>{reserva.telefono}</td>
    //           <td>{reserva.dia}</td>
    //           <td>{reserva.cancha_id}</td>
    //           <td>{reserva.hora}</td>
    //           <td>{reserva.hora_fin}</td>
    //           <td>{reserva.duracion}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default VerReservas;
