import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MessageInput;
