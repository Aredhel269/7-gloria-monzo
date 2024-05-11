import { Room } from '../entities/room';

export interface RoomService {
  createRoom(roomName: string): Promise<Room>;
  getRoomByName(roomName: string): Promise<Room | null>;
  getAllRooms(): Promise<Room[]>;
  // Altres mètodes necessaris per gestionar sales
}
