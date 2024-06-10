import React, { useState, useEffect } from 'react';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import socket from 'socket.io-client';

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryString = require("query-string");
    const { name, room } = queryString.parse(window.location.search);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    setName(name);
    setRoom(room);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
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
        />
      </div>
    </div>
  );
};

export default Chat;
