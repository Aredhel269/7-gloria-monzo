import { Router } from 'express';
import MessageController from '../../controllers/messageController';

const router = Router();

router.post('/newMessage', MessageController.createMessage);
router.get('/allmessages/:userName', MessageController.getAllMessagesForUser);
router.get('/messagesroom/:roomName', MessageController.getMessagesForRoom);

export default router;
