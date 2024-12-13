import React from 'react'
import Libre from '../components/Libre'
import Ocupado from '../components/Ocupado'

function Canchas(props) {
    const listaCanchas = ["Cancha 1", "Cancha 2", "Cancha 3", "Cancha 4", "Cancha 5"];
    const listaCanchas2 = props.listaCanchas
    const cantHoras = 10
    
    // Crear el objeto de horarios dinámicamente basado en listaCanchas
    const horarios = listaCanchas2.reduce((acc, cancha) => {
        acc[cancha] = new Array(cantHoras).fill(false); // Inicializa todas las horas como libres
       
        return acc;
    }, {});

    const horaOcupada = 18; // La hora que está ocupada (16:00)
    
    // Marcamos la hora 16 como ocupada en todas las canchas
    listaCanchas.forEach(cancha => {
        
        horarios[cancha][horaOcupada - 12] = true; // Ajustamos el índice, ya que los horarios empiezan a las 12
    });

    return (
        <div id="detailed-pricing" className="w-full overflow-x-auto">
            <div className="overflow-hidden min-w-max">
                <div className="grid grid-cols-11 px-0.5 py-4 text-md font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <div className="flex items-center w-18">Horarios</div>
                    <div className="w-8">12</div>
                    <div className="w-8">13</div>
                    <div className="w-8">14</div>
                    <div className="w-8">15</div>
                    <div className="w-8">16</div>
                    <div className="w-8">17</div>
                    <div className="w-8">18</div>
                    <div className="w-8">19</div>
                    <div className="w-8">20</div>
                    <div className="w-8">21</div>
                    {/* <div className="w-8">22</div> */}
                </div>

                {listaCanchas2.map((cancha, index) => (
                    <div key={index} className="grid grid-cols-11 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                        <div className="text-gray-500 dark:text-gray-400 pl-0">
                            {cancha}
                        </div>

                        {/* Renderizar el horario de la cancha - Libre/Ocupado */}
                        {horarios[cancha].map((item, idx) => (
                            <div key={idx}>
                                {item ? <Ocupado /> : <Libre horas={ idx + 12}  cancha={cancha }  />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Canchas;
