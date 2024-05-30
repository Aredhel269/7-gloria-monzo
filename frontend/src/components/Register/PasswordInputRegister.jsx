import React from 'react';
import PropTypes from 'prop-types';

function PasswordInputRegister({ password, setPassword }) {
  return (
    <div>
      <label>Contrasenya:</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
    </div>
  );
}

PasswordInputRegister.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default PasswordInputRegister;
