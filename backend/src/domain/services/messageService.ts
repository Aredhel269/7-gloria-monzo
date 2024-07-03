import { Message } from '../entities/message';

export interface MessageService {
  createMessage(messageText: string, userId: string, roomName: string): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getAllMessagesForUser(userName: string): Promise<Message[] | null>;
  getMessagesForRoom(roomName: string): Promise<Message[] | null>;
  //getMessagesForRoomId(roomId: string): Promise<Message[] | null>;

}
