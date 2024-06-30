import { Message } from '../entities/message';

export interface MessageService {
  createMessage(messageText: string, userId: string, roomId: string): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getAllMessagesForUser(userName: string): Promise<Message[] | null>;
  getMessagesForRoom(roomName: string): Promise<Message[] | null>;
}
