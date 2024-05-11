import { Message } from '../entities/message';

export interface MessageService {
  createMessage(message: string, userId: number, roomId: number): Promise<Message>;
  getMessagesByRoomId(roomId: number): Promise<Message[]>;
  // Altres mètodes necessaris per gestionar missatges
}
