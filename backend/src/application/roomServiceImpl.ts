import { Room } from '../domain/entities/room';
import { RoomService } from '../domain/services/roomService';
import { RoomRepository } from '../domain/repositories/roomRepository';


export class RoomServiceImpl implements RoomService {
    private roomRepository: RoomRepository;
  
    constructor(roomRepository: RoomRepository) {
      this.roomRepository = roomRepository;
    }
  
    // Implementació dels mètodes de la interfície RoomService
    // falten les altres propietats de room
    async createRoom(roomName: string): Promise<Room> {
      const newRoom = new Room(roomName);
      return this.roomRepository.createRoom(newRoom);
    }
  
    async getRoomByName(roomName: string): Promise<Room | null> {
      return this.roomRepository.getRoomByName(roomName);
    }
  
    async getAllRooms(): Promise<Room[]> {
      return this.roomRepository.getAllRooms();
    }
  }
  