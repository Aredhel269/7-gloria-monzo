import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChatRoom({ socket, userName }) {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

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
  }, [roomId, socket]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", {
        room: roomId,
        message,
        userName,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Room: {roomId}</h2>
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
