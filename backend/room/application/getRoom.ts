import { Room } from "../domain/entities/IRoom"
import { IRoomRepository } from "../domain/repositories/IRoomRepository"

export const getRoom = async (salaPrincipal: string, roomRepository: IRoomRepository): Promise<Room> => {
    if (salaPrincipal === 'sala principal') {
        salaPrincipal = '/'
    }
    const mainRoom = await roomRepository.getRoom(salaPrincipal)
    return mainRoom
}