import { Message } from '../entities/message';
import { MessageRepository } from '../repositories/messageRepository.interface';
import { MessageService } from './messageService.interface';

export class MessageServiceImpl implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(message: string, userId: number, roomId: number): Promise<Message> {
    const newMessage = new Message(message, userId, roomId);
    return this.messageRepository.createMessage(newMessage);
  }

  async getMessagesByRoomId(roomId: number): Promise<Message[]> {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }

  // Implementacions d'altres mètodes del servei de missatges
}











