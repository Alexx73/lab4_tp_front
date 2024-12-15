import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CanchasProvider } from '../context/CanchasContext'; // Importa el proveedor
import Inicio from '../pages/Inicio';
import VerReservas from '../pages/VerReservas';
import Reservas from '../pages/Reservas';
import paddleLogo from '../assets/paddle.png';
import VerCanchas from '../pages/VerCanchas';
import FormReservas from './FormReservas2';

function Nav() {
  const fechaActual = new Date();
  const opcionesFormato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFormato);

  return (
    <CanchasProvider> {/* Envuelve la aplicación con el proveedor */}
      <Router>
        <div>
          <nav className="bg-gray-500 text-white">
            <div className="flex-start text-right pr-5">
              <h3>{fechaFormateada}</h3>
            </div>
            <ul className="flex space-x-6 p-4">
              <li>
                <Link to="/" className="hover:text-blue-700">
                  <img src={paddleLogo} alt="Logo" className="w-12 h-12" />
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400">Inicio</Link>
              </li>
              <li>
                <Link to="/ver-canchas" className="hover:text-blue-400">Ver Canchas</Link>
              </li>
              <li>
                <Link to="/ver-reservas" className="hover:text-blue-400">Ver Reservas</Link>
              </li>
              <li>
                <Link to="/hacer-reserva" className="hover:text-blue-400">Hacer Reserva</Link>
              </li>
            </ul>
          </nav>

          <div className="p-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/ver-canchas" element={<VerCanchas />} />
              <Route path="/ver-reservas" element={<VerReservas />} />
              <Route path="/hacer-reserva" element={<Reservas />} />
              <Route path="/form-reserva" element={<FormReservas />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CanchasProvider>
    
  );
}

export default Nav;
