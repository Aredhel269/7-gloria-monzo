import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message) => (
      <div key={message.id || message.timestamp}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
