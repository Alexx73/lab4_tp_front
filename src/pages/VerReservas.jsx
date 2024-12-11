import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cargando from '../components/Cargando';

function VerReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/reservas');
        setReservas(response.data); // Actualiza las reservas
      } catch (error) {
        setError('Error al obtener las reservas'); // Manejamos el error
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchReservas();
  }, []);

  console.log(reservas.id)
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
        <h3> Reservas para el Lunes 20-12-2024</h3>
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
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                
                    
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-1 py-4">
                       1
                    </td>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                        White
                    </td>
                    <td className="px-6 py-4">
                        Laptop PC
                    </td>
                    <td className="px-6 py-4">
                        $1999
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td className="px-6 py-4">
                        Accessories
                    </td>
                    <td className="px-6 py-4">
                        $99
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Google Pixel Phone
                    </th>
                    <td className="px-6 py-4">
                        Gray
                    </td>
                    <td className="px-6 py-4">
                        Phone
                    </td>
                    <td className="px-6 py-4">
                        $799
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple Watch 5
                    </th>
                    <td className="px-6 py-4">
                        Red
                    </td>
                    <td className="px-6 py-4">
                        Wearables
                    </td>
                    <td className="px-6 py-4">
                        $999
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
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
