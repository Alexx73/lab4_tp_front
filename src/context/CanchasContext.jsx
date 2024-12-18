import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const CanchasContext = createContext();

// Crear el proveedor del contexto
export const CanchasProvider = ({ children }) => {
  const [canchas, setCanchas] = useState([]); // Estado para almacenar las canchas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axios.get("http://localhost:5555/canchas"); // Endpoint para obtener las canchas

        // Ordenar las canchas numéricamente
        const sortedCanchas = response.data.sort((a, b) => {
          // Extraer números del nombre de la cancha
          const numA = parseInt(a.nombre.match(/\d+/)?.[0] || "0", 10);
          const numB = parseInt(b.nombre.match(/\d+/)?.[0] || "0", 10);

          return numA - numB; // Ordenar numéricamente
        });

        setCanchas(sortedCanchas); // Actualiza el estado con los datos ordenados
      } catch (error) {
        setError("Error al obtener las canchas"); // Maneja errores
        console.error("Error al obtener las canchas:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchCanchas();
  }, []); // Ejecutar solo una vez al cargar el componente

  return (
    <CanchasContext.Provider value={{ canchas, loading, error }}>
      {children}
    </CanchasContext.Provider>
  );
};

