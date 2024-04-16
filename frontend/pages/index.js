import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomList from '../components/RoomList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const ChatApp = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  return (
    <div>
      <h1>Xat en temps real</h1>
      <RoomList rooms={rooms} />
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatApp;
