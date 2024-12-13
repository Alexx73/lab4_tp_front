import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { es } from 'date-fns/locale'; // Importar español

const Inicio = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        
        // Formatear la fecha a "día, dd-MM-yyyy"
        const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' }); // Obtener el día de la semana en español
        // const formattedDate = format(date, 'dd-MM-yyyy'); // Formato de fecha
        const formattedDate = format(date, 'yyyy-MM-dd'); // Formato de fecha

        // console.log(`Fecha seleccionada: ${dayOfWeek}, ${formattedDate}`);
        
        // Navegar a la página "Ver Reservas"
        // navigate('/hacer-reserva', { state: { selectedDate: `${dayOfWeek}, ${formattedDate}` } });
        
        navigate('/hacer-reserva', { state: { selectedDate: `${formattedDate}` } });
        console.log("inicio: " + state.selectedDate)

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Bienvenido al Club de Padel Mi Canchita</h1>
            <img 
                src="src/assets/Mi-canchita.jpg"  
                alt="Cancha de Padel" 
                className="mb-4 rounded-lg shadow-md"
                style={{ width: '80%', maxWidth: '500px' }}
            />
            <p className="text-lg text-center mb-6">
                Reserve su cancha fácilmente. Seleccione una fecha y haga su reserva.
            </p>
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
        </div>
    );
};

export default Inicio;
