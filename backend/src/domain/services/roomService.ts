import { Room } from '../entities/room';
import { RoomRepository } from '../repositories/roomRepository.interface';
import { RoomService } from './roomService.interface';

export class RoomServiceImpl implements RoomService {
    private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;
    }

    async createRoom(roomName: string): Promise<Room> {
        const newRoom = new Room(roomName);
        return this.roomRepository.createRoom(newRoom);
    }

    async getRoomByName(roomName: string): Promise<Room | null> {
        return this.roomRepository.getRoomByName(roomName);
    }

    async getAllRooms(): Promise<Room[]> {
        return this.roomRepository.getAllRooms()
    }

    // Implementacions d'altres mètodes del servei de rooms
}