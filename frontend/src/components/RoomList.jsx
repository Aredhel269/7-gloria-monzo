import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function RoomList({ handleCreateRoom }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { userName, userId } = useContext(UserContext);

  useEffect(() => {
    console.log("[RoomList][useEffect] Fetching rooms from the backend");

    // Carrega les sales des del backend quan el component es munta
    fetch("http://localhost:3000/api/rooms/allrooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("[RoomList][useEffect] Received rooms data:", data);
        const roomNames = data.map((room) => room._roomName);
        setRooms(roomNames);
      })
      .catch((error) => {
        console.error("[RoomList][useEffect] Error loading rooms:", error);
        // Mostra un missatge d'error a l'usuari
        alert("Error loading rooms. Please try again later.");
      });
  }, []);

  const onRoomSelect = (roomName) => {
    console.log("[RoomList][onRoomSelect] Navigating to chat room:", roomName);
    navigate(`/chat/${roomName}`);
  };

  const onCreateRoom = () => {
    const newRoomName = prompt("Enter the room name:");
    if (newRoomName) {
      console.log("[RoomList][onCreateRoom] Creating new room:", newRoomName);
      handleCreateRoom(newRoomName);
    }
  };

  return (
    <div className="room-list-container">
      <button onClick={onCreateRoom}>Create Room</button>
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
