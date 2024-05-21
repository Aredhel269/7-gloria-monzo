import { Message } from '../../domain/entities/message';
import { MessageRepository } from '../../domain/repositories/messageRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MessageRepositoryImpl implements MessageRepository {
  async createMessage(message: Message): Promise<Message> {
    const newMessage = await prisma.message.create({
      data: {
        messageText: message.messageText,
        userId: message.userId,
        roomId: message.roomId,
      },
    });

    return new Message(
      newMessage.messageText,
      newMessage.userId,
      newMessage.roomId
    );
  }

  async getMessagesByRoomId(roomId: string): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: {
        roomId,
      },
    });

      return messages.map(msg => new Message(
      msg.messageText,
      msg.userId,
      msg.roomId
    ));
  }

}

