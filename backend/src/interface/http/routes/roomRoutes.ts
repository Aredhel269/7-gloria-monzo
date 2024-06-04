import { FastifyInstance } from 'fastify';
import RoomController from '../../controllers/roomController';

const registerRoutes = (app: FastifyInstance) => {

    app.post('/newRoom', RoomController.createRoom);
    app.get('/rooms/:roomName', RoomController.getRoomByName);
    app.get('/rooms', RoomController.getAllRooms);
}

export default registerRoutes;