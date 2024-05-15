import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export const joinRoom = (roomId: string) => {
  socket.emit('join-room', roomId);
};

export const leaveRoom = (roomId: string) => {
  socket.emit('leave-room', roomId);
};

export const sendMessage = (roomId: string, userId: number, messageText: string) => {
  socket.emit('new-message', { roomId, userId, messageText });
};

export const onMessage = (callback: (message: { userId: number; messageText: string }) => void) => {
  socket.on('message', callback);
};
