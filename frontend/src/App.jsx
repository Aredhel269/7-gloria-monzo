import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/login" element={<Join />} />

        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;









