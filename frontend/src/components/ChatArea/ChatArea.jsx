import React, { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import TypingNotification from "./TypingNotification";
import io from 'socket.io-client'

export const socket = io("http://localhost:3000");

const ChatArea = ({ roomName, userName }) => {
  const [messages, setMessages] = useState([]);
  const [writingUser, setWritingUser] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { userName, roomName });

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("userWriting", (data) => {
      if (data.userName !== userName) {
        setWritingUser(data.userName);
        setTimeout(() => setWritingUser(""), 3000);
      }
    });

    socket.on("updateParticipants", (roomParticipants) => {
      // Actualitza la llista de participants
    });

    return () => {
      socket.emit("leaveRoom", { roomName, userName });
      socket.off("chatMessage");
      socket.off("userWriting");
      socket.off("updateParticipants");
    };
  }, [roomName, userName]);

  const handleSendMessage = (message) => {
    const messageData = {
      room: roomName,
      message,
      userName,
    };
    socket.emit("chatMessage", messageData);
  };

  const handleSendTypingNotification = () => {
    socket.emit("userTyping", { roomName, userName });
  };

  return (
    <div className="chat-area">
      {writingUser && <TypingNotification userName={writingUser} />}
      <MessageList messages={messages} />
      <MessageInput
        onSendMessage={handleSendMessage}
        onSendTypingNotification={handleSendTypingNotification}
        roomName={roomName}
        userName={userName}
      />
    </div>
  );
};

export default ChatArea;
