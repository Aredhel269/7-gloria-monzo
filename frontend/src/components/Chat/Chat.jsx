import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = () => {
  const location = useLocation(); // Hook de react-router-dom
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect per a la connexió inicial del socket i unir-se a una habitació
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io('http://localhost:3000');

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location]);

  // useEffect per rebre missatges i dades de l'habitació
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  // Funció per enviar un missatge
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  // Netejar el socket en desmuntar el component
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  // Maneig d'errors de connexió del socket
  useEffect(() => {
    socket.on('connect_error', (err) => {
      console.error('socket connection error:', err);
      // Mostrar un missatge d'error a l'usuari
    });
  }, []);

  // Renderització del component
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
