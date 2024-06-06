import { Server } from 'socket.io';
import socketServer from './fastifyServer';


const io = new Server(socketServer);

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

});


export default socketServer;