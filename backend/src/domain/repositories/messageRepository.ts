import { Message } from '../entities/message';

export interface MessageRepository {
  createMessage(message: Message): Promise<Message>;
}
