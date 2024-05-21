import { Message } from '../entities/message';
import { MessageRepository } from '../repositories/messageRepository';
export interface MessageService {
  createMessage(messageText: string, userId: string, roomId: string): Promise<Message>;
  getMessagesByRoomId(roomId: string): Promise<Message[]>;
}
export class MessageServiceImpl implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(messageText: string, userId: string, roomId: string): Promise<Message> {
    const newMessage = new Message(messageText, userId, roomId);
    return this.messageRepository.createMessage(newMessage);
  }

  async getMessagesByRoomId(roomId: string): Promise<Message[]> {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }
}











