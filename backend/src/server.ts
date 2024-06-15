import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import userRoutes from './interface/http/routes/userRoutes';
import messageRoutes from './interface/http/routes/messageRoutes';
import roomRoutes from './interface/http/routes/roomRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: '*', // Allow CORS for all origins (consider security implications for production)
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvingut a la pàgina principal!");
});

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);

// Create the HTTP server using Express instance
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('join', ({ userName, roomName }, callback) => {
        // Join logic here
        socket.join(roomName);
        io.to(roomName).emit('message', { user: 'admin', text: `${userName} has joined!` });
        callback();
    });

    socket.on('chat', ({ messageText, userId, roomId }, callback) => {
        io.to(roomId).emit('message', { user: userId, text: messageText });
        callback();
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        io.emit("message", {
            user: "admin",
            text: `A user has disconnected`,
        });
    });
});

server.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

export default server;

