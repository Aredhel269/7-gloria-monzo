import React, { useState, useEffect } from "react";

const ChatArea = ({ socket, roomId, userName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [writingUser, setWritingUser] = useState("");

  useEffect(() => {
    // Rebre missatges nous i actualitzar l'estat dels missatges
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Rebre missatges existents i actualitzar l'estat dels missatges
    socket.on("existingMessages", (existingMessages) => {
      setMessages(existingMessages);
    });

    // Rebre notificacions d'escriptura i actualitzar l'estat
    socket.on("userWriting", (data) => {
      if (data.userName !== userName) {
        setWritingUser(data.userName);
        setTimeout(() => setWritingUser(""), 3000); // Notificació durant 3 segons
      }
    });

    // Cleanup dels esdeveniments del socket quan el component es desmunta
    return () => {
      socket.off("chatMessage");
      socket.off("existingMessages");
      socket.off("userWriting");
    };
  }, [socket, userName]);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chatMessage", {
        room: roomId,
        message,
        userName,
      });
      setMessage("");
    }
  };

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    } else {
      socket.emit("userTyping", { roomName: roomId, userName });
    }
  };

  return (
    <div className="chat-area">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.userName}:</strong> {msg.message}
          </div>
        ))}
      </div>
      {writingUser && (
        <div className="writing-notification">{`${writingUser} is writing...`}</div>
      )}
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
    </div>
  );
};

export default ChatArea;
