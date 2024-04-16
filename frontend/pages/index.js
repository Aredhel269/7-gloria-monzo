import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomList from '../components/RoomList'; // Importem el nostre component RoomList

const ChatApp = () => {
  // Estats per emmagatzemar la llista de sales i els missatges
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  // Connexió al servidor de xat en carregar la pàgina
  useEffect(() => {
    const socket = io('http://localhost:4000'); // Canvia la URL al servidor de xat
    // Lògica per a rebre i gestionar els missatges del servidor

    // Retorna una funció per a fer tasques de neteja en desconnectar el component
    return () => {
      socket.disconnect(); // Desconnecta del servidor de xat
    };
  }, []);

  // Funció per enviar missatges
  const sendMessage = (message) => {
    // Lògica per enviar el missatge al servidor
  };

  return (
    <div>
      <h1>Xat en temps real</h1>
      {/* Mostrem el component RoomList */}
      <RoomList />
      {/* Component per a la llista de missatges */}
      {/* Component per a la caixa d'entrada de missatges */}
    </div>
  );
};

export default ChatApp;
