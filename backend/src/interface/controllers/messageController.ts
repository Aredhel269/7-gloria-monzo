import { Request, Response } from 'express';
import { MessageServiceImpl } from '../../application/messageServiceImpl';
import { MessageRepositoryImpl } from '../../infraestructure/database/messageRepositoryImpl';

const messageRepository = new MessageRepositoryImpl();
const messageService = new MessageServiceImpl(messageRepository);

export default class MessageController {
    static async createMessage(req: Request, res: Response) {
        try {
            const { messageText, userId, roomId } = req.body;
            const message = await messageService.createMessage(messageText, userId, roomId);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create message' });
        }
    }

    static async getMessagesByRoomId(req: Request, res: Response) {
        try {
            const { roomId } = req.params;
            const messages = await messageService.getMessagesByRoomId(roomId);
            if (messages.length === 0) {
                res.status(404).json({ error: 'No messages found' });
            } else {
                res.status(200).json(messages);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get messages' });
        }
    }
}