import React from "react";

const ChatArea = ({ messages }) => {
  return (
    <div className="chat-area">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <span className="username">{message.user}: </span>
          <span className="text">{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatArea;

