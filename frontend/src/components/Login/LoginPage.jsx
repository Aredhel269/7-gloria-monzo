import React, { useState } from "react";
import { Link } from "react-router-dom";
import UsernameInputLogin from "./UsernameInputLogin";
import PasswordInputLogin from "./PasswordInputLogin";
import SubmitButtonLogin from "./SubmitButtonLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí hauríem de fer la petició al servidor per iniciar sessió
    // Si l'inici de sessió és correcte, redirigir a la pàgina del xat
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <UsernameInputLogin username={username} setUsername={setUsername} />
        <PasswordInputLogin password={password} setPassword={setPassword} />
        <SubmitButtonLogin />
      </form>
      <p>No tens un compte? <Link to="/register">Registra't</Link></p>
    </div>
  );
};

export default LoginPage;
