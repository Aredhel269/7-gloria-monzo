import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar les dades al backend per a la registre
    fetch(`${process.env.REACT_APP_BACKURL}/users/register`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: userName, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Redirigir a la pàgina de login
          navigate('/users/login');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>
        Already have an account? <Link to="/users/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
