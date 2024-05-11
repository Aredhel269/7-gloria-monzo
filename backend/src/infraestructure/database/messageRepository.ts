import { Message } from '../../domain/entities/message';
import { MessageRepository } from '../../domain/repositories/messageRepository.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MessageData {
  id: number;
  message: string;
  userId: number;
  roomId: number;
}

export class MessageRepositoryImpl implements MessageRepository {
  async createMessage(message: Message): Promise<Message> {
    const newMessage = await prisma.message.create({
      data: {
        message: message.message,
        userId: message.userId,
        roomId: message.roomId,
      },
    });

    return new Message(
      newMessage.message,
      newMessage.userId,
      newMessage.roomId
    );
  }

  async getMessagesByRoomId(roomId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: {
        roomId,
      },
    });

    return messages.map(
      (m: MessageData) =>
        new Message(m.message, m.userId, m.roomId)
    );
  }

  // Implementacions d'altres mètodes del repositori de missatges
}
