import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatArea from "./ChatArea/ChatArea";
import MessagesComponent from "./MessagesComponent/MessagesComponent";

function ChatRoom({ socket, userName }) {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    console.log("[ChatRoom][useEffect] Joining room:", { roomName, userName });

    // Enviar esdeveniment per unir-se a la sala
    socket.emit("joinRoom", { userName, roomName });

    // Rebre llista de participants i actualitzar l'estat
    socket.on("updateParticipants", (roomParticipants) => {
      console.log("[ChatRoom][useEffect] Received updateParticipants event:", roomParticipants);
      setParticipants(roomParticipants);
    });

    // Cleanup dels esdeveniments del socket quan el component es desmunta
    return () => {
      console.log("[ChatRoom][useEffect] Leaving room:", { roomName, userName });
      socket.emit("leaveRoom", { roomName, userName });
      socket.off("updateParticipants");
    };
  }, [roomName, socket, userName]);

  // Funció per sortir de la sala
  const leaveRoom = () => {
    console.log("[ChatRoom][leaveRoom] User is leaving the room:", { roomName, userName });
    socket.emit("leaveRoom", { roomName, userName });
    navigate("/rooms");
  };

  return (
    <div className="chatroom-container">
      <div className="header">
        <h2>Room: {roomName}</h2>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="main-chat-area">
        <MessagesComponent roomName={roomName} /> {/* Mostra els missatges existents */}
        <ChatArea socket={socket} roomName={roomName} userName={userName} />
      </div>
      <div className="sidebar">
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatRoom;
