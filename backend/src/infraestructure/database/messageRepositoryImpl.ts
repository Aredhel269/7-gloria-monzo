import { Message } from '../../domain/entities/message';
import { MessageRepository } from '../../domain/repositories/messageRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class MessageRepositoryImpl implements MessageRepository {
  async createMessage(message: Message): Promise<Message> {
    console.log("[messageRepoImpl][createMessage1] Creating new message");

    try {
      const newMessage = await prisma.message.create({
        data: {
          messageText: message.messageText,
          userId: message.userId,
          roomName: message.roomName,
        },
      });

      console.log("[messageRepoImpl][createMessage2] New message created:", newMessage);

      return new Message(
        newMessage.messageText,
        newMessage.userId,
        newMessage.roomName
      );
    } catch (error) {
      console.error("[messageRepoImpl][createMessage error1] Error creating message:", error);
      throw error;
    }
  }

  async getMessages(): Promise<Message[]> {
    console.log("[messageRepoImpl][getMessages1] Getting all messages from database");

    try {
      const messages = await prisma.message.findMany();
      console.log("[messageRepoImpl][getMessages2] Messages fetched from database:", messages);

      return messages.map((m) => new Message(m.messageText, m.roomName, m.userId));
    } catch (error) {
      console.error("[messageRepoImpl][getMessages error1] Error fetching messages:", error);
      throw error;
    }
  }

  async getAllMessagesForUser(userName: string): Promise<Message[] | null> {
    console.log("[messageRepoImpl][getAllMessagesForUser 1] Getting messages by username from database:", userName);

    try {
      const userByUsername = await prisma.user.findFirst({
        where: {
          userName,
        },
      });

      if (!userByUsername) {
        console.log("[messageRepoImpl][getAllMessagesForUser 2] User not found");
        return null;
      }

      const messagesForUser = await prisma.message.findMany({
        where: {
          userId: userByUsername.userId,
        },
      });

      console.log("[messageRepoImpl][getAllMessagesForUser 3] Messages fetched for user:", messagesForUser);

      return messagesForUser.map((msg) => new Message(msg.messageText, msg.userId, msg.roomName));
    } catch (error) {
      console.error("[messageRepoImpl][getAllMessagesForUser error1] Error fetching messages for user:", error);
      throw error;
    }
  }
    async getMessagesForRoom(roomName: string): Promise<Message[] | null> {
      console.log("[messageRepoImpl][getMessagesForRoom 1] Getting messages by roomName from database:", roomName);
  
      try {
        const roomByRoomName = await prisma.room.findFirst({
          where: {
            roomName,
          },
        });
  
        if (!roomByRoomName) {
          console.log("[messageRepoImpl][getMessagesForRoom 2] Room not found");
          return null;
        }
  
        const messagesForRoom = await prisma.message.findMany({
          where: {
            roomName: roomByRoomName.roomName,
          },
        });
  
        console.log("[messageRepoImpl][getMessagesForRoom 3] Messages fetched for room:", messagesForRoom);
  
        return messagesForRoom.map((msg) => new Message(msg.messageText, msg.userId, msg.roomName));
      } catch (error) {
        console.error("[messageRepoImpl][getAllMessagesForRoom error1] Error fetching messages for room:", error);
        throw error;
      }
  }


  /* async getMessagesForRoom(roomName: string): Promise<Message[] | null> {
    console.log("[messageRepoImpl][getMessagesForRoom 1] Getting messages for room:", roomName);

    try {
      const roomByRoomName = await prisma.room.findFirst({
        where: {
          roomName,
        },
      });

      if (!roomByRoomName) {
        console.log("[messageRepoImpl][getMessagesForRoom 2] Room not found");
        return null;
      }

      const messagesForRoom = await prisma.message.findMany({
        where: {
          roomName: roomByRoomName.roomId,
        },
      });

      console.log("[messageRepoImpl][getMessagesForRoom 3] Messages fetched for room:", messagesForRoom);

      return messagesForRoom.map((msg) => new Message(msg.messageText, msg.userId, msg.roomName));
    } catch (error) {
      console.error("[messageRepoImpl][getMessagesForRoom error] Error fetching messages for room:", error);
      throw error;
    }
  } */
}



/*
$ npx prisma generate --schema=./backend/prisma/schema.prisma
$ npx prisma introspect
$ npx prisma generate
$ npx prisma db pull
async getMessagesForRoomId(roomId: string): Promise<Message[] | null> {
  console.log("[messageRepoImpl][getMessagesForRoomId 1] Getting messages for room:", roomId);

  try {
    const roomByRoomId = await prisma.room.findUnique({
      where: {
        roomId,
      },
    });
    console.log(roomByRoomId)
    if (!roomByRoomId) {
      console.log("[messageRepoImpl][getMessagesForRoom 2] Room not found");
      return null;
    }

    const messagesForRoomId = await prisma.message.findMany({
      where: {
        roomId: roomByRoomId.roomId,
      },
    });

    console.log("[messageRepoImpl][getMessagesForRoomId 3] Messages fetched for room:", messagesForRoomId);

    return messagesForRoomId.map((msg) => new Message(msg.messageText, msg.userId, msg.roomId));
  } catch (error) {
    console.error("[messageRepoImpl][getMessagesForRoomId error] Error fetching messages for room:", error);
    throw error;
  }
}*/
/*
  async createMessage(message: Message): Promise<Message> {
    console.log("[messageRepoImpl][createMessage1] Creating new message");

    try {
      const newMessage = await prisma.message.create({
        data: {
          messageText: message.messageText,
          userId: message.userId,
          roomId: message.roomId,
        },
      });

      console.log("[messageRepoImpl][createMessage2] New message created:", newMessage);

      return new Message(
        newMessage.messageText,
        newMessage.userId,
        newMessage.roomId
      );
    } catch (error) {
      console.error("[messageRepoImpl][createMessage error1] Error creating message:", error);
      throw error;
    }
  }*/
