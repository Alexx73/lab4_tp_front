import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { CanchasContext } from '../context/CanchasContext';


function FormCanchas({ setcanchas}) { // Asegúrate de recibir setCanchas como prop
    // Estado para almacenar los valores del formulario
    const [canchaParaAgregar, setCanchaParaAgregar] = useState({ nombre: '', techada: false });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón



    // Función para verificar si todos los campos están completos
    useEffect(() => {
        if (canchaParaAgregar.nombre.trim() && typeof canchaParaAgregar.techada === 'boolean') {
            setIsButtonDisabled(false); // Habilitar el botón si todos los campos están completos
        } else {
            setIsButtonDisabled(true); // Deshabilitar el botón si falta algún campo
        }
    }, [canchaParaAgregar]); // Solo dependemos de canchaParaAgregar

    async function AgregarCancha(event) {
        event.preventDefault(); // Prevenir el envío del formulario   
        
        // Validar que el nombre de la canchaParaAgregar no esté vacío
        if (!canchaParaAgregar.nombre.trim()) {
            alert("El nombre de la cancha no puede estar vacío");
            return;
        }
    
        try {
            console.log("Enviando solicitud para crear la canchaParaAgregar...");
            
            // Enviar la solicitud al backend para crear la canchaParaAgregar
            const response = await axios.post("http://localhost:5555/canchas/", {
                nombre: canchaParaAgregar.nombre,
                techada: canchaParaAgregar.techada,
            });
    
            console.log("Respuesta del servidor:", response);
    
            // Verificar que la respuesta tenga éxito
            if (response.status === 201 || response.status === 200) {
                // Actualizar el estado con la nueva canchaParaAgregar
                setCanchas((prevCanchas) => [...prevCanchas, response.data]);
                
                alert("Cancha creada correctamente");
            } else {
                console.warn("Código de estado inesperado:", response.status);
                alert(`La canchaParaAgregar fue creada, pero con un código de estado inesperado: ${response.status}`);
            }
    
            // Reiniciar el formulario
            setCanchaParaAgregar({ nombre: "", techada: false });
        } catch (error) {
            // Manejar errores del backend o del cliente
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                alert("Error al crear la cancha Para Agregar:\n\n" + error.response.data.detail);
            } else {
                console.error("Error de red o configuración:", error.message);
                alert("Error al crear la canchaParaAgregar: " + error.message);
            }
        }
    }
    
    

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="px-4 mx-auto max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agregar Canchas</h2>
                <form onSubmit={AgregarCancha}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={canchaParaAgregar.nombre} // Usar el campo nombre del objeto canchaParaAgregar
                                onChange={(e) => setCanchaParaAgregar({ ...canchaParaAgregar, nombre: e.target.value })} // Actualiza el estado correctamente
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Nombre de cancha" 
                                required 
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="techada" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Techada</label>
                            <select 
                                id="techada" 
                                onChange={(e) => setCanchaParaAgregar({ ...canchaParaAgregar, techada: e.target.value === 'SI' })} // Actualiza techada a true o false
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Elija opción</option> {/* Valor vacío por defecto */}
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>                            
                            </select>
                        </div>
                    </div>

                    <div className="lg:col-span-2"> 
                        <button 
                            disabled={isButtonDisabled} // Deshabilitar el botón si isButtonDisabled es true
                            type="submit"
                            className={`inline-flex justify-center items-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary=900`}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    ); 
}

export default FormCanchas;
