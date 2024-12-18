import React, { useContext, useState } from "react";
import axios from "axios";
import Libre from "../components/Libre";
import Ocupado from "../components/Ocupado";
import { CanchasContext } from "../context/CanchasContext";
import { useLocation } from "react-router-dom";

function Canchas() {
    const location = useLocation();
    const {
        selectedDate: initialSelectedDate,
        listaCanchas,
        idCanchaSeleccionada,
        selectedCanchas: initialSelectedCanchas,
    } = location.state || {};
    const { canchas, loading, error } = useContext(CanchasContext);

    const fechaActual = new Date();

    const [selectedDate, setSelectedDate] = useState(initialSelectedDate || fechaActual.toISOString().split("T")[0]);
    const [cancha, setCancha] = useState(
        initialSelectedCanchas && initialSelectedCanchas.length > 1
            ? "0" // Mostrar "Todas" si hay múltiples canchas
            : initialSelectedCanchas && initialSelectedCanchas[0]
            ? initialSelectedCanchas[0].id.toString()
            : ""
    );

    const [filteredCanchas, setFilteredCanchas] = useState(initialSelectedCanchas || []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleNuevaConsulta = async () => {
        try {
            const canchaId = parseInt(cancha, 10) || 0;

            console.log("Consultando reservas para:", selectedDate, "canchaId:", canchaId);

            const response = await axios.get("http://localhost:5555/reservas-por-dia/", {
                params: {
                    dia: selectedDate,
                    cancha_id: canchaId,
                },
            });

            if (response.status === 200) {
                const { message, reservas } = response.data;

                console.log("Mensaje del backend:", message);
                console.log("Reservas obtenidas:", reservas);

                if (!Array.isArray(reservas)) {
                    console.error("La respuesta no contiene un arreglo de reservas:", reservas);
                    alert("Error al obtener reservas. Contacte al administrador.");
                    return;
                }

                const canchasConReservas = canchas.map((c) => {
                    const reservasCancha = reservas.filter((r) => r.cancha_id === c.id);
                    const horarios = reservasCancha.map((r) => ({
                        hora: parseInt(r.hora.split(":")[0], 10),
                        duracion: r.duracion,
                    }));

                    return {
                        ...c,
                        horarios: horarios || [],
                    };
                });

                setFilteredCanchas(canchasConReservas);
            } else {
                console.log("Respuesta inesperada:", response.data);
                alert("Hubo un problema al consultar las reservas. Intente nuevamente.");
            }
        } catch (error) {
            console.error("Error al consultar reservas:", error);
            alert("No se pudo realizar la consulta. Verifique su conexión o contacte al administrador.");
        }
    };

    const handleChangeCancha = (e) => {
        setCancha(e.target.value); // Almacena el valor del select como cadena
    };

    if (loading) {
        return <div>Cargando lista de canchas...</div>;
    }

    if (error) {
        return <div>Error al cargar las canchas: {error}</div>;
    }

    if (!canchas || canchas.length === 0) {
        return <div>No hay canchas disponibles</div>;
    }

    // Definir canchas a mostrar según la selección
    const canchasAMostrar =
        cancha === "0"
            ? filteredCanchas // Mostrar todas las canchas
            : filteredCanchas.filter((c) => c.id.toString() === cancha); // Mostrar una específica

    console.log("Canchas a mostrar:", canchasAMostrar);

    return (
        <div>
            <div className="text-center text-lg">
                <h2>Disponibilidad para el día {selectedDate}</h2>
                <div>
                    <div className="mb-3">
                        <label
                            htmlFor="dia"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/6"
                        >
                            Día
                        </label>
                        <input
                            type="date"
                            id="dia"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="bg-gray-50 border text-sm rounded-lg block w-1/6 p-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="cancha"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/6"
                        >
                            Cancha
                        </label>
                        <select
                            id="cancha"
                            value={cancha}
                            onChange={handleChangeCancha}
                            className="bg-gray-50 border text-sm rounded-lg block w-1/6 p-2.5"
                        >
                            <option value="0">Todas</option>
                            {canchas &&
                                canchas.map((cancha) => (
                                    <option key={cancha.id} value={cancha.id}>
                                        {cancha.nombre}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button
                        onClick={handleNuevaConsulta}
                        type="button"
                        className="text-white text-left bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-3"
                    >
                        Consultar
                    </button>
                </div>
            </div>

            <div id="detailed-pricing" className="w-full overflow-x-auto">
                <div className="overflow-hidden min-w-max">
                    <div className="grid grid-cols-9 px-0.5 py-4 text-md font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <div className="flex items-center w-18">Horarios</div>
                        {[14, 15, 16, 17, 18, 19, 20, 21].map((hora) => (
                            <div key={hora} className="w-8">
                                {hora}
                            </div>
                        ))}
                    </div>

                    {canchasAMostrar.length > 0 ? (
                        canchasAMostrar.map((cancha) => (
                            <div
                                key={cancha.id}
                                className="grid grid-cols-9 px-2 py-4 text-sm text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700"
                            >
                                <div className="text-gray-500 dark:text-gray-400 pl-0">{cancha.nombre}</div>
                                {[14, 15, 16, 17, 18, 19, 20, 21].map((hora) => {
                                    const ocupada =
                                        Array.isArray(cancha.horarios) &&
                                        cancha.horarios.some(
                                            (h) => hora >= h.hora && hora < h.hora + h.duracion
                                        );

                                    return (
                                        <div key={hora}>
                                            {ocupada ? (
                                                <Ocupado horas={hora} cancha={cancha.nombre} />
                                            ) : (
                                                <Libre horas={hora} cancha={cancha.nombre} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <div>No hay reservas para la fecha seleccionada.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Canchas;
