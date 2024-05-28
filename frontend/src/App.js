import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
