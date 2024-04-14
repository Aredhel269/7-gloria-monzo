import { IRoomRepository } from "../domain/repositories/IRoomRepository";

export const leaveRoom = async (
  roomToLeave: string,
  user: string,
  roomRepository: IRoomRepository
) => {
  await roomRepository.leaveRoom(roomToLeave, user);
};
