import { FastifyInstance } from 'fastify';
import MessageController from '../../controllers/messageController';
import "dotenv/config";

const registerRoutes = (app: FastifyInstance) => {


    app.post('/newMessage', MessageController.createMessage);
    app.get('/messages/:roomId', MessageController.getMessagesByRoomId);
};

export default registerRoutes;
