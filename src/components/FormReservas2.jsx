import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormReservas(props) {
    const listaCanchas = props.listaCanchas;
    console.log("Fecha para FormReservas: " + props.fechaRes)

    // Estado para almacenar los valores del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cancha, setCancha] = useState('');
    const [dia, setDia] = useState(''); // Estado para la fecha seleccionada
    const [hora, setHora] = useState('');
    const [duracion, setDuracion] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Generar horas disponibles
    const horasDisponibles = [];
    for (let h = 12; h <= 21; h++) {
        const horaString = `${h < 10 ? '0' + h : h}:00`;
        horasDisponibles.push(horaString);
    }

    // useEffect para inicializar el valor de 'dia' basado en props.fechaSeleccionada
    useEffect(() => {
        const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
        if (props.fechaRes) {
            const fechaSeleccionada = props.fechaRes
            if (/^\d{4}-\d{2}-\d{2}$/.test(fechaSeleccionada)) {
                setDia(fechaSeleccionada); // Fecha válida desde props
                console.log("Fecha válida recibida:", fechaSeleccionada);
            } else {
                console.warn("Fecha inválida recibida:", fechaSeleccionada);
                setDia(hoy); // Fallback a la fecha actual
            }
        } else {
            setDia(hoy); // Si no hay fecha, usar fecha actual
            console.log("No se recibió fecha en props, usando la fecha actual:", hoy);
        }
    }, [props.fechaSeleccionada]);

    // useEffect para habilitar/deshabilitar el botón
    useEffect(() => {
        if (nombre && telefono && cancha && dia && hora && duracion) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [nombre, telefono, cancha, dia, hora, duracion]);

    // Función para agregar la reserva
    async function AgregarReserva(event) {
        event.preventDefault();
        alert(`Día: ${dia}\nHora de Inicio: ${hora}\nDuración: ${duracion}\nTeléfono: ${telefono}\nNombre: ${nombre}\nCancha: ${cancha.id}`);
        try {
            // Realizar solicitud al backend para crear una nueva cancha
            const response = await axios.post(`http://localhost:5555/reservas/`, {
                dia: "2024-12-29",
                hora: hora,
                duracion: duracion,
                telefono: telefono,
                nombre_contacto: nombre,
                cancha_id: 1

                //// Schema ///////
            // {
            //     "dia": "string",
            //     "hora": "string",
            //     "duracion": 0,
            //     "telefono": "string",
            //     "nombre_contacto": "string",
            //     "cancha_id": 0
            //   }              
            },
            {
                headers: {
                    "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
                },
            }
        );

           
            // Actualizar la lista local de canchas con los nuevos datos
            alert("Reserva creada correctamente");
            // Reiniciar el formulario

        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.detail); // Muestra el mensaje del backend
            } else {
                console.error("Error al crear la Reserva:", error);
                alert("Hubo un error al crear la Reserva", error);
            }
        } 
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
                                onChange={(e) => setNombre(e.target.value)}
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
                                onChange={(e) => setTelefono(e.target.value)}
                                minLength="10" 
                                maxLength="10" 
                                pattern="\d{10}" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Ingrese su número" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="dia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Día</label>
                            <input 
                                type="date"
                                id="dia"
                                value={dia} // Estado sincronizado con el input
                                onChange={(e) => setDia(e.target.value)} // Actualizar el estado cuando el usuario cambie la fecha
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            />
                        </div>
                        <div>
                            <label htmlFor="hora" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                            <select 
                                id="hora"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Selecciona una hora</option>
                                {horasDisponibles.map((horaOption, index) => (
                                    <option key={index} value={horaOption}>{horaOption}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="duracion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duración (horas)</label>
                            <input 
                                type="number"
                                id="duracion"
                                min={1}
                                max={8}
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cancha</label>
                            <select 
                                id="category" 
                                value={cancha}
                                onChange={(e) => setCancha(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Elija cancha</option>
                                {listaCanchas.map((cancha) => <option key={cancha} value={cancha}>{cancha}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <button 
                            disabled={isButtonDisabled}
                            type="submit"
                            className={`inline-flex items-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900`}
                        >
                            Agregar Reserva
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default FormReservas;
