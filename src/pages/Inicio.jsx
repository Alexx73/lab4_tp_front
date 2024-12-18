import React, { useState, useContext } from 'react';
import { CanchasContext } from '../context/CanchasContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar español
import { useNavigate } from 'react-router-dom';
import canchaImage from '../assets/Mi-canchita.jpg'; // Importar imagen correctamente

const Inicio = () => {
    const { canchas, loading, error } = useContext(CanchasContext); // Acceder al contexto
    const [cancha, setCancha] = useState(); // ID de la cancha seleccionada
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [selectedCanchas, setSelectedCanchas] = useState([]); // Fecha seleccionada

    const navigate = useNavigate();

    // Manejar selección de fecha
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    function handleSelectedCanchas(e){
        const selectedId = parseInt(e.target.value, 10); // Convertir el valor a entero
        setCancha(selectedId); // Actualizar el estado de la cancha seleccionada
        
        if (selectedId === 0) {
            // Si se selecciona "Todas"
            setSelectedCanchas(canchas);
        } else {
            // Buscar la cancha específica seleccionada
            const canchaSeleccionada = canchas.find((c) => c.id === selectedId);
            setSelectedCanchas(canchaSeleccionada ? [canchaSeleccionada] : []);
        }
    }

    // Manejar el envío del formulario
    const handleEnviar = () => {
        if (!selectedDate) {
            alert('Por favor, seleccione una fecha.');
            return;
        }
        if (cancha === null || cancha === undefined) {
            alert('Por favor, seleccione una cancha.');
            return;
        }

        const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Formatear la fecha

        navigate('/hacer-reserva', {
            state: {
                selectedDate: formattedDate,
                listaCanchas: canchas,
                idCanchaSeleccionada: cancha,
                selectedCanchas: selectedCanchas
            },     
        },
       
    );
    };
    

    // Mostrar estado de carga o error
    if (loading) return <p>Cargando canchas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Bienvenido al Club de Padel Mi Canchita</h1>
            <img 
                src={canchaImage} 
                alt="Cancha de Padel" 
                className="mb-4 rounded-lg shadow-md"
                style={{ width: '80%', maxWidth: '500px' }}
            />
            <p className="text-lg text-center mb-6">
                Reserve su cancha fácilmente. Seleccione una fecha y haga su reserva.
            </p>


                
            <div className="flex">
                {/* Selector de fecha */}
                <div className="mb-8 mx-8"> 
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                        dateFormat="dd/MM/yyyy"
                        // Aplicar el locale español
                        locale={es} 
                        className="border rounded-lg p-2"
                        placeholderText="Seleccione una fecha"
                    />
                </div>

                {/* Selector de cancha */}
                <div> 
                    <select 
                        id="cancha" 
                        value={cancha}
                         // Convertir a entero
                        onChange={(e) => handleSelectedCanchas(e)}
                        className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                    >
                        <option value="">Elija una cancha</option>
                        {/* Opción para seleccionar todas las canchas */}
                        <option value="0">Todas</option> 
                        
                        {canchas && canchas.map((cancha) => (
                            <option key={cancha.id} value={cancha.id}>{cancha.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botón de envío */}
            <button 
                onClick={handleEnviar}
                type="button" 
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2"
            >
                Enviar
            </button>
        </div>
    );
};

export default Inicio;
