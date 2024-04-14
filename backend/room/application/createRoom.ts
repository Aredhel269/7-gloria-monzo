import { Room } from "../domain/entities/IRoom"
import { IRoomRepository } from "../domain/repositories/IRoomRepository"




export const createRoom = async (newRoom: Room, roomRepository: IRoomRepository) => {
    const room = await roomRepository.findRoom(newRoom)
    if (!room) {
        await roomRepository.createRoom(newRoom)
        const rooms = await roomRepository.getRooms(null)
        return rooms
    } else {
        return false
    }
}