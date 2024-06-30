import { MessageRepository } from "../domain/repositories/messageRepository";
import { Message } from "../domain/entities/message";

export class MessageServiceImpl {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(
    messageText: string,
    userId: string,
    roomId: string
  ): Promise<Message> {
    const message = new Message(messageText, userId, roomId);
    return this.messageRepository.createMessage(message);
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.getMessages();
  }

  async getAllMessagesForUser(userName: string): Promise<Message[] | null> {
    return this.messageRepository.getAllMessagesForUser(userName);
  }

  async getMessagesForRoom(roomName: string): Promise<Message[] | null> {
    return this.messageRepository.getMessagesForRoom(roomName);
  }
}
