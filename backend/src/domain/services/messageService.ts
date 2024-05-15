import { Message } from '../entities/message';
import { MessageRepository } from '../repositories/messageRepository';

export interface MessageService {
  createMessage(messageText: string, userId: number, roomId: number): Promise<Message>;
  getMessagesByRoomId(roomId: number): Promise<Message[]>;
  // Altres mètodes necessaris per gestionar missatges
}
export class MessageServiceImpl implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(messageText: string, userId: number, roomId: number): Promise<Message> {
    const newMessage = new Message(messageText, userId, roomId);
    return this.messageRepository.createMessage(newMessage);
  }

  async getMessagesByRoomId(roomId: number): Promise<Message[]> {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }

  // Implementacions d'altres mètodes del servei de missatges
}











