import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false); // Estat per emmagatzemar l'estat del registre
  const [error, setError] = useState(null); // Estat per emmagatzemar els errors
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviem les dades del formulari al backend
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        password
      });
      console.log('Resposta del backend:', response.data);
      // Configurem l'estat per mostrar el missatge de confirmació
      setSuccess(true);
      // Redirigim l'usuari a una altra pàgina després del registre
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      // Mostrem un missatge d'error a l'usuari
      setError('Hi ha hagut un error en registrar. Si us plau, intenta-ho de nou.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success && <p style={{ color: 'green' }}>El registre s'ha completat amb èxit! Ja pots iniciar sessió.</p>} {/* Missatge de confirmació */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Missatge d'error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'usuari:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label>Contrasenya:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Registrar-se</button>
      </form>
      <p>Ja tens un compte? <Link to="/login">Inicia sessió</Link></p>
    </div>
  );
}

export default Register;
