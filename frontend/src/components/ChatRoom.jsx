import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatArea from "./ChatArea";

function ChatRoom({ socket, userName }) {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Funció per rebre missatges existents
    const handleExistingMessages = (existingMessages) => {
      setMessages(existingMessages);
    };

    // Enviar esdeveniment per unir-se a la sala
    socket.emit("joinRoom", { roomName, userName });

    // Rebre llista de participants i actualitzar l'estat
    socket.on("updateParticipants", (roomParticipants) => {
      setParticipants(roomParticipants);
    });

    // Obtenir missatges existents del servidor per a la sala específica
    socket.emit("getExistingMessages", roomName);

    // Rebre missatges existents i actualitzar l'estat
    socket.on("existingMessages", handleExistingMessages);

    // Cleanup dels esdeveniments del socket quan el component es desmunta
    return () => {
      socket.emit("leaveRoom", { roomName, userName });
      socket.off("updateParticipants");
      socket.off("existingMessages", handleExistingMessages);
    };
  }, [roomName, socket, userName]);

  // Funció per enviar un nou missatge
  const sendMessage = (message) => {
    socket.emit("sendMessage", { roomName, userName, message });
  };

  // Funció per sortir de la sala
  const leaveRoom = () => {
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
        <ChatArea
          socket={socket}
          roomId={roomName}
          userName={userName}
          messages={messages}
          sendMessage={sendMessage}
        />
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
