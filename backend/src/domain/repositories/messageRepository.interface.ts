import { Message } from '../entities/message';

export interface MessageRepository {
  createMessage(message: Message): Promise<Message>;
  getMessagesByRoomId(roomId: number): Promise<Message[]>;
  // Altres mètodes necessaris per gestionar missatges
}
