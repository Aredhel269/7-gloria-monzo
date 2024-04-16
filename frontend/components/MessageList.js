import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      <h2>Missatges</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.owner}:</strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
