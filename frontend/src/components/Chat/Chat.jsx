import React, { useState, useEffect } from 'react';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io('http://localhost:3000');

    setName(name);
    setRoom(room);

    socket.emit('join', { userName: name, roomName: room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect()      
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off('message');
      socket.off('roomData');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('chat', { messageText: message, userId: name, roomId: room }, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <TextContainer
          users={users}
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
