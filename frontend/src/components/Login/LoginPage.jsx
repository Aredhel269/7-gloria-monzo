// src/components/Login/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UsernameInputLogin from './UsernameInputLogin';
import PasswordInputLogin from './PasswordInputLogin';
import SubmitButtonLogin from './SubmitButtonLogin';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      });
      console.log('Resposta del backend:', response.data);
      navigate('/chat'); // Rutes relatives
    } catch (error) {
      console.error('Error al iniciar sessió:', error);
      setError('Hi ha hagut un error en iniciar sessió. Si us plau, intenta-ho de nou.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <UsernameInputLogin username={username} setUsername={setUsername} />
        <PasswordInputLogin password={password} setPassword={setPassword} />
        <SubmitButtonLogin />
      </form>
      <p>No tens un compte? <Link to="/register">Registra't</Link></p>
    </div>
  );
}

export default LoginPage;
