import React from 'react';
import RoomList from '../src/components/RoomList';
import MessageList from '../src/components/MessageList';
import MessageInput from '../src/components/MessageInput';

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
