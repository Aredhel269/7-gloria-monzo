import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
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

server.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

export default server; // Export the HTTP server for use by Socket.IO
