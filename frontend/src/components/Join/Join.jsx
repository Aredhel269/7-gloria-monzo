import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Join.css';

export default function Join() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); // Millora: estat per a l'error

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); // Reset error en cada intent de login

    try {
      const response = await axios.post('http://localhost:3000/login', { userName, password });
      const { user } = response.data;
      window.location.href = `/chat?name=${user.userName}&room=general`;
    } catch (error) {
      setLoginError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleLogin}>
          {loginError && <p className="error">{loginError}</p>}
          <div>
            <input
              placeholder="Username"
              className="joinInput"
              type="text"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              className="joinInput mt-20"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="button mt-20" type="submit" onClick={handleLogin}>Login</button>
        </form>
        <div className="mt-20">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
}
