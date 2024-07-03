import { Request, Response } from "express";
import { MessageServiceImpl } from '../../application/messageServiceImpl';
import { MessageRepositoryImpl } from '../../infraestructure/database/messageRepositoryImpl';

const messageRepository = new MessageRepositoryImpl();
const messageService = new MessageServiceImpl(messageRepository);

export default class MessageController {
  
  static async createMessage(req: Request, res: Response) {
    const { messageText, userId, roomName } = req.body;
    
    console.log('[messageController createMessage1] Creating message:', { messageText, userId, roomName })
    try {
      const message = await messageService.createMessage(messageText, userId, roomName);
      console.log("[messageController createMessage2] Message created:", message);
      res.status(201).json({
        succes: true,
        message,
      });
    } catch (error) {
      console.error("[messageController createMessage error 1] Error creating message:", error);
      res.status(500).json({ error: '[messageController createMessage error 2]Failed to create message' });
    }
  }

  static async getMessages(req: Request, res: Response) {
    console.log("[messageController]getMessages1 called");
    try {
      const messages = await messageService.getMessages();
      res.status(200).json(messages);
      console.log("[messageController getMessages 2]Messages fetched: ", messages)
    } catch (error) {
      console.error("[messageController6 getMessages error 1]Error getting messages", error);
      res.status(500).json({ error: '[messageController getMessages error 2]Failed to get messages' });
    }
  }

  static async getAllMessagesForUser(req: Request, res: Response) {
    console.log("[messageController]getAllMessagesForUser1 called");
    try {
      const { userName } = req.params
      const messages = await messageService.getAllMessagesForUser(userName);
      res.status(200).json(messages);
      console.log("[messageController]getAllMessagesForUser2 Messages for user `$userName`:", messages)
    } catch (error) {
      console.error("[messageController getMessagesUser error 1]Error getting all messages:", error);
      res.status(500).json({ error: '[messageController getMessagesUser error 2]Failed to get messages' });
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
      const { roomName } = req.params;
      const messages = await messageService.getMessagesForRoom(roomName);
      res.status(200).json(messages);
      console.log(`[messageController getMessRoom1] Messages for room ${roomName}:`, messages);

    } catch (error) {
      console.error("[messageController getMessRoom error1]Error getting messages:", error);

      res.status(500).json({ error: '[messageController getMessRoom error 2]Error fetching messages' });
    }
  }
/* 
  static async getMessagesForRoomId(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const messages = await messageService.getMessagesForRoomId(roomId);
      res.status(200).json(messages);
      console.log(`[messageController getMessRoomId1] Messages for roomId ${roomId}:`, messages);

    } catch (error) {
      console.error("[messageController getMessRoomId error1]Error getting messages:", error);

      res.status(500).json({ error: '[messageController getMessRoomId error 2]Error fetching messages' });
    }
  } */
  
}







