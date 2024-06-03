import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import ChatRoom from './components/ChatRoom/ChatRoom';
// QUE PASSSA AMB EL USE NAVIGATE?? 
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatRoom />} />
          {/* </Routes><Route path="/* element={<NAVIGATE />} /> */}

          {/* Afegeix altres rutes si cal */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
