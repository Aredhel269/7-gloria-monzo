import React, { useEffect, useState } from 'react';
import socketClient from '../../services/socketClient';
import './ChatRoom.css';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  //const [message, setMessage] = useState('');
  const [input, setInput] = useState('')

  useEffect(() => {

    socketClient.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketClient.on('user-connected', (user) => {
      setMessages((prevMessages) => [...prevMessages, { user: 'System', text: `${user} has joined the room` }]);
    });

    socketClient.on('user-disconnected', (user) => {
      setMessages((prevMessages) => [...prevMessages, { user: 'System', text: `${user} has left the room` }]);
    });

    return () => {
      socketClient.off('message');
      socketClient.off('user-connected');
      socketClient.off('user-disconnected');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()){
    socketClient.emit('message', input );
    setInput('');
  }};

  return (
    
      <div className="chat-room">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
  );
}

export default ChatRoom;