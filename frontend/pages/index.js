import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomList from '../components/RoomList'; // Importem el nostre component RoomList
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const ChatApp = () => {
  // Estats per emmagatzemar la llista de sales i els missatges
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null)
  const socket = io('http://localhost:4000')

  // Connexió al servidor de xat en carregar la pàgina
  useEffect(() => {
    // Lògica per a rebre i gestionar els missatges del servidor
    socket.on('update-rooms', (updateRooms)=> {
      setRooms(updateRooms);
    })
    socket.on('receive-message', (message)=> {
      setMessages((prevMessages)=> [...prevMessages, message]);
    })
    // Retorna una funció per a fer tasques de neteja en desconnectar el component
    return () => {
      socket.disconnect(); // Desconnecta del servidor de xat
    };
  }, []);

  // Funció per enviar missatges
  const sendMessage = (message) => {
    // Lògica per enviar el missatge al servidor
    socket.emit('send-message', message)
  };

  const joinRoom = (room)=> {
    setCurrentRoom(room)
    socket.emit('join-room', room)
  };

  return (
    <div>
      <h1>Chat en temps real</h1>
      <ChatList rooms={rooms} joinRoom={joinRoom} />
      {currentRoom && <MessageList messages={messages} />}
      {currentRoom && <MessageInput sendMessage={sendMessage} />}
    </div>
  );
};

export default ChatApp;
