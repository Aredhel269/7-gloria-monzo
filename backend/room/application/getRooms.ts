import { IRoomRepository } from "../domain/repositories/IRoomRepository"

export const getRooms = async (userName: string, roomRepository: IRoomRepository) => {
    const rooms = await roomRepository.getRooms(userName)
    return rooms
}