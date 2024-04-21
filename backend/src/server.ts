import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import apiRouter from './routes/route';
import { ServerSocket } from './socket/ServerSocket'
import './db';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Start the Socket server
new ServerSocket(httpServer);

// Enable CORS for Express server
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(json());
app.use(urlencoded({ extended: true }));

// API routes
app.use('/', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
