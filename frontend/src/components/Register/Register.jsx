import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Register.css';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null); // Canviem el nom per error clarity
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', { userName, password });
      if (response.data.success) {
        setRegistrationSuccess(true);
        setRegistrationError(null); // Reseteja l'error en cas d'èxit
      } else {
        setRegistrationError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error); // Millor gestió d'errors, registrant a la consola
      setRegistrationError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Register</h1>
        <form onSubmit={handleRegister}>

          {registrationSuccess ? (
            <div>
              <p>Registration successful! You can now log in with your credentials.</p>
              <Link to="/login">Go to Login</Link>
            </div>
          ) : (
            <> {/* Fragment per evitar elements extra */}
              {registrationError && <p className="error">{registrationError}</p>}
              <div>
                <input
                  placeholder="Username"
                  className="joinInput"
                  type="text"
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  className="joinInput mt-20"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button className="button mt-20" type="submit" onClick={handleRegister}>Register</button>
            </>
          )}
          <div className="mt-20">
            <Link to="/">Already have an account? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
