import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import router from "./interface/http/routes/router";
import passport from "passport";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Benvingut a la pàgina principal!");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000, // Ajusta el temps de ping si és necessari
  pingInterval: 25000
});

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
      text: "A user has disconnected",
    });
  });
});

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
