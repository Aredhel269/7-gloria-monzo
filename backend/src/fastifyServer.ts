import fastify from 'fastify';
import http from 'http';
import messageRoutes from './interface/http/routes/messageRoutes';
import roomRoutes from './interface/http/routes/roomRoutes';
import userRoutes from './interface/http/routes/userRoutes';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = fastify();

app.register(fastifyCors, {
  origin: '*', // Allow CORS for all origins (consider security implications for production)
});

// Define Fastify routes (replace with your actual routes)
app.get("/", (req, reply) => {
  reply.send("Benvingut a la pàgina principal!");
});

app.get('/products/:id', (req, reply) => {
  reply.send({ msg: 'This is CORS-enabled for all origins!' });
});

messageRoutes(app);
roomRoutes(app)
userRoutes(app)

// Create the HTTP server using Fastify instance (corrected)
const fastifyServer = http.createServer(app.server);

fastifyServer.listen(PORT, () => {
  console.log(`Fastify server listening on port ${PORT}`)
});

export default fastifyServer; // Export the HTTP server for use by Socket.IO

