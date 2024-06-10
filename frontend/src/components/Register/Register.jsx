import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import socket from 'socket.io-client'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('register', { username, password }, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        history.push('/chat');
      }
    });
  };

  return (
    <div className="registerOuterContainer">
      <div className="registerInnerContainer">
        <h1 className="heading">Register</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className="registerInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className="registerInput mt-20"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button mt-20" type="submit">
            Register
          </button>
        </form>
        <p className="mt-20">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
