import { Room } from "../domain/entities/IRoom"
import { IRoomRepository } from "../domain/repositories/IRoomRepository"

export const joinRoom = async (roomToJoin: Room, user: string, roomRepository: IRoomRepository) => {
    await roomRepository.joinRoom(roomToJoin, user)
    const rooms = await roomRepository.getRooms(null)
    return rooms
}