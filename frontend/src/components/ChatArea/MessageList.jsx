//import React from "react";
//import MessageItem from "../MessagesComponent/MessageItem";

const MessageList = ({ messages, userId }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.userId === userId ? "own-message" : ""}`}
        >
          <span className="message-username">{message.userName}:</span>
          <span className="message-text">{message.messageText}</span>
        </div>
      ))}
    </div>
  );
};
export default MessageList;
