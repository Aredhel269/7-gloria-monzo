import { Room } from '../entities/room';

export interface RoomService {
    createRoom(roomName: string): Promise<Room>;
    getRoomByName(roomName: string): Promise<Room | null>;
    getRoomIdByRoomName(roomName: string): Promise<string | null>;
    getAllRooms(): Promise<Room[]>;
  }