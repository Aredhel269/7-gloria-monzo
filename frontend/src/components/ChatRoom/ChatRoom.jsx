import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatArea from "./ChatArea";
import MessageInput from "./MessageInput";
import ParticipantsList from "./ParticipantsList";
import RoomHeader from "./RoomHeader";
import "./ChatRoom.css";

const socket = io("http://localhost:3000");

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const roomName = "General"; // Eliminat setRoomName

  useEffect(() => {
    socket.emit("join", roomName);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName]);

  const sendMessage = (message) => {
    const user = "Current User"; // Aquest seria el nom de l'usuari actual
    socket.emit("chat", { room: roomName, user, text: message });
  };

  return (
    <div className="chatroom-container">
      <RoomHeader roomName={roomName} />
      <div className="chatroom-body">
        <ParticipantsList />
        <div className="chat-section">
          <ChatArea messages={messages} />
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
