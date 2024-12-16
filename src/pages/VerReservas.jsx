import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cargando from '../components/Cargando';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

function VerReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [canchas, setCanchas] = useState([]); // Lista de canchas disponibles

  const fechaActual = new Date(); 
  const date = new Date();
  const formattedDate = date.toLocaleString("es-ES", { month: "long" });
  const year = fechaActual.getFullYear();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/reservas');
        console.log("respuest get reservas",response.data)

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

    const fetchCanchas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/canchas');
        setCanchas(response.data); // Guardar la lista de canchas en el estado
      } catch (error) {
        console.error("Error al obtener las canchas:", error);
      }
    };

    fetchReservas();
    fetchCanchas();
  }, []);

  const handleEditReservas = (reserva) => {
    setSelectedReserva(reserva);
    setShowModal(true);
  };

 async function handleDeleteReservas(res) {
  try {
    const response = await axios.delete(
      `http://localhost:5555/reservas/${res.id}`)
      alert(`Reserva con ID: ${res.id} se borro exitosamente`)
      // Actualizar el estado local eliminando la cancha borrada
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== res.id));
    
  } catch (error) {
    alert ("SE produjo un error, la reserva no se borro")
  }
  
 }

  const handleCloseModal = () => {
    setSelectedReserva(null);
    setShowModal(false);
  };

  //
//   await axios.post(`http://localhost:5555/reservas/`, {
//     dia,
//     hora,
//     duracion,
//     telefono,
//     nombre_contacto: nombre,
//     cancha_id: parseInt(cancha), // Convertir cancha a número
// }, {
//     headers: { "Content-Type": "application/json" },
// }
//
  const handleSaveChanges = async () => {
    if (!selectedReserva) return;
   
    try {
      console.log("id seleccionado: ", selectedReserva.id )
      const response = await axios.patch(
        `http://localhost:5555/reservas/${selectedReserva.id}`,
        {
          dia: selectedReserva.dia,
          hora: selectedReserva.hora,
          duracion: 1,
          telefono: selectedReserva.telefono,
          nombre_contacto: selectedReserva.nombre_contacto,         
          cancha_id: selectedReserva.cancha_id,
        },{
          headers: { "Content-Type": "application/json" },
      }

      );

      // Actualizar la lista local con los nuevos datos
      setReservas((prevReservas) =>
        prevReservas.map((res) =>
          res.id === selectedReserva.id ? response.data : res
        )
      );

      alert("Reserva actualizada correctamente");
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      alert("Hubo un error al actualizar la reserva." + error.detail);
    }
  };

  if (loading) {
    return <Cargando />;
  }

  if (error) {
    return <div className='min-h-[300px]'><p>{error}</p></div>;
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
            <th scope="col" className="px-6 py-3">Id Cancha</th>
            <th scope="col" className="px-6 py-3">Día</th>
            <th scope="col" className="px-6 py-3">Inicio</th>
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
              {/* // res.cancha_id */}
              <td className="px-6 py-4">{res.dia}</td>
              <td className="px-6 py-4">{res.hora}</td>
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

      {/* Modal */}

      {showModal && selectedReserva && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-6 max-w-sm w-3/4">
    <h3 className="text-lg font-bold mb-4 text-center">Editar Reserva Id: {selectedReserva.id}</h3>
    <form>
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Nombre</label>
        <input
          type="text"
          value={selectedReserva.nombre_contacto}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, nombre_contacto: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
        />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Teléfono</label>
        <input
          type="text"
          value={selectedReserva.telefono}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, telefono: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
        />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Día</label>
        <input
          type="date"
          value={selectedReserva.dia}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, dia: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
        />
      </div>


      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Hora</label>
        <select
          value={selectedReserva.hora}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, hora: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
        >
          {Array.from({ length: 8 }, (_, i) => {
            const hour = i + 14;
            const formattedHour = `${hour < 10 ? '0' : ''}${hour}:00`;
            return (
              <option key={formattedHour} value={formattedHour}>
                {formattedHour}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Duración</label>
        <input
          type="number"
          value={selectedReserva.duracion}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, duracion: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
          min={1}
          max={8}
        />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium text-center mb-2">Cancha</label>
        <select
          value={selectedReserva.cancha_id}
          onChange={(e) =>
            setSelectedReserva({ ...selectedReserva, cancha_id: e.target.value })
          }
          className="border rounded-lg w-3/4 p-2 mx-auto" // Centrando el input
        >
          {canchas.map((cancha) => (
            <option key={cancha.id} value={cancha.id}>
              {cancha.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</div>

  

  )}


      {/* /// */}
    </div>
  );
}

export default VerReservas;
