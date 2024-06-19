import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomList({ handleCreateRoom, userName }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega les sales des del backend quan el component es monta
    fetch("http://localhost:3000/api/rooms/allrooms")
      .then((response) => response.json())
      .then((data) => {
        const roomNames = data.map((room) => room._roomName);
        setRooms(roomNames);
      })
      .catch((error) => {
        console.error("Hi ha hagut un error en carregar les sales:", error);
      });
  }, []);

  const onRoomSelect = (roomName) => {
    navigate(`/chat/${roomName}`);
  };

  return (
    <div className="chat-container">
      <button
        onClick={() => handleCreateRoom(prompt("Enter the room name:") || "")}
      >
        Create Room
      </button>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((roomName, index) => (
          <li
            key={index}
            onClick={() => onRoomSelect(roomName)}
            style={{ cursor: "pointer" }}
          >
            {roomName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
