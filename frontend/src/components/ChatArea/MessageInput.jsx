import React, { useState } from "react";
import { socket } from "../ChatArea/ChatArea";

const MessageInput = ({ onSendMessage, roomName,  userName, userId }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    } else {
      sendTypingNotification();
    }
  };

  const sendMessage = () => {
      const messageData = {
        messageText: message,
        userId: userId,
        roomName: roomName      };

      // Enviar el missatge al ChatArea
      onSendMessage(messageData);

      // Enviar el missatge a la base de dades
      fetch("http://localhost:3000/api/messages/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Message saved successfully");
            setError(null);
            setMessage("");
          } else {
            setError("Error saving message. Please try again later.");
            console.error("Error saving message:", response.status);
          }
        })
        .catch((error) => {
          setError("Error saving message. Please try again later.");
          console.error("Error saving message:", error);
        });
    
  };

  const sendTypingNotification = () => {
    socket.emit("userTyping", { roomName, userName });
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MessageInput;