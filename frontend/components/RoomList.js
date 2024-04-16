import React, { useState, useEffect } from 'react';

const RoomList = () => {
  // Estat per emmagatzemar la llista de sales
  const [rooms, setRooms] = useState([]);

  // Funció per obtenir la llista de sales des del backend
  const fetchRooms = async () => {
    try {
      // Fer la crida al backend per obtenir la llista de sales
      // Guardar la resposta en l'estat 'rooms'
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Maneig d'errors
    }
  };

  // useEffect per cridar fetchRooms quan el component es carrega
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      {/* Mostrar la llista de sales aquí */}
    </div>
  );
};

export default RoomList;
