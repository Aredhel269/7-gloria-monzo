import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = (roomId) => {
    history.push(`/chat/${roomId}`);
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>
            {room.roomName} <button onClick={() => joinRoom(room.roomId)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
