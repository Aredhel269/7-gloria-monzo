import React from "react";

const UsernameInputRegister = ({ username, setUsername }) => {
  return (
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
  );
};

export default UsernameInputRegister;
