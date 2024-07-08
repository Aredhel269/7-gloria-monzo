import  { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatArea from "./ChatArea/ChatArea";
import MessagesComponent from "./MessagesComponent/MessagesComponent";
import { UserContext } from "../Context/UserContext"

function ChatRoom({ socket }) {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const { userName, userId } = useContext(UserContext);

  useEffect(() => {
    console.log("[ChatRoom][useEffect] Joining room:", { roomName, userName, userId });

    // Enviar esdeveniment per unir-se a la sala
    socket.emit("joinRoom", { userName, roomName, userId });

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
  }, [roomName, socket, userName, userId]);

  // Funció per sortir de la sala
  const leaveRoom = () => {
    console.log("[ChatRoom][leaveRoom] User is leaving the room:", { roomName, userName });
    socket.emit("leaveRoom", { roomName, userName });
    navigate("/rooms");
  };

  return (
    <div className="chatroom-container">
      <ChatHeader roomName={roomName} leaveRoom={leaveRoom} />
      <div className="main-chat-area">
        <MessagesComponent roomName={roomName} /> {/* Mostra els missatges existents */}
        <ChatArea socket={socket} roomName={roomName} userName={userName} userId={userId} />
      </div>
      <ChatSidebar participants={participants} />
    </div>
  );
}

export default ChatRoom;

function ChatHeader({ roomName, leaveRoom }) {
  return (
    <div className="header">
      <h2>Room: {roomName}</h2>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
}

function ChatSidebar({ participants }) {
  return (
    <div className="sidebar">
      <h3>Participants</h3>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
}
