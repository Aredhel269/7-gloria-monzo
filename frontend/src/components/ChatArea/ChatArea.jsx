import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import TypingNotification from "./TypingNotification";

export const socket = io("http://localhost:3000");

const ChatArea = ({ roomName, userName, userId }) => {
  const [messages, setMessages] = useState([]);
  const [writingUser, setWritingUser] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { userName, roomName , userId});

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
      socket.emit("leaveRoom", { roomName, userName, userId });
      socket.off("chatMessage");
      socket.off("userWriting");
      socket.off("updateParticipants");
    };
  }, [roomName, userName, userId]);

  const handleSendMessage = (messageData) => {
    console.log("[ChatArea][handleSendMessage] Sending message:", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    socket.emit("chatMessage", messageData);
  };

  const handleSendTypingNotification = () => {
    socket.emit("userTyping", { roomName, userName });
  };

  return (
    <div className="chat-area">
      {writingUser && <TypingNotification userName={writingUser} />}
      <MessageList
        messages={messages.sort((a, b) => a.timestamp - b.timestamp)}
      />
      <MessageInput
        onSendMessage={handleSendMessage}
        onSendTypingNotification={handleSendTypingNotification}
        roomName={roomName}
        userName={userName}
        userId={userId}
      />
    </div>
  );
};

export default ChatArea;
