import { Router } from 'express';
import MessageController from '../../controllers/messageController';

const router = Router();

router.post('/newMessage', MessageController.createMessage);

export default router;
