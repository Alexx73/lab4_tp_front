import React, { useState , useEffect} from 'react';
import Canchas from '../pages/Canchas';

function FormReservas2() {
    // Estado para almacenar los valores del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [peso, setPeso] = useState(''); // Asegúrate de definir el estado para peso
    const [cancha, setCancha] = useState('');
    const [dia, setDia] = useState(new Date().toISOString().split('T')[0]); // Día actual en formato YYYY-MM-DD
    const [hora, setHora] = useState(new Date().toTimeString().slice(0, 5)); // Hora actual en formato HH:mm
    const [duracion, setDuracion] = useState(1); // Duración inicial

    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para habilitar/deshabilitar el botón

    // Función para verificar si todos los campos están completos
    useEffect(() => {
        if (nombre && telefono && cancha && dia && hora && duracion) {
            setIsButtonDisabled(false); // Habilitar el botón si todos los campos están completos
        } else {
            setIsButtonDisabled(true); // Deshabilitar el botón si falta algún campo
        }
    }, [nombre, telefono, cancha, dia, hora, duracion]);

    function AgregarReserva(event) {
        const formattedDate = formatDate(dia); // Formatear la fecha antes de mostrarla
        event.preventDefault(); // Previene el envío del formulario
        alert(`Nombre: ${nombre}\nTeléfono: ${telefono}  \nDia: ${formattedDate}  \nHora de Inicio: ${hora}   \nDuracion: ${duracion} \n${cancha}  `);
    }

    function formatDate(dateString) {
        const date = new Date(dateString); // Convertir a objeto Date
        const day = String(date.getDate()).padStart(2, '0'); // Obtener el día y agregar un cero delante si es necesario
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes (0-11) y agregar uno
        const year = date.getFullYear(); // Obtener el año
        return `${day}-${month}-${year}`; // Formato "día-mes-año"
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="px-4 mx-auto max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agregar Reserva</h2>
                <form onSubmit={AgregarReserva}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)} // Actualiza el estado
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Ingrese su Nombre" 
                                required 
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                            <input 
                                type="tel" 
                                name="telefono" 
                                id="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado
                                minLength="10" 
                                maxLength="10" 
                                pattern="\d{10}" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Ingrese su número" 
                                required 
                            />
                        </div>

                          {/* Campo para el Día */}
                        <div>
                            <label htmlFor="dia" className="block mb--2 text-sm font-medium text-gra--y--900 da--rk:text-white">Día</label>
                            <input 
                                type="date"
                                id="dia"
                                value={dia}
                                onChange={(e) => setDia(e.target.value)} // Actualiza el estado
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                             />
                         </div>

                         {/* Campo para la Hora */}
                         <div>
                            <label htmlFor="hora" className="block mb--2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                            <input 
                                type="time"
                                id="hora"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)} // Actualiza el estado
                                className="bg-gray-50 border border-gray--300 text-gray--900 text-sm rounded-lg focus:ring-primary--600 focus:border-primary--600 block w-full p--2.5 dark:bg-gra--y--700 dark:border-gra--y--600 da--rk:text-white da--rk:focus:ring-pri--mary--500 da--rk:focus:border-pri--mary--500"
                            />
                        </div>

                         {/* Campo para la Duración */}
                         <div>
                            <label htmlFor="duracion" className="block mb--2 text-sm font-medium text-gra--y--900 da--rk:text-white">Duración (horas)</label>
                            <input 
                                type="number"
                                id="duracion"
                                min={1}
                                max={8}
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)} // Actualiza el estado
                                className= "bg-gra--y--50 border border-gra--y--300 te--xt-gra--y--900 te--xt-sm rounded-lg fo-cus:ring-pri-mary--600 fo-cus:border-pri-mary--600 block w-full p---2.5 da---rk:bg-gra---y---700 da---rk:border-gra---y---600 da---rk:placeholder-gra---y---400 da---rk:text-white da---rk:foc-us:ring-pri-mary---500 da---rk:foc-us.border-pri-mary---500"
                             />
                         </div> 
                       
                        <div>
                            <label htmlFor="category" className="block mb--2 text-sm font-medium text-gray-900 dark:text-white">Cancha</label>
                            <select 
                                id="category" 
                                value={cancha}
                                onChange={(e) => setCancha(e.target.value)} // Actualiza el estado
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Elija cancha</option>
                                <option value="Cancha 1">Cancha 1</option>
                                <option value="Cancha 2">Cancha 2</option>
                                <option value="Cancha 3">Cancha 3</option>
                                <option value="Cancha 4">Cancha 4</option>
                            </select>
                        </div>

                        
                    </div>

                    <div className="lg:col-span-2  "> 
                        <button 
                            disabled={isButtonDisabled} // Deshabilitar el botón si isButtonDisabled es true
                            type="submit" // Cambié a "submit"
                            // className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary=900 hover:bg-primary=800"
                            // className={`inline-flex items-center px----5 py----2.5 mt----4 sm:mt----6 te----xt-sm fo-n-t-medium te----xt-center te----xt-white ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} rounded-lg fo-cus:ring----4 fo-cus:ring-pri-mary----200 da-rk:foc-us:ring-pri-mary----900`}
                            
                            className={`inline-flex items-center w-full px-5 py-2.5 mt-4 sm:mt-6 tet-sm font-medium text-center text-white ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} rounded-lg focus:ring-4 focus:ring-pri-mary-200 da-rk:focus:ring-pri-mary-900`}
                            >
                            Agregar Reserva
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default FormReservas2;