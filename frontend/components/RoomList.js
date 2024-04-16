import React from 'react';

const RoomList = ({ rooms }) => {
  return (
    <div>
      <h2>Llista de Sales</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
