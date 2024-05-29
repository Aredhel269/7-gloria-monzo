import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h2>Login</h2>
      {/* Formulari de login */}
      <p>
        No tens un compte? <Link to="/register">Registra't</Link>
      </p>
    </div>
  );
}

export default Login;
