import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cargando from '../components/Cargando';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

function VerReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fechaActual = new Date(); 
  const date = new Date();
  const formattedDate = date.toLocaleString("es-ES", { month: "long" });
  const year = fechaActual.getFullYear();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/reservas');

        const sortedCanchas = response.data.sort((a, b) => {
          if (a.cancha_id === b.cancha_id) {
            return new Date(a.horario) - new Date(b.horario);
          }
          return a.cancha_id - b.cancha_id;
        });

        setReservas(sortedCanchas);
      } catch (error) {
        setError('Error al obtener las reservas');
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) {
    return <Cargando />;
  }

  if (error) {
    return <div className='min-h-[300px]'><p>{error}</p></div>;
  }

  function handleEditReservas(reserva) {
    alert("Edit reservas id: " + reserva.id);
  }

  async function handleDeleteReservas(reserva) {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas borrar la reserva con ID: ${reserva.id}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5555/reservas/${reserva.id}`);

      if (response.status === 200) {
        // Actualizar el estado local para eliminar la reserva borrada
        setReservas((prevReservas) => prevReservas.filter((r) => r.id !== reserva.id));
        alert("Reserva eliminada correctamente.");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert("Hubo un error al eliminar la reserva: " + (error.response ? error.response.data.detail : error.message));
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[500px]">
      <h3 className='text-xl font-bold text-center mb-2 text-green-600'>
        Reservas para {formattedDate} de {year}
      </h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-1 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Teléfono</th>
            <th scope="col" className="px-6 py-3">Cancha</th>
            <th scope="col" className="px-6 py-3">Día</th>
            <th scope="col" className="px-6 py-3">Inicio</th>
            <th scope="col" className="px-6 py-3">Fin</th>
            <th scope="col" className="px-6 py-3">Duración</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((res) => (
            <tr key={res.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {res.id}
              </th>
              <td className="px-1 py-4">{res.nombre_contacto}</td>
              <td className="px-6 py-4">{res.telefono}</td>
              <td className="px-6 py-4">{res.cancha_id}</td>
              <td className="px-6 py-4">{res.dia}</td>
              <td className="px-6 py-4">{res.hora}</td>
              <td className="px-6 py-4">{res.hora_fin}</td>
              <td className="px-6 py-4">
                {res.duracion > 1 ? `${res.duracion} horas` : `${res.duracion} hora`}
              </td>
              <td className="px-6 py-4 flex">
                <FaEdit
                  onClick={() => handleEditReservas(res)}
                  className="h-6 w-6 text-blue-600 cursor-pointer pl-0.5"
                />
                <MdDeleteForever
                  onClick={() => handleDeleteReservas(res)}
                  className="h-6 w-6 text-red-600 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerReservas;
