import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import helmet from 'helmet'
import { json, urlencoded } from 'body-parser';
import { chatRouter } from '../routes/chatRoutes'; // CORREGIR!!!!!!!!!
import * as middlewares from '../middlewares/middleware';

dotenv.config();

const port = process.env.PORT ?? 4001;

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*'
  }
});

let arrUsers: string[] = [];
const defaultSession = 'defaultSession';

io.on('connection', async (socket) => {
  socket.broadcast.emit('welcome', 'A user has connected!!!');
  socket.join(defaultSession);

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });

  socket.on('addUser', (data) => {
    arrUsers.push(data);
    io.to(defaultSession).emit('newUser', arrUsers);
  });

  socket.on('deletedUser', (data) => {
    console.log(data);
    arrUsers = arrUsers.filter((value) => value !== data);
    socket.to(defaultSession).emit('currentUsers', arrUsers);
  });

  socket.on('chat message', async (msg, user) => {
    io.to(defaultSession).emit('chat message', msg, user);
  });
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use('/', chatRouter);
app.use('/chat', chatRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
