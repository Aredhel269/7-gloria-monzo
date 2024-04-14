import { Room, TMessage } from "../entities/IRoom"

export interface IRoomRepository {

    updateMessages(msg: TMessage): Promise<Room[]>

    findRoom(room: Room): Promise<Room | null>

    getRoom(salaPrincipal: string): Promise<Room>

    getRooms(userName: string | null): Promise<Room[]>

    createRoom(room: Room): void

    joinRoom(roomToJoin: Room, user: string): void

    leaveRoom(roomToLeave: string, user: string): void

    deleteRoom(room: Room): void

    deleteRoomsOnDisconnect(userName: string): Promise<Room[]>
}