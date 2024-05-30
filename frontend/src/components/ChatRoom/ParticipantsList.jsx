import React from 'react';

function ParticipantsList() {
  const participants = ['Usuari 1', 'Usuari 2', 'Usuari 3']; // Exemple de llista de participants

  return (
    <div className="participants-list">
      <h3>Participants</h3>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantsList;
