import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirigeix a la pàgina principal per a rutes no definides */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
