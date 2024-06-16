import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";

const ChatRoom = ({ socket, userName }) => {
  const { roomId: roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", roomName);

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("existingMessages", (existingMessages) => {
      setMessages(existingMessages);
    });

    socket.on("participants", (participantsList) => {
      setParticipants(participantsList);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("existingMessages");
      socket.off("participants");
    };
  }, [roomName, socket]);

  const sendMessage = (message) => {
    socket.emit("chatMessage", {
      room: roomName,
      message,
      userName,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const logout = () => {
    socket.emit("leaveRoom", roomName);
    // lògica de desconnexió
  };

  return (
    <div className="chat-room">
      <Header roomName={roomName} toggleSidebar={toggleSidebar} logout={logout} />
      <div className="main-content">
        <ChatArea messages={messages} sendMessage={sendMessage} userName={userName} />
        {isSidebarVisible && <Sidebar participants={participants} />}
      </div>
    </div>
  );
};

export default ChatRoom;
