import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
);

export default App;
