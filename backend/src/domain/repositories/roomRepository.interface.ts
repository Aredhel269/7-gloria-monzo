import { Room } from '../entities/room';

export interface RoomRepository {
  createRoom(room: Room): Promise<Room>;
  getRoomByName(roomName: string): Promise<Room | null>;
  getAllRooms(): Promise<Room[]>;
  // Altres mètodes necessaris per gestionar sales
}
