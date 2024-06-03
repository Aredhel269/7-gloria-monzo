import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketClient from '../../services/socketClient';
//import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password
      });
      console.log('Resposta del backend:', response.data);
      socketClient.emit('user-connected', username); // Notifica que l'usuari s'ha connectat
      navigate('/chat');
    } catch (error) {
      console.error('Error al iniciar sessió:', error);
      setError('Hi ha hagut un error en iniciar sessió. Si us plau, intenta-ho de nou.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;