import { Router } from 'express';
import MessageController from '../../controllers/messageController';

const router = Router();

router.post('/newMessage', MessageController.createMessage);
router.get('/allmessages/:userName', MessageController.getAllMessagesForUser);
router.get('/messagesroom/:roomName', MessageController.getMessagesForRoom);
//router.get('/messagesroom/:roomId', MessageController.getMessagesForRoomId);

export default router;
