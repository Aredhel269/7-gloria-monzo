// messageRepositoryImpl.ts
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

  async getMessages(): Promise<Message[]> {
    console.log("Getting all messages from database");
    const messages = await prisma.message.findMany();
    console.log("Messages fetched from database:", messages);
    return messages.map((m: {
      messageId: string;
      messageText: string;
      roomId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    }) => new Message(m.messageText || '', m.roomId || '', m.userId || ''));
  }

  async getAllMessagesForUser(userName: string): Promise<Message[] | null> {
    const userByUsername = await prisma.user.findFirst({
      where: {
        userName,
      },
    });

    if (!userByUsername) {
      return null; // L'usuari no existeix
    }

    const messagesForUser = await prisma.message.findMany({
      where: {
        userId: userByUsername.userId,
      },
    });

    return messagesForUser.map((msg) => new Message(
      msg.messageText,
      msg.userId,
      msg.roomId,
    ));
  }


  async getMessagesForRoom(roomId: string): Promise<Message[] | null> {
    const roomByRoomId = await prisma.room.findFirst({
      where: {
        roomId,
      },
    });

    if (!roomByRoomId) {
      return null;
    }

    const messagesForRoom = await prisma.message.findMany({
      where: {
        roomId: roomByRoomId.roomId,
      },
    });

    return messagesForRoom.map((msg) => new Message(
      msg.messageText,
      msg.userId,
      msg.roomId,
    ));
  }


}
