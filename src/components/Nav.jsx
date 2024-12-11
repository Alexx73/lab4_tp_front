import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Inicio from '../pages/Inicio';
// import Canchas from '../pages';
import VerReservas from '../pages/VerReservas';

import Reservas from '../pages/Reservas';

import paddleLogo from '../assets/paddle.png'; // Importa la imagen



function Nav() {
  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav className="bg-gray-800 text-white">
            {/* <div className="flex items-center space-x-2">
              <img src={paddleLogo} alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Reserva de Canchas</span>
            </div> */}
          <ul className="flex space-x-6 p-4">
            
          <li>
              <Link to="/" className="hover:text-gray-400">
              <img src={paddleLogo} alt="Logo" className="w-8 h-8" />
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-400">Inicio</Link>
            </li>
            <li>
              <Link to="/ver-canchas" className="hover:text-gray-400">Ver Canchas</Link>
            </li>
            <li>
              <Link to="/ver-reservas" className="hover:text-gray-400">Ver Reservas</Link>
            </li>
            <li>
              <Link to="/hacer-reserva" className="hover:text-gray-400">Hacer Reserva</Link>
            </li>
          </ul>
        </nav>

        {/* Rutas */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ver-canchas" element={<Reservas />} />
            <Route path="/ver-reservas" element={<VerReservas />} />
            <Route path="/hacer-reserva" element={<Reservas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Nav;
