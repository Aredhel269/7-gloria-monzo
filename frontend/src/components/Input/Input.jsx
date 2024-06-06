import React, { useState } from 'react'; // Import React i useState

import './Input.css'; // Importar CSS (si cal)

const Input = ({ setMessage, sendMessage, message }) => {
  // Utilitzar useState per gestionar l'estat del missatge
  const [messageState, setMessageState] = useState(message || '');

  // Funció per actualitzar l'estat del missatge
  const handleChange = (event) => {
    setMessageState(event.target.value);
  };

  // Funció per enviar el missatge
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar la recàrrega de la pàgina
    sendMessage(messageState); // Enviar el missatge actual
    setMessageState(''); // Restablir el camp de text
  };

  // Funció per enviar el missatge amb la tecla Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={messageState}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button className="sendButton" type="submit">Send</button>
    </form>
  );
};

export default Input;
