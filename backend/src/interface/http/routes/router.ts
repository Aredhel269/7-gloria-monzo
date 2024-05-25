import UserController from '../../controllers/userController';
import RoomController from '../../controllers/roomController';
import MessageController from '../../controllers/messageController'
import passport from 'passport';
import express from 'express';
import "dotenv/config";

const router = express.Router();

router.post('/login', UserController.loginUser);
router.get('/auth/google', UserController.authGoogle);
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), UserController.googleCallback);
router.post('/register', UserController.registerUser);

router.post('/rooms', RoomController.createRoom);
router.get('/rooms/:roomName', RoomController.getRoomByName);
router.get('/rooms', RoomController.getAllRooms);

router.post('/messages', MessageController.createMessage)
router.get('/messages/:roomId', MessageController.getMessagesByRoomId)

export default router;
