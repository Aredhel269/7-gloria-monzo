import { Room } from '../../domain/entities/room';
import { RoomRepository } from '../../domain/repositories/roomRepository.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomRepositoryImpl implements RoomRepository {
  async createRoom(room: Room): Promise<Room> {
    const newRoom = await prisma.room.create({
      data: {
        roomName: room.roomName,
      },
    });
    return new Room(newRoom.roomName);
  }

  async getRoomByName(roomName: string): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        roomName,
      },
    });
    return room ? new Room(room.roomName) : null;
  }

  async getAllRooms(): Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms.map((r: { roomName: string; }) => new Room(r.roomName));
  }
}
