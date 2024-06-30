import React, { useState } from "react";
import { socket } from "../ChatArea/ChatArea";

const MessageInput = ({ onSendMessage, roomName, userName }) => {
  const [message, setMessage] = useState("");

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    } else {
      sendTypingNotification();
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
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
    </div>
  );
};

export default MessageInput;
