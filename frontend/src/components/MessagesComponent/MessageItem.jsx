//import React from "react";

const MessageItem = ({ message }) => {
  return (
    <li className="message-item">
      <div className="message-text">{message.text}</div>
      <div className="message-info">
        <span className="message-user">{message.userName}</span>
        <span className="message-time">{message.timestamp}</span>
      </div>
    </li>
  );
};

export default MessageItem;



