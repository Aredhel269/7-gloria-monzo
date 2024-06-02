import React from "react";

const ParticipantsList = () => {
  // Aquí hauríem de fer una petició al servidor per obtenir la llista de participants
  const participants = ["User 1", "User 2", "User 3"];

  return (
    <div className="participants-list">
      <h4>Participants:</h4>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
