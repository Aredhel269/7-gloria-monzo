import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import './Join.css';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', { userName, password });
      navigate('/');
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Register</h1>
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
        <div className="mt-20">
          <Link to="/">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
}









