import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { CanchasContext } from '../context/CanchasContext';




// if (loading) return <p>Cargando canchas...</p>;
// if (error) return <p>Error: {error}</p>;


function FormReservas(props) {
    // Usar las canchas de las props (puedes quitar el contexto si no lo usas aquí)
    const listaCanchas = props.listaCanchas;
    console.log("FormReservas", listaCanchas)

    // Estado para almacenar los valores del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cancha, setCancha] = useState(''); // Aquí se guardará el ID de la cancha seleccionada
    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const [duracion, setDuracion] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Generar horas disponibles
    const horasDisponibles = [];
    for (let h = 14; h <= 21; h++) {
        const horaString = `${h < 10 ? '0' + h : h}:00`;
        horasDisponibles.push(horaString);
    }

    // useEffect para inicializar el valor de 'dia' basado en props.fechaSeleccionada
    useEffect(() => {
        const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
        if (props.fechaRes) {
            const fechaSeleccionada = props.fechaRes;
            if (/^\d{4}-\d{2}-\d{2}$/.test(fechaSeleccionada)) {
                setDia(fechaSeleccionada);
            } else {
                setDia(hoy); // Fallback a la fecha actual
            }
        } else {
            setDia(hoy);
        }
    }, [props.fechaRes]);

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
        alert(`Día: ${dia}\nHora de Inicio: ${hora}\nDuración: ${duracion}\nTeléfono: ${telefono}\nNombre: ${nombre}\nCancha ID: ${cancha}`);
        try {
            await axios.post(`http://localhost:5555/reservas/`, {
                dia,
                hora,
                duracion,
                telefono,
                nombre_contacto: nombre,
                cancha_id: parseInt(cancha), // Convertir cancha a número
            }, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Reserva creada correctamente");
            // Reiniciar el formulario
            setNombre('');
            setTelefono('');
            setCancha('');
            setHora('');
            setDuracion(1);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.detail);
            } else {
                console.error("Error al crear la Reserva:", error);
                alert("Hubo un error al crear la Reserva");
            }
        }
    }

    // Renderizado
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
                                id="name" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                                required 
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                            <input 
                                type="tel" 
                                id="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                pattern="\d{10}" 
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5" 
                                placeholder="Ingrese su número" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="dia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Día</label>
                            <input 
                                type="date"
                                id="dia"
                                value={dia}
                                onChange={(e) => setDia(e.target.value)}
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5" 
                            />
                        </div>
                        <div>
                            <label htmlFor="hora" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                            <select 
                                id="hora"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
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
                                onChange={(e) => setDuracion(parseInt(e.target.value))}
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="cancha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cancha</label>
                            <select 
                                id="cancha" 
                                value={cancha}
                                onChange={(e) => setCancha(e.target.value)}
                                className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                            >
                                <option value="">Elija una cancha</option>
                                {listaCanchas && listaCanchas.map((cancha) => (
                                    <option key={cancha.id} value={cancha.id}>{cancha.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button 
                        disabled={isButtonDisabled}
                        type="submit"
                        className={`w-full px-5 py-2.5 mt-4 text-sm font-medium text-white rounded-lg ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
                    >
                        Agregar Reserva
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormReservas;
