import React from "react";

const Header = ({ roomName, toggleSidebar, logout }) => {
  return (
    <div className="header">
      <h1>{roomName}</h1>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
