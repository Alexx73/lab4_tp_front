import React, { useState, useEffect , useContext } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

import { CanchasContext } from '../context/CanchasContext';


function ListaCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCancha, setSelectedCancha] = useState(null); // Estado para la cancha seleccionada

  // { useContext }




  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axios.get('http://localhost:5555/canchas');
  
        // Ordenar las canchas por ID en orden ascendente
        const sortedCanchas = response.data.sort((a, b) => a.id - b.id);
  
        setCanchas(sortedCanchas); // Establecer las canchas ordenadas en el estado
      } catch (error) {
        setError('Error al obtener las canchas');
        console.error("Error al obtener las canchas:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCanchas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className='min-h-[300px]'><p>{error}</p></div>;
  }

  // Función para abrir el modal y establecer la cancha seleccionada
  const handleEditCancha = (cancha) => {
    setSelectedCancha({ ...cancha }); // Pasa el objeto completo
    setShowModal(true); // Abre el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedCancha(null); // Limpia la cancha seleccionada
    setShowModal(false); // Cierra el modal
  };

  // Función para guardar cambios
  const saveChanges = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    if (!selectedCancha.nombre.trim()) {
      alert("El nombre de la cancha no puede estar vacío");
      return;
    }

    try {
      // Realizar solicitud al backend para actualizar los datos
      const response = await axios.patch(`http://localhost:5555/canchas/${selectedCancha.id}`, {
        nombre: selectedCancha.nombre,
        techada: selectedCancha.techada,
      });

      // Actualizar la lista local de canchas con los nuevos datos
      setCanchas((prevCanchas) =>
        prevCanchas.map((cancha) =>
          cancha.id === selectedCancha.id ? response.data : cancha
        )
      );

      closeModal(); // Cerrar el modal después de guardar
      alert("Cancha actualizada correctamente");
      // fetchCanchas()
    } catch (error) {
      console.error("Error al actualizar la cancha:", error);
      alert("Hubo un error al actualizar la cancha");
    }
  };

  async function handleDeleteCancha(id) {
    console.log("id: " + id);
    
    // Confirmar la eliminación
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas borrar la cancha con ID: ${id}?`);
    if (!confirmDelete) return;
  
    try {
      // Enviar solicitud DELETE al backend
      await axios.delete(`http://localhost:5555/canchas/${id}`);
      alert("Cancha borrada exitosamente");
      // Actualizar el estado local eliminando la cancha borrada
      setCanchas((prevCanchas) => prevCanchas.filter((cancha) => cancha.id !== id));
  
      
    } catch (error) {
      // setError("Error al borrar la cancha");
        if (error.response && error.response.data && error.response.data.detail) {
          alert(`Error: ${error.response.data.detail}`); // Muestra el detalle
      } else {
          alert("Error desconocido al intentar eliminar la cancha.");
      }
    }
  }
  



  return (
    <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="w-1/10 px-2 py-3">ID</th>
            <th className="w-1/4">Cancha</th>
            <th className="w-1/4">Techada</th>
            <th className="w-1/8">Acción</th>
          </tr>
        </thead>
        <tbody>
          {canchas.map((cancha) => (
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
                  onClick={() => handleDeleteCancha(cancha.id) }
                  className="h-6 w-6 text-red-600 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedCancha && ( // Asegúrate de que selectedCancha esté definido
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-5 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Cancha</h3>
            <form className="space-y-4" onSubmit={saveChanges}>
              <div>
                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre de la cancha
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={selectedCancha.nombre || ''} // Muestra el nombre de la cancha seleccionada
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white"
                  onChange={(e) => setSelectedCancha({ ...selectedCancha, nombre: e.target.value })} // Permite editar el nombre
                />
              </div>
              
              {/* Campo para seleccionar si es techada */}
              <div>
                <label htmlFor="techada" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ¿Es techada?
                </label>
                <select
                  id="techada"
                  value={selectedCancha.techada ? 'SI' : 'NO'} // Muestra el valor actual: "SI" o "NO"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white"
                  onChange={(e) =>
                    setSelectedCancha({
                      ...selectedCancha,
                      techada: e.target.value === 'SI', // Actualiza a true o false
                    })
                  }
                >
                  <option value="SI">Sí</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ******* Form ******* */}




    </div>
  );
}

export default ListaCanchas;
