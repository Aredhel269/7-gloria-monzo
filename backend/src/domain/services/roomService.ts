import { Room } from '../entities/room';

// FALTEN LES ALTRES PROPIETATS DE ROOM
export interface RoomService {
    createRoom(roomName: string): Promise<Room>;
    getRoomByName(roomName: string): Promise<Room | null>;
    getAllRooms(): Promise<Room[]>;
  }