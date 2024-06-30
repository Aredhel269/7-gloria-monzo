import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import userRoutes from './interface/http/routes/userRoutes';
import messageRoutes from './interface/http/routes/messageRoutes';
import roomRoutes from './interface/http/routes/roomRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: '*', // Permet CORS per a tots els orígens (considera les implicacions de seguretat per a producció)
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvingut a la pàgina principal!");
});

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);

// Creem el servidor HTTP utilitzant l'instància d'Express
const server = http.createServer(app);

// Configuració de Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Interfície per a les extensions dels objectes Socket
interface CustomSocket extends Socket {
    userName?: string; // Afegim una propietat opcional per userName
}

io.on('connection', (socket: CustomSocket) => {
    console.log('Nou client connectat[server io.on1]');

    socket.on('joinRoom', ({ userName, roomName }) => {
        socket.userName = userName; // Assignem el nom d'usuari al socket
        socket.join(roomName);
        io.to(roomName).emit('chatMessage[server io.on2]', { userName: 'admin', message: `${userName} s'ha unit![server]` });

        // Emitim els missatges existents de la sala (simulat)
        /* existingMessages = [
            { userName: 'usuari1', message: 'Hola a tots![server]' },
            { userName: 'usuari2', message: 'Benvingut!' }
        ];
        socket.emit('existingMessages', existingMessages);*/

        // Actualitzem la llista de participants
        const roomParticipants = Array.from(io.sockets.adapter.rooms.get(roomName) ?? []).map(socketId => {
            const participantSocket = io.sockets.sockets.get(socketId) as CustomSocket;
            return participantSocket?.userName ?? '';
        });
        io.to(roomName).emit('updateParticipants[server3]', roomParticipants);
    });

    socket.on('chatMessage', ({ room, message, userName }) => {
        io.to(room).emit('chatMessage[server4]', { userName, message });
    });

    socket.on('userTyping', ({ roomName, userName }) => {
        socket.to(roomName).emit('userWriting[server5]', { userName });
    });

    socket.on('leaveRoom', ({ roomName, userName }) => {
        socket.leave(roomName);
        io.to(roomName).emit('chatMessage[server6]', { userName: 'admin', message: `${userName} ha deixat la sala.` });

        // Actualitzem la llista de participants
        const roomParticipants = Array.from(io.sockets.adapter.rooms.get(roomName) ?? []).map(socketId => {
            const participantSocket = io.sockets.sockets.get(socketId) as CustomSocket;
            return participantSocket?.userName ?? '';
        });
        io.to(roomName).emit('updateParticipants[server7]', roomParticipants);
    });

    socket.on("disconnect", () => {
        console.log("Un usuari s'ha desconnectat[server8]");
        io.emit("chatMessage", {
            userName: "admin",
            message: `Un usuari s'ha desconnectat[server9]`,
        });
    });
});

server.listen(PORT, () => {
    console.log(`Servidor Express escoltant al port ${PORT}`);
});

export default server;



