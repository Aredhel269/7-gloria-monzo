import { Message } from '../domain/entities/message';
import { MessageService } from '../domain/services/messageService';
import { MessageRepository } from '../domain/repositories/messageRepository';

export class MessageServiceImpl implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  // Implementació dels mètodes de la interfície MessageService
  async createMessage(messageText: string, userId: string, roomId: string): Promise<Message> {
    const newMessage = new Message(messageText, userId, roomId);
    return this.messageRepository.createMessage(newMessage);
  }

  async getMessagesByRoomId(roomId: string): Promise<Message[]> {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }
}