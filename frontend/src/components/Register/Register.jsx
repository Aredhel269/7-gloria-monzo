import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Register.css';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/register', { userName, password });
        if (response.data.success) {
          setRegistrationSuccess(true);
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        alert("Registration failed. Please try again.");
      }
    }
    

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Register</h1>
        {registrationSuccess ? (
          <div>
            <p>Registration successful! You can now log in with your credentials.</p>
            <Link to="/login">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
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

            <button className="button mt-20" type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}
