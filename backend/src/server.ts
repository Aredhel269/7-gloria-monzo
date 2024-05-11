import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Origen permès del client
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Gestió d'esdeveniments de Socket.IO
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} in the room ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`Client ${socket.id} leave room ${roomId}`);
  });

  socket.on('new-message', (message) => {
    const { roomId, userId, text } = message;
    io.to(roomId).emit('message', { userId, text });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.IO server running at http://localhost:3001');
});
