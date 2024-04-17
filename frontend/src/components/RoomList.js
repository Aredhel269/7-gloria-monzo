import React, { useState, useEffect } from 'react';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      // Simulem les sales per ara
      const mockRooms = ['Sala 1', 'Sala 2', 'Sala 3'];
      setRooms(mockRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
