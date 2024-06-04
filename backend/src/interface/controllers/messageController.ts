import { FastifyRequest, FastifyReply } from "fastify";
import { MessageServiceImpl } from '../../application/messageServiceImpl';
import { MessageRepositoryImpl } from '../../infraestructure/database/messageRepositoryImpl';

const messageRepository = new MessageRepositoryImpl();
const messageService = new MessageServiceImpl(messageRepository);

class MessageController {
  async createMessage(request: FastifyRequest, reply: FastifyReply) {
    const { messageText, userId, roomId } = request.body as { messageText: string, userId: string, roomId: string };
    console.log("createMessage called with", { messageText, userId, roomId });
    try {
      const message = await messageService.createMessage(messageText, userId, roomId);
      console.log("Message created:", message);
      const messageWithId = { ...message, id: message.messageId };
      reply.status(201).send(messageWithId);
    } catch (error) {
      console.error("Error creating message:", error);
      reply.status(500).send({ error: 'Failed to create message' });
    }
  }

  async getMessagesByRoomId(request: FastifyRequest, reply: FastifyReply) {
    const { roomId } = request.params as { roomId: string };
    console.log('roomId:', roomId);
    try {
      const messages = await messageService.getMessagesByRoomId(roomId);
      if (messages.length === 0) {
        reply.status(404).send({ error: 'No messages found' });
      } else {
        reply.status(200).send(messages);
      }
    } catch (error) {
      console.error('Error getting messages:', error);
      reply.status(500).send({ error: 'Failed to get messages' });
    }
  }
}

export default new MessageController();
