import { Room } from '../../domain/entities/room';
import { RoomRepository } from '../../domain/repositories/roomRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomRepositoryImpl implements RoomRepository {
  async createRoom(room: Room): Promise<Room> {
    const newRoom = await prisma.room.create({
      data: {
        roomName: room.roomName,
      },
    });
    if (typeof newRoom.roomName === 'string') {
      return new Room(newRoom.roomName);
    } else {
      throw new Error('Room name must be a string');
    }
  }

  async getRoomByName(roomName: string): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: {
        roomName: roomName
      }
    })
    return room ? new Room(room.roomName ?? '') : null
  }

  async getAllRooms(): Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms.map(
      (r: {
        roomId: string
        roomName: string | null
        createdAt: Date
        updatedAt: Date
      }) => new Room(r.roomName || '')
    )
  }
}
