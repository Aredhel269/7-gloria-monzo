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
    roomName: string
  ): Promise<Message> {
    const newMessage = new Message(messageText, userId, roomName);
    return this.messageRepository.createMessage(newMessage);
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
  /* async getMessagesForRoomId(roomId: string): Promise<Message[] | null> {
    return this.messageRepository.getMessagesForRoomId(roomId);
  } */
  
}
