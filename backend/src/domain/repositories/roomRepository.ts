import { Room } from '../entities/room';

export interface RoomRepository {
  createRoom(room: Room): Promise<Room>;
  getRoomByName(roomName: string): Promise<Room | null>;
  getRoomIdByRoomName (roomName: string): Promise< string| null>

  getAllRooms(): Promise<Room[]>;
  // Altres mètodes necessaris per gestionar sales
  //updateRoom(roomId: string, roomName: string): Promise<Room | null>;
  //deleteRoom(roomId: string): Promise<void>; 
}
