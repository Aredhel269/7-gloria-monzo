import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatRoom />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
