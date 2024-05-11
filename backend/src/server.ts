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
  console.log('Un client s\'ha connectat');

  // Gestió d'esdeveniments de Socket.IO
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} s'ha unit a la sala ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`Client ${socket.id} ha abandonat la sala ${roomId}`);
  });

  socket.on('new-message', (message) => {
    const { roomId, userId, text } = message;
    io.to(roomId).emit('message', { userId, text });
  });

  socket.on('disconnect', () => {
    console.log('Un client s\'ha desconnectat');
  });
});

httpServer.listen(3001, () => {
  console.log('Servidor Socket.IO escoltant a http://localhost:3001');
});
