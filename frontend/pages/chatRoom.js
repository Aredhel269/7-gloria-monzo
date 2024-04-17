import React from 'react';
import RoomList from '../components/RoomList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const ChatRoom = () => {
  return (
    <div>
      <h1>Chat Room</h1>
      <RoomList />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
