import React from 'react';

function ChatArea({ messages }) {
  return (
    <div className="chat-area">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.user}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatArea;
