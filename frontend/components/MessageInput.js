import React, { useState } from 'react';
import PropTypes from 'prop-types'

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Escriu el teu missatge..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

MessageInput.prototype = {
  sendMessage: PropTypes.func.isRequired,
}

export default MessageInput;
