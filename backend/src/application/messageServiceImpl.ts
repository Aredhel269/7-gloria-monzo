import { Message } from '../domain/entities/message';
import { MessageService } from '../domain/services/messageService';
import { MessageRepository } from '../domain/repositories/messageRepository';

export class MessageServiceImpl implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  // Implementació dels mètomes de la interfície MessageService
  async createMessage(messageText: string, userId: string, roomId: string): Promise<Message> {
    const newMessage = new Message(messageText, userId, roomId);
    return this.messageRepository.createMessage(newMessage);
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.getMessages();
  }

  async getAllMessagesForUser(userName: string): Promise<Message[] | null> {
    return this.messageRepository.getAllMessagesForUser(userName);

  }

  async getMessagesForRoom(roomId: string): Promise<Message[] | null> {
    return this.messageRepository.getMessagesForRoom(roomId);
  }

}



