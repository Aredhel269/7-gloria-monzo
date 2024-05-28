import express from 'express';
import UserController from '../../controllers/userController';
import RoomController from '../../controllers/roomController';
import MessageController from '../../controllers/messageController';
import "dotenv/config";

const router = express.Router();

router.post('/register', UserController.registerUser); // fet
router.post('/login', UserController.loginUser);

router.get('/users/:userName',  UserController.getUserByUserName);
router.get('/users', UserController.getAllUsers);
router.delete('/users/:userId',  UserController.deleteUser);
router.put('/users/:userId',  UserController.updateUser);

router.post('/rooms', RoomController.createRoom);
router.get('/rooms/:roomName',  RoomController.getRoomByName);
router.get('/rooms',  RoomController.getAllRooms);

router.post('/messages',  MessageController.createMessage);
router.get('/messages/:roomId',  MessageController.getMessagesByRoomId);

export default router;
