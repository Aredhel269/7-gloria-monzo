import { User } from "../../user/domain/entities/IUser"
import { IRoomRepository } from "../domain/repositories/IRoomRepository"


export const deleteRoomsOnDisconnect = async (user: User, roomRepository: IRoomRepository) => {
    const roomToLeave = await roomRepository.getRooms(null)
    roomToLeave.forEach(async (room) => {
        await roomRepository.leaveRoom(room.name, user.name)
    })
    const roomsAfterDelete = await roomRepository.deleteRoomsOnDisconnect(user.name)
    return roomsAfterDelete
}