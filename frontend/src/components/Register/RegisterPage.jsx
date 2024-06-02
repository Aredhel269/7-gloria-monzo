import React, { useState } from "react";
import { Link } from "react-router-dom";
import UsernameInputRegister from "./UsernameInputRegister";
import PasswordInputRegister from "./PasswordInputRegister";
import SubmitButtonRegister from "./SubmitButtonRegister";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí hauríem de fer la petició al servidor per registrar l'usuari
    // Si el registre és correcte, redirigir a la pàgina de login
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <UsernameInputRegister username={username} setUsername={setUsername} />
        <PasswordInputRegister password={password} setPassword={setPassword} />
        <SubmitButtonRegister />
      </form>
      <p>Ja tens un compte? <Link to="/login">Inicia sessió</Link></p>
    </div>
  );
};

export default RegisterPage;
