import { Router } from 'express';
import RoomController from '../../controllers/roomController';

const router = Router();

router.post('/newRoom', RoomController.createRoom);
router.get('/allrooms', RoomController.getAllRooms);
router.get('/rooms/:roomName', RoomController.getRoomByName);
router.get('/roomid/:roomName', RoomController.getRoomIdByRoomName);


export default router;
