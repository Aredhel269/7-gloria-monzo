import React from 'react';

function RoomHeader() {
  return (
    <div className="room-header">
      <h2>Nom de la Sala</h2>
      <nav>
        {/* Enllaços a altres sales */}
        <a href="/room1">Sala 1</a>
        <a href="/room2">Sala 2</a>
      </nav>
    </div>
  );
}

export default RoomHeader;


