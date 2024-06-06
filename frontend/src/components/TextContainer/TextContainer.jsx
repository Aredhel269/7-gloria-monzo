import React from 'react';
import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="Chat emoji"></span></h1>
      <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="Heart emoji">❤️</span></h2>
      <h2>Try it out now! <span role="img" aria-label="Left arrow emoji">⬅️</span></h2>
    </div>
    {users && users.length > 0 && ( // Comprova si hi ha usuaris i evita missatges buits
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
              </div>
            ))}
          </h2>
        </div>
      </div>
    )}
  </div>
);

export default TextContainer;
