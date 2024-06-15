import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChatRoom({ socket, userName }) {
  const { id: roomName } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomName);

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("existingMessages", (existingMessages) => {
      setMessages(existingMessages);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("existingMessages");
    };
  }, [roomName, socket]);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chatMessage", {
        room: roomName,
        message,
        userName,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Room: {roomName}</h2>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.userName}:</b> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
