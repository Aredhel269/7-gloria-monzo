import { Message } from '../entities/message';

export interface MessageRepository {
  createMessage(message: Message): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getAllMessagesForUser(userName: string): Promise<Message[] | null>; 
  getMessagesForRoom(roomName: string): Promise<Message[] | null>;
  //getMessagesForRoomId(roomId: string): Promise<Message[] | null>;
  
}
