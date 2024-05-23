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
//router.post('/logout', UserController);

router.post('/rooms', RoomController.createRoom);  // Crea una nova sala de xat
router.get('/rooms/:roomName', RoomController.getRoomByName);  // Obté una sala de xat pel nom
router.get('/rooms', RoomController.getAllRooms);  // Obté totes les sales de xat

router.post('/messages', MessageController.createMessage)
router.get('/messages/:roomId', MessageController.getMessagesByRoomId)



export default router;