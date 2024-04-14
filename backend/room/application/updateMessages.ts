import { TMessage } from "../domain/entities/IRoom";
import { IRoomRepository } from "../domain/repositories/IRoomRepository";

export const updateMessages = async (
  msg: TMessage,
  roomRepository: IRoomRepository
) => {
  const messages = await roomRepository.updateMessages(msg);
  return messages;
};
