import React, { useState } from 'react';
import { MdDeleteForever, MdAddCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from '../components/Modal';

function VerCanchas() {
  const [showModal, setShowModal] = useState(false);

  function handleAddCancha() {
    console.log("Modal abierto");
    setShowModal(true); // Cambia el estado a true para abrir el modal
  }

  function closeModal() {
    setShowModal(false); // Cambia el estado a false para cerrarlo
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Cancha</th>
            <th scope="col" className="px-6 py-3">Techada</th>
            <th scope="col" className="px-6 py-3">Action</th>
            <div>
              <MdAddCircle
                onClick={handleAddCancha}
                className="text-4xl text-blue-600 cursor-pointer"
              />
            </div>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
            <td className="px-6 py-4">Cancha 1</td>
            <td className="px-6 py-4">Si</td>
            <td className="flex px-6 py-4">
              <FaEdit
                onClick={() => alert("editar")}
                className="text-2xl text-blue-600 cursor-pointer pl-0.5"
              />
              <MdDeleteForever
                onClick={() => alert("Borrar")}
                className="text-2xl text-red-600 cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>

    
    </div>
  );
}

export default VerCanchas;
