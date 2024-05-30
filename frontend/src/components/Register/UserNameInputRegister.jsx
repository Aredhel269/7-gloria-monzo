import React from 'react';
import PropTypes from 'prop-types';

function UsernameInputRegister({ username, setUsername }) {
  return (
    <div>
      <label>Nom d'usuari:</label>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
    </div>
  );
}

UsernameInputRegister.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default UsernameInputRegister;
