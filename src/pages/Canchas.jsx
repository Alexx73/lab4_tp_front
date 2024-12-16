import React, { useContext } from 'react';
import Libre from '../components/Libre';
import Ocupado from '../components/Ocupado';
import { CanchasContext } from '../context/CanchasContext';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale'; // Importar español


function Canchas() {
    const location = useLocation();

    const { selectedDate, listaCanchas, canchaSeleccionada } = location.state || {}; // Si no hay estado, usar valores por defecto
    const { canchas, loading, error } = useContext(CanchasContext); // Acceder al contexto
    const fechaActual = new Date();
    const opcionesFormato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

     const canchaParaListar = [canchas[canchaSeleccionada-1]
    ]
     console.log("Canchas.js cancha para mostrar " +  canchaParaListar + "\nCancha seleccionada " ,  canchaSeleccionada)
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFormato);

    const handleDateChange = (date) => {
        setSelectedDate(date);
      }

    let fechaReserva = location.state && location.state.selectedDate ? location.state.selectedDate : fechaFormateada


    // Verificar si está cargando o si hubo un error
    if (loading) {
        return <div>Cargando lista de canchas...</div>;
    }

    if (error) {
        return <div>Error al cargar las canchas: {error}</div>;
    }

    // Si no hay canchas disponibles
    if (!canchas || canchas.length === 0) {
        return <div>No hay canchas disponibles</div>;
    }

    const cantHoras = 8; // Horas desde 14:00 hasta 21:00

    // Crear el objeto de horarios dinámicamente basado en la lista de canchas
    const horarios = canchas.reduce((acc, cancha) => {
        acc[cancha.nombre] = new Array(cantHoras).fill(false); // Inicializa todas las horas como libres
        return acc;
    }, {});

    const horaOcupada = 18; // Ejemplo: hora ocupada (16:00)
    canchas.forEach((cancha) => {
        horarios[cancha.nombre][horaOcupada - 14] = true; // Ajustamos el índice para que comience en 14
    });

    return (
        <div>
             <div className="text-center text-lg">
            <h2 className="text-lg	 " >  
              Disponibilidad para el día { fechaReserva }
            </h2>
            <div>
            <div className="mb-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                    dateFormat="dd/MM/yyyy"
                    locale={es} // Aplicar el locale español
                    className="border rounded-lg p-2"
                    placeholderText="Seleccione una fecha"
                />
            </div>

              <button 
                onClick={ () => alert("fecha de busqueda: " + selectedDate)}
                type="button"
                className="text-white text-left bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">
                  Enviar
              </button>

            </div>
            </div>


       

           {/* /////// */}
            <div id="detailed-pricing" className="w-full overflow-x-auto">
                <div className="overflow-hidden min-w-max">
                    {/* Encabezado de horarios */}
                    <div className="grid grid-cols-9 px-0.5 py-4 text-md font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        <div className="flex items-center w-18">Horarios</div>
                        {[14, 15, 16, 17, 18, 19, 20, 21].map((hora) => (
                            <div key={hora} className="w-8">{hora}</div>
                        ))}
                    </div>

                    {/* Renderizar las canchas */}
                    {canchas.map((cancha) => (
                        <div key={cancha.id} className="grid grid-cols-9 px-2 py-4 text-sm text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                            <div className="text-gray-500 dark:text-gray-400 pl-0">
                                {cancha.nombre}
                            </div>

                            {/* Renderizar el horario de la cancha */}
                            {horarios[cancha.nombre].map((item, idx) => (
                                <div key={idx}>
                                    {item ? (
                                        <Ocupado />
                                    ) : (
                                        <Libre horas={idx + 14} cancha={cancha.nombre} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Canchas;
