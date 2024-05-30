// src/components/Register/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNameInputRegister from './UserNameInputRegister';
import PasswordInputRegister from './PasswordInputRegister';
import SubmitButtonRegister from './SubmitButtonRegister';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        password
      });
      console.log('Resposta del backend:', response.data);
      setSuccess(true);
      navigate('/login'); // Rutes relatives
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Hi ha hagut un error en registrar. Si us plau, intenta-ho de nou.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success && <p style={{ color: 'green' }}>El registre s'ha completat amb èxit! Ja pots iniciar sessió.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <UserNameInputRegister username={username} setUsername={setUsername} />
        <PasswordInputRegister password={password} setPassword={setPassword} />
        <SubmitButtonRegister />
      </form>
      <p>Ja tens un compte? <Link to="/login">Inicia sessió</Link></p>
    </div>
  );
}

export default RegisterPage;
