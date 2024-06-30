import React from "react";

const Sidebar = ({ participants }) => {
  return (
    <div className="sidebar">
      <div className="participants">
        <h2>Participants</h2>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
      <div className="config">
        <h2>Configuration</h2>
        {/* Configuració addicional aquí */}
      </div>
    </div>
  );
};

export default Sidebar;
