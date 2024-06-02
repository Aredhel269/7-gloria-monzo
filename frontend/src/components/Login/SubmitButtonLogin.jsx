import React from 'react';

function SubmitButtonLogin() {
  return <button type="submit">Iniciar sessió</button>;
}

<form onSubmit={handleSubmit}>
  {/* Other form elements */}
  <SubmitButtonLogin />
</form>

export default SubmitButtonLogin;
