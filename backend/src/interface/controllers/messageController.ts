import { Request, Response } from "express";
import { MessageServiceImpl } from '../../application/messageServiceImpl';
import { MessageRepositoryImpl } from '../../infraestructure/database/messageRepositoryImpl';

const messageRepository = new MessageRepositoryImpl();
const messageService = new MessageServiceImpl(messageRepository);

export default class MessageController {
  static async createMessage(req: Request, res: Response) {
    const { messageText, userId, roomId } = req.body;
    console.log('Message text:', { messageText, userId, roomId })
    try {

      const message = await messageService.createMessage(messageText, userId, roomId);
      console.log("Message created:", message);
      const messageWithId = { ...message, id: message.messageId }
      res.status(201).json({
        succes: true,
        messageWithId
      });

    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  }
  static async getMessages(req: Request, res: Response) {
    console.log("getMessages called");
    try {
      const messages = await messageService.getMessages();
      res.status(200).json(messages);
      console.log("Messages fetched: ", messages)
    } catch (error) {
      console.error("Error getting messages", error);
      res.status(500).json({ error: 'Failed to get messages' });
    }

  }


  static async getAllMessagesForUser(req: Request, res: Response) {
    console.log("getAllMessagesForUser called");
    try {
      const { userName } = req.params
      const messages = await messageService.getAllMessagesForUser(userName);
      res.status(200).json(messages);
      console.log("Messages for user `$userName`:", messages)
    } catch (error) {
      console.error("Error getting all messages:", error);
      res.status(500).json({ error: 'Failed to get messages' });
    }

  }

  /* class MessageController {
    async getAllMessagesForUser(req, res) {
      const userName = req.params.userName;
      const user = await User.findOne({ where: { userName } });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const messages = await Message.findAll({
        where: {
          userId: user.id,
        },
        order: [['createdAt', 'ASC']],
      });
      return res.json(messages);
    }
  } */

  static async getMessagesForRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const messages = await messageService.getMessagesForRoom(roomId);
      res.status(200).json(messages);
      console.log(`Messages for room ${roomId}:`, messages);

    } catch (error) {
      console.error("Error getting messages:", error);

      res.status(500).json({ error: 'Error fetching messages' });
    }
  }


}

