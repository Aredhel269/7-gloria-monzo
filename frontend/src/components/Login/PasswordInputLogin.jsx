import React from "react";

const PasswordInputLogin = ({ password, setPassword }) => {
  return (
    <div className="
form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
  );
};

export default PasswordInputLogin;
