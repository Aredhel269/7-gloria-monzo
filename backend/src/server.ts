import fastify from 'fastify';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import http from 'http';
import registerRoutes from './interface/http/routes/messageRoutes'
import fastifyCors from '@fastify/cors';

dotenv.config();

const app = fastify();
const PORT = process.env.PORT || 3000;

// Middleware de JSON i CORS
app.register(fastifyCors, { 
  origin: '*' 
});

app.get("/", (req, reply) => {
  reply.send("Benvingut a la pàgina principal!");
});

app.get('/products/:id', (req, reply) => {
  reply.send({ msg: 'This is CORS-enabled for all origins!' });
});

// Registre de rutes
registerRoutes(app);

const server = http.createServer(app.server);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (roomName) => {
    console.log("A user joined the room " + roomName);
    socket.join(roomName);
    socket.emit("message", {
      user: "admin",
      text: `Welcome to the room ${roomName}`,
    });
    io.to(roomName).emit("message", {
      user: "admin",
      text: `A new user has joined the room ${roomName}`,
    });
  });

  socket.on("chat", (data) => {
    console.log("A user sent a message");
    io.to(data.room).emit("message", {
      user: data.user,
      text: data.text,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    io.emit("message", {
      user: "admin",
      text: `A user has disconnected`,
    });
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});



