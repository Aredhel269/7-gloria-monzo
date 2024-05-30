import React from 'react';
import PropTypes from 'prop-types';

function UsernameInputLogin({ username, setUsername }) {
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

UsernameInputLogin.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default UsernameInputLogin;
