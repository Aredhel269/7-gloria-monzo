import { IRoomRepository } from "../domain/repositories/IRoomRepository"
import { Room } from "../domain/entities/IRoom"


export const deleteRoom = async (room: Room, roomRepository: IRoomRepository) => {
    await roomRepository.deleteRoom(room)
    const rooms = await roomRepository.getRooms(null)
    return rooms
}